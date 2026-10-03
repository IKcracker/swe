import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/admin-auth";
import {
  getQuoteRequestById,
  isDatabaseConfigured,
} from "@/lib/supabase-rest";
import {
  getQuoteStatusLabel,
  quoteStatuses,
} from "@/lib/quotes";
import { updateQuoteRequestAction } from "../../actions";

export const metadata = {
  title: "Quote Request",
  robots: { index: false, follow: false },
};

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatCurrency(value: number | null) {
  if (value == null) return "Not quoted";
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(value);
}

export default async function QuoteDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ updated?: string }>;
}) {
  await requireAdmin();

  if (!isDatabaseConfigured()) {
    return (
      <div className="admin-app admin-app-standalone">
        <main className="admin-workspace">
          <div className="admin-workspace-body">
            <section className="admin-setup-notice">
              Configure the Supabase backend before managing quote requests.
            </section>
          </div>
        </main>
      </div>
    );
  }

  const { id } = await params;
  const { updated } = await searchParams;
  const quote = await getQuoteRequestById(id);
  if (!quote) notFound();

  const actions = (
    <div className="admin-detail-actions">
      <Link href="/admin/quotes" className="admin-secondary-link">
        ← Quote requests
      </Link>
      <a href={`mailto:${quote.email}?subject=${encodeURIComponent(
        `SWE Red Quote ${quote.quote_number}`
      )}`} className="admin-primary-link">
        Email customer
      </a>
    </div>
  );

  return (
    <AdminShell
      title={quote.quote_number}
      description={`${quote.full_name} • ${quote.origin} → ${quote.destination}`}
      section="quotes"
      actions={actions}
    >
      {updated === "1" ? (
        <div className="admin-success-notice">Quote request updated successfully.</div>
      ) : null}

      <section className="admin-quote-summary">
        <div>
          <span className="admin-section-kicker">Pipeline status</span>
          <span className={`quote-status-pill quote-status-${quote.status.toLowerCase()}`}>
            {getQuoteStatusLabel(quote.status)}
          </span>
        </div>
        <div>
          <small>Requested service</small>
          <strong>{quote.service_type}</strong>
        </div>
        <div>
          <small>Quoted amount</small>
          <strong>{formatCurrency(quote.quoted_amount)}</strong>
        </div>
        <div>
          <small>Received</small>
          <strong>{formatDate(quote.created_at)}</strong>
        </div>
      </section>

      <section className="admin-detail-layout">
        <div className="admin-detail-main">
          <section className="admin-content-card">
            <div className="admin-card-heading">
              <div>
                <span className="admin-section-kicker">Customer</span>
                <h2>Contact information</h2>
              </div>
            </div>

            <div className="admin-information-grid admin-information-grid-four">
              <div>
                <small>Name</small>
                <strong>{quote.full_name}</strong>
              </div>
              <div>
                <small>Company</small>
                <strong>{quote.company_name || "—"}</strong>
              </div>
              <div>
                <small>Email</small>
                <a href={`mailto:${quote.email}`}>{quote.email}</a>
              </div>
              <div>
                <small>Phone</small>
                <a href={`tel:${quote.phone}`}>{quote.phone}</a>
              </div>
            </div>
          </section>

          <section className="admin-content-card">
            <div className="admin-card-heading">
              <div>
                <span className="admin-section-kicker">Shipment request</span>
                <h2>Route & package details</h2>
              </div>
            </div>

            <div className="admin-quote-route">
              <div>
                <small>Collection</small>
                <strong>{quote.origin}</strong>
              </div>
              <span>→</span>
              <div>
                <small>Delivery</small>
                <strong>{quote.destination}</strong>
              </div>
            </div>

            <div className="admin-information-grid">
              <div>
                <small>Service</small>
                <strong>{quote.service_type}</strong>
              </div>
              <div>
                <small>Packages</small>
                <strong>{quote.package_count}</strong>
              </div>
              <div>
                <small>Weight</small>
                <strong>{quote.weight_kg != null ? `${quote.weight_kg} kg` : "—"}</strong>
              </div>
              <div>
                <small>Dimensions</small>
                <strong>{quote.dimensions || "—"}</strong>
              </div>
              <div>
                <small>Preferred collection</small>
                <strong>{quote.preferred_collection_date || "—"}</strong>
              </div>
              <div>
                <small>Submitted</small>
                <strong>{formatDate(quote.created_at)}</strong>
              </div>
            </div>
          </section>

          <section className="admin-content-card">
            <div className="admin-card-heading">
              <div>
                <span className="admin-section-kicker">Customer notes</span>
                <h2>Additional requirements</h2>
              </div>
            </div>
            <p className="admin-quote-notes">
              {quote.notes || "No additional shipment notes were supplied."}
            </p>
          </section>
        </div>

        <aside className="admin-detail-sidebar">
          <section className="admin-content-card admin-update-card">
            <div className="admin-card-heading">
              <div>
                <span className="admin-section-kicker">Quote controls</span>
                <h2>Update request</h2>
              </div>
            </div>

            <form action={updateQuoteRequestAction} className="admin-form-stack">
              <input type="hidden" name="quote_id" value={quote.id} />

              <label>
                <span>Status</span>
                <select name="status" defaultValue={quote.status}>
                  {quoteStatuses.map((status) => (
                    <option key={status} value={status}>
                      {getQuoteStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Quoted amount (ZAR)</span>
                <input
                  name="quoted_amount"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={quote.quoted_amount ?? ""}
                  placeholder="0.00"
                />
              </label>

              <label>
                <span>Internal notes</span>
                <textarea
                  name="admin_notes"
                  rows={7}
                  defaultValue={quote.admin_notes || ""}
                  placeholder="Pricing notes, follow-up details, customer feedback..."
                />
              </label>

              <button type="submit" className="admin-primary-button">
                Save quote update
              </button>
            </form>
          </section>

          <section className="admin-help-card">
            <span>Customer follow-up</span>
            <p>
              Use the customer&apos;s quote reference in all correspondence so the
              enquiry is easy to trace.
            </p>
            <a href={`mailto:${quote.email}?subject=${encodeURIComponent(
              `SWE Red Quote ${quote.quote_number}`
            )}`}>
              Email {quote.full_name} ↗
            </a>
          </section>
        </aside>
      </section>
    </AdminShell>
  );
}
