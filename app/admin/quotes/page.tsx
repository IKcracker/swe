import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/admin-auth";
import { isDatabaseConfigured, listQuoteRequests } from "@/lib/supabase-rest";
import {
  getQuoteStatusLabel,
  quoteStatuses,
  type QuoteRequest,
} from "@/lib/quotes";

export const metadata = {
  title: "Quote Requests",
  robots: { index: false, follow: false },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function matchesSearch(quote: QuoteRequest, search: string) {
  if (!search) return true;

  const haystack = [
    quote.quote_number,
    quote.full_name,
    quote.company_name,
    quote.email,
    quote.phone,
    quote.origin,
    quote.destination,
    quote.service_type,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(search.toLowerCase());
}

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  await requireAdmin();

  const { q = "", status = "ALL" } = await searchParams;
  const configured = isDatabaseConfigured();
  let quotes: QuoteRequest[] = [];
  let loadError = "";

  if (configured) {
    try {
      quotes = await listQuoteRequests(500);
    } catch (error) {
      console.error(error);
      loadError = "Quote requests could not be loaded.";
    }
  }

  const filtered = quotes.filter((quote) => {
    const statusMatch = status === "ALL" || quote.status === status;
    return statusMatch && matchesSearch(quote, q);
  });

  const newCount = quotes.filter((quote) => quote.status === "NEW").length;
  const reviewingCount = quotes.filter((quote) => quote.status === "REVIEWING").length;
  const quotedCount = quotes.filter((quote) => quote.status === "QUOTED").length;
  const wonCount = quotes.filter((quote) => quote.status === "WON").length;

  return (
    <AdminShell
      title="Quote requests"
      description="Review customer enquiries, prepare pricing and manage the quote pipeline."
      section="quotes"
      actions={
        <Link href="/quote" target="_blank" className="admin-primary-link">
          Open public quote form ↗
        </Link>
      }
    >
      {!configured ? (
        <section className="admin-setup-notice">
          <strong>Quote database setup required</strong>
          <p>Run the latest <code>supabase/schema.sql</code> in Supabase.</p>
        </section>
      ) : null}

      {loadError ? <section className="admin-setup-notice">{loadError}</section> : null}

      <section className="admin-quote-metrics">
        <article>
          <span>New</span>
          <strong>{newCount}</strong>
          <small>Awaiting first review</small>
        </article>
        <article>
          <span>Reviewing</span>
          <strong>{reviewingCount}</strong>
          <small>Currently being assessed</small>
        </article>
        <article>
          <span>Quoted</span>
          <strong>{quotedCount}</strong>
          <small>Price sent / prepared</small>
        </article>
        <article>
          <span>Won</span>
          <strong>{wonCount}</strong>
          <small>Accepted opportunities</small>
        </article>
      </section>

      <section className="admin-shipments-card">
        <div className="admin-shipments-card-head">
          <div>
            <span className="admin-section-kicker">Quote inbox</span>
            <h2>Customer enquiries</h2>
            <p>{filtered.length} request{filtered.length === 1 ? "" : "s"} shown</p>
          </div>

          <form method="get" className="admin-table-filters">
            <label className="admin-search-box">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Search quote, customer or route…"
              />
            </label>

            <select name="status" defaultValue={status}>
              <option value="ALL">All statuses</option>
              {quoteStatuses.map((quoteStatus) => (
                <option key={quoteStatus} value={quoteStatus}>
                  {getQuoteStatusLabel(quoteStatus)}
                </option>
              ))}
            </select>

            <button type="submit">Filter</button>
          </form>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table admin-quote-table">
            <thead>
              <tr>
                <th>Quote</th>
                <th>Customer</th>
                <th>Route</th>
                <th>Service</th>
                <th>Status</th>
                <th>Received</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((quote) => (
                <tr key={quote.id}>
                  <td>
                    <strong>{quote.quote_number}</strong>
                    <span>{quote.company_name || "Individual enquiry"}</span>
                  </td>
                  <td>
                    <strong>{quote.full_name}</strong>
                    <span>{quote.email}</span>
                  </td>
                  <td>
                    <strong>{quote.origin}</strong>
                    <span>→ {quote.destination}</span>
                  </td>
                  <td>{quote.service_type}</td>
                  <td>
                    <span className={`quote-status-pill quote-status-${quote.status.toLowerCase()}`}>
                      {getQuoteStatusLabel(quote.status)}
                    </span>
                  </td>
                  <td>{formatDate(quote.created_at)}</td>
                  <td>
                    <Link
                      className="admin-row-action"
                      href={`/admin/quotes/${quote.id}`}
                      aria-label={`Open ${quote.quote_number}`}
                    >
                      →
                    </Link>
                  </td>
                </tr>
              ))}

              {!filtered.length ? (
                <tr>
                  <td colSpan={7} className="admin-empty-row">
                    <div className="admin-empty-state">
                      <strong>No matching quote requests</strong>
                      <span>New website submissions will appear here automatically.</span>
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
