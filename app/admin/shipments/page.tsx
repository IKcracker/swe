import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { NewShipmentMenu } from "@/components/admin/new-shipment-menu";
import { requireAdmin } from "@/lib/admin-auth";
import { isDatabaseConfigured, listShipments } from "@/lib/supabase-rest";
import { getStatusLabel, shipmentStatuses, type Shipment } from "@/lib/tracking";

export const metadata = {
  title: "Shipments",
  robots: { index: false, follow: false },
};

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function matchesSearch(shipment: Shipment, search: string) {
  if (!search) return true;
  const haystack = [
    shipment.tracking_number,
    shipment.customer_reference,
    shipment.origin,
    shipment.destination,
    shipment.service_type,
    shipment.current_location,
    shipment.recipient_name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(search.toLowerCase());
}

export default async function ShipmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  await requireAdmin();

  const { q = "", status = "ALL" } = await searchParams;
  const configured = isDatabaseConfigured();
  let shipments: Shipment[] = [];
  let loadError = "";

  if (configured) {
    try {
      shipments = await listShipments(500);
    } catch (error) {
      console.error("Shipments load failed", error);
      loadError = "Shipment records could not be loaded.";
    }
  }

  const filtered = shipments.filter((shipment) => {
    const statusMatch = status === "ALL" || shipment.status === status;
    return statusMatch && matchesSearch(shipment, q);
  });

  const active = shipments.filter(
    (shipment) => !["DELIVERED", "CANCELLED"].includes(shipment.status)
  ).length;
  const inTransit = shipments.filter((shipment) =>
    ["COLLECTED", "IN_TRANSIT", "AT_HUB"].includes(shipment.status)
  ).length;
  const outForDelivery = shipments.filter(
    (shipment) => shipment.status === "OUT_FOR_DELIVERY"
  ).length;
  const delivered = shipments.filter(
    (shipment) => shipment.status === "DELIVERED"
  ).length;
  const exceptions = shipments.filter(
    (shipment) => shipment.status === "EXCEPTION"
  ).length;

  return (
    <AdminShell
      title="Shipments"
      description="Manage every tracking record from booking through final delivery."
      section="shipments"
      actions={<NewShipmentMenu configured={configured} />}
    >
      {!configured ? (
        <section className="admin-setup-notice">
          <strong>Tracking backend setup required</strong>
          <p>Connect Supabase before creating or managing shipments.</p>
        </section>
      ) : null}

      {loadError ? (
        <section className="admin-setup-notice">{loadError}</section>
      ) : null}

      <section className="shipment-kpi-strip">
        <article>
          <span>All</span>
          <strong>{shipments.length}</strong>
        </article>
        <article>
          <span>Active</span>
          <strong>{active}</strong>
        </article>
        <article>
          <span>In transit</span>
          <strong>{inTransit}</strong>
        </article>
        <article>
          <span>Out for delivery</span>
          <strong>{outForDelivery}</strong>
        </article>
        <article>
          <span>Delivered</span>
          <strong>{delivered}</strong>
        </article>
        <article className={exceptions ? "has-alert" : undefined}>
          <span>Exceptions</span>
          <strong>{exceptions}</strong>
        </article>
      </section>

      <section className="shipment-workspace-card">
        <div className="shipment-workspace-head">
          <div>
            <span className="admin-section-kicker">Shipment register</span>
            <h2>Tracking records</h2>
            <p>{filtered.length} shipment{filtered.length === 1 ? "" : "s"} shown</p>
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
                placeholder="Search tracking, customer or route…"
              />
            </label>

            <select name="status" defaultValue={status}>
              <option value="ALL">All statuses</option>
              {shipmentStatuses.map((shipmentStatus) => (
                <option key={shipmentStatus} value={shipmentStatus}>
                  {getStatusLabel(shipmentStatus)}
                </option>
              ))}
            </select>

            <button type="submit">Filter</button>
          </form>
        </div>

        <div className="shipment-list">
          {filtered.map((shipment) => (
            <Link
              href={`/admin/shipments/${shipment.id}`}
              key={shipment.id}
              className="shipment-list-row"
            >
              <div className="shipment-list-main">
                <div className="shipment-list-reference">
                  <span>{shipment.tracking_number}</span>
                  <small>{shipment.customer_reference || "No customer ref"}</small>
                </div>

                <div className="shipment-list-route">
                  <strong>{shipment.origin}</strong>
                  <span className="shipment-route-arrow">→</span>
                  <strong>{shipment.destination}</strong>
                </div>
              </div>

              <div className="shipment-list-meta">
                <div>
                  <small>Service</small>
                  <strong>{shipment.service_type}</strong>
                </div>
                <div>
                  <small>Current location</small>
                  <strong>{shipment.current_location || "—"}</strong>
                </div>
                <div>
                  <small>Created</small>
                  <strong>{formatDate(shipment.created_at)}</strong>
                </div>
              </div>

              <div className="shipment-list-status">
                <span className={`status-pill status-${shipment.status.toLowerCase()}`}>
                  {getStatusLabel(shipment.status)}
                </span>
                <span className="shipment-open-arrow">→</span>
              </div>
            </Link>
          ))}

          {!filtered.length ? (
            <div className="shipment-empty-state">
              <strong>No shipments found</strong>
              <span>Adjust the filters or create a new shipment.</span>
            </div>
          ) : null}
        </div>
      </section>
    </AdminShell>
  );
}
