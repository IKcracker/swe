import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/admin-auth";
import { isDatabaseConfigured, listShipments } from "@/lib/supabase-rest";
import { getStatusLabel, shipmentStatuses, type Shipment, type ShipmentStatus } from "@/lib/tracking";
import { createShipmentAction } from "./actions";

export const metadata = {
  title: "Operations Dashboard",
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

export default async function AdminPage({
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
      shipments = await listShipments(250);
    } catch (error) {
      console.error(error);
      loadError = "The database is configured but shipments could not be loaded.";
    }
  }

  const filteredShipments = shipments.filter((shipment) => {
    const statusMatch = status === "ALL" || shipment.status === status;
    return statusMatch && matchesSearch(shipment, q);
  });

  const active = shipments.filter(
    (shipment) => !["DELIVERED", "CANCELLED"].includes(shipment.status)
  ).length;
  const outForDelivery = shipments.filter(
    (shipment) => shipment.status === "OUT_FOR_DELIVERY"
  ).length;
  const delivered = shipments.filter(
    (shipment) => shipment.status === "DELIVERED"
  ).length;
  const attention = shipments.filter(
    (shipment) => shipment.status === "EXCEPTION"
  ).length;

  const createPanel = (
    <details className="admin-create-menu">
      <summary>+ New shipment</summary>
      <div className="admin-create-popover">
        <div className="admin-create-popover-head">
          <div>
            <span>New shipment</span>
            <h2>Create tracking record</h2>
          </div>
          <small>Tracking number can be auto-generated</small>
        </div>

        <form action={createShipmentAction} className="admin-form-grid admin-create-form">
          <label>
            <span>Tracking number</span>
            <input name="tracking_number" placeholder="Leave blank to auto-generate" />
          </label>
          <label>
            <span>Customer reference</span>
            <input name="customer_reference" placeholder="PO / order / reference" />
          </label>
          <label>
            <span>Origin *</span>
            <input name="origin" required placeholder="Johannesburg" />
          </label>
          <label>
            <span>Destination *</span>
            <input name="destination" required placeholder="Cape Town" />
          </label>
          <label>
            <span>Service type *</span>
            <select name="service_type" defaultValue="Next Day Express" required>
              <option>Same Day Express</option>
              <option>Next Day Express</option>
              <option>Priority Delivery</option>
              <option>Economy</option>
              <option>Road Freight</option>
              <option>International Air Freight</option>
              <option>Cross-Border Road Freight</option>
            </select>
          </label>
          <label>
            <span>Initial status *</span>
            <select name="status" defaultValue="BOOKED">
              {shipmentStatuses.map((shipmentStatus) => (
                <option key={shipmentStatus} value={shipmentStatus}>
                  {getStatusLabel(shipmentStatus)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Current location</span>
            <input name="current_location" placeholder="Johannesburg Hub" />
          </label>
          <label>
            <span>Estimated delivery</span>
            <input name="estimated_delivery" type="datetime-local" />
          </label>
          <label>
            <span>Recipient name</span>
            <input name="recipient_name" />
          </label>
          <label>
            <span>Recipient email</span>
            <input name="recipient_email" type="email" />
          </label>
          <label>
            <span>Recipient phone</span>
            <input name="recipient_phone" />
          </label>
          <label>
            <span>Packages</span>
            <input name="package_count" type="number" min="1" defaultValue="1" />
          </label>
          <label>
            <span>Weight (kg)</span>
            <input name="weight_kg" type="number" min="0" step="0.01" />
          </label>

          <button type="submit" className="admin-primary-button" disabled={!configured}>
            Create shipment
          </button>
        </form>
      </div>
    </details>
  );

  return (
    <AdminShell
      title="Operations overview"
      description="Monitor active shipments, delivery progress and tracking exceptions."
      section="overview"
      actions={createPanel}
    >
      {!configured ? (
        <section className="admin-setup-notice">
          <strong>Connect the tracking database</strong>
          <p>
            Add <code>SUPABASE_URL</code> and <code>SUPABASE_SECRET_KEY</code>,
            then run <code>supabase/schema.sql</code> in Supabase.
          </p>
        </section>
      ) : null}

      {loadError ? <section className="admin-setup-notice">{loadError}</section> : null}

      <section className="admin-metric-grid">
        <article>
          <div className="admin-metric-top">
            <span>Total shipments</span>
            <i className="metric-dot metric-dot-neutral" />
          </div>
          <strong>{shipments.length}</strong>
          <small>All tracking records</small>
        </article>
        <article>
          <div className="admin-metric-top">
            <span>Active</span>
            <i className="metric-dot metric-dot-active" />
          </div>
          <strong>{active}</strong>
          <small>Currently in the network</small>
        </article>
        <article>
          <div className="admin-metric-top">
            <span>Out for delivery</span>
            <i className="metric-dot metric-dot-blue" />
          </div>
          <strong>{outForDelivery}</strong>
          <small>Final-mile shipments</small>
        </article>
        <article>
          <div className="admin-metric-top">
            <span>Delivered</span>
            <i className="metric-dot metric-dot-success" />
          </div>
          <strong>{delivered}</strong>
          <small>Completed shipments</small>
        </article>
        <article className={attention ? "metric-attention" : undefined}>
          <div className="admin-metric-top">
            <span>Needs attention</span>
            <i className="metric-dot metric-dot-danger" />
          </div>
          <strong>{attention}</strong>
          <small>Exceptions requiring action</small>
        </article>
      </section>

      <section className="admin-shipments-card">
        <div className="admin-shipments-card-head">
          <div>
            <span className="admin-section-kicker">Shipment workspace</span>
            <h2>All shipments</h2>
            <p>{filteredShipments.length} record{filteredShipments.length === 1 ? "" : "s"} shown</p>
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
                placeholder="Search tracking, route or customer…"
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

        <div className="admin-table-wrap">
          <table className="admin-table admin-shipments-table">
            <thead>
              <tr>
                <th>Shipment</th>
                <th>Route</th>
                <th>Status</th>
                <th>Service</th>
                <th>Current location</th>
                <th>Created</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td>
                    <strong>{shipment.tracking_number}</strong>
                    <span>{shipment.customer_reference || "No customer reference"}</span>
                  </td>
                  <td>
                    <strong className="admin-route">{shipment.origin}</strong>
                    <span>→ {shipment.destination}</span>
                  </td>
                  <td>
                    <span className={`status-pill status-${shipment.status.toLowerCase()}`}>
                      {getStatusLabel(shipment.status)}
                    </span>
                  </td>
                  <td>{shipment.service_type}</td>
                  <td>{shipment.current_location || "—"}</td>
                  <td>{formatDate(shipment.created_at)}</td>
                  <td>
                    <Link
                      className="admin-row-action"
                      href={`/admin/shipments/${shipment.id}`}
                      aria-label={`Manage ${shipment.tracking_number}`}
                    >
                      →
                    </Link>
                  </td>
                </tr>
              ))}

              {!filteredShipments.length ? (
                <tr>
                  <td colSpan={7} className="admin-empty-row">
                    <div className="admin-empty-state">
                      <strong>No matching shipments</strong>
                      <span>Adjust the filters or create a new shipment.</span>
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
