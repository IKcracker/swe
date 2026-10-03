import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { isDatabaseConfigured, listShipments } from "@/lib/supabase-rest";
import { getStatusLabel, shipmentStatuses, type Shipment } from "@/lib/tracking";
import { createShipmentAction, logoutAdmin } from "./actions";

export const metadata = {
  title: "Tracking Admin",
  robots: { index: false, follow: false },
};

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminPage() {
  await requireAdmin();

  const configured = isDatabaseConfigured();
  let shipments: Shipment[] = [];
  let loadError = "";

  if (configured) {
    try {
      shipments = await listShipments();
    } catch (error) {
      console.error(error);
      loadError = "The database is configured but shipments could not be loaded.";
    }
  }

  return (
    <main className="admin-shell">
      <section className="admin-topbar">
        <div>
          <span className="admin-kicker">SWE Red Operations</span>
          <h1>Shipment tracking</h1>
          <p>Create shipments, manage delivery status and publish customer tracking updates.</p>
        </div>
        <form action={logoutAdmin}>
          <button type="submit" className="admin-secondary-button">Sign out</button>
        </form>
      </section>

      {!configured ? (
        <section className="admin-setup-notice">
          <strong>Backend setup required</strong>
          <p>
            Add <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code>,
            then run <code>supabase/schema.sql</code> in your Supabase SQL editor.
          </p>
        </section>
      ) : null}

      {loadError ? <section className="admin-setup-notice">{loadError}</section> : null}

      <section className="admin-grid">
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <span>New shipment</span>
            <h2>Create tracking record</h2>
          </div>

          <form action={createShipmentAction} className="admin-form-grid">
            <label>
              <span>Tracking number</span>
              <input name="tracking_number" placeholder="Auto-generated if blank" />
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
              <span>Status *</span>
              <select name="status" defaultValue="BOOKED">
                {shipmentStatuses.map((status) => (
                  <option key={status} value={status}>{getStatusLabel(status)}</option>
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

        <div className="admin-panel admin-panel-wide">
          <div className="admin-panel-heading">
            <span>Tracking records</span>
            <h2>{shipments.length} shipment{shipments.length === 1 ? "" : "s"}</h2>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tracking</th>
                  <th>Route</th>
                  <th>Status</th>
                  <th>Service</th>
                  <th>Created</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td>
                      <strong>{shipment.tracking_number}</strong>
                      <span>{shipment.customer_reference || "No customer ref"}</span>
                    </td>
                    <td>{shipment.origin} → {shipment.destination}</td>
                    <td>
                      <span className={`status-pill status-${shipment.status.toLowerCase()}`}>
                        {getStatusLabel(shipment.status)}
                      </span>
                    </td>
                    <td>{shipment.service_type}</td>
                    <td>{formatDate(shipment.created_at)}</td>
                    <td>
                      <Link href={`/admin/shipments/${shipment.id}`}>Manage</Link>
                    </td>
                  </tr>
                ))}
                {!shipments.length ? (
                  <tr>
                    <td colSpan={6} className="admin-empty-row">
                      No shipments yet. Create the first tracking record.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
