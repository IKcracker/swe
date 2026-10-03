import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/admin-auth";
import {
  getShipmentById,
  getShipmentEvents,
  isDatabaseConfigured,
} from "@/lib/supabase-rest";
import { getStatusLabel, shipmentStatuses } from "@/lib/tracking";
import { updateShipmentAction } from "../../actions";

export const metadata = {
  title: "Shipment Record",
  robots: { index: false, follow: false },
};

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function datetimeLocalValue(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

export default async function ShipmentDetailPage({
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
              Configure the Supabase backend before managing shipments.
            </section>
          </div>
        </main>
      </div>
    );
  }

  const { id } = await params;
  const { updated } = await searchParams;
  const shipment = await getShipmentById(id);
  if (!shipment) notFound();

  const events = await getShipmentEvents(id);

  const pageActions = (
    <div className="shipment-record-actions">
      <Link href="/admin/shipments" className="admin-secondary-link">
        ← Shipments
      </Link>

      <Link
        href={`/track?ref=${encodeURIComponent(shipment.tracking_number)}`}
        target="_blank"
        className="admin-secondary-link"
      >
        Customer view ↗
      </Link>

      <details className="shipment-record-update">
        <summary>Update shipment</summary>

        <div className="shipment-record-update-panel">
          <div className="shipment-record-update-head">
            <div>
              <span>Shipment update</span>
              <h2>{shipment.tracking_number}</h2>
            </div>
            <small>{getStatusLabel(shipment.status)}</small>
          </div>

          <form action={updateShipmentAction} className="admin-form-stack">
            <input type="hidden" name="shipment_id" value={shipment.id} />

            <label>
              <span>Status</span>
              <select name="status" defaultValue={shipment.status}>
                {shipmentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {getStatusLabel(status)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Current location</span>
              <input
                name="current_location"
                defaultValue={shipment.current_location || ""}
                placeholder="Johannesburg Hub"
              />
            </label>

            <label>
              <span>Estimated delivery</span>
              <input
                name="estimated_delivery"
                type="datetime-local"
                defaultValue={datetimeLocalValue(shipment.estimated_delivery)}
              />
            </label>

            <label>
              <span>Public tracking update *</span>
              <input
                name="event_title"
                required
                placeholder="Arrived at Johannesburg hub"
              />
            </label>

            <label>
              <span>Description</span>
              <textarea
                name="event_description"
                rows={5}
                placeholder="Optional information visible on tracking"
              />
            </label>

            <button type="submit" className="admin-primary-button">
              Publish update
            </button>
          </form>
        </div>
      </details>
    </div>
  );

  return (
    <AdminShell
      title="Shipment record"
      description={shipment.tracking_number}
      section="shipments"
      actions={pageActions}
    >
      {updated === "1" ? (
        <div className="admin-success-notice">
          Shipment update published successfully.
        </div>
      ) : null}

      <div className="shipment-record">
        <header className="shipment-record-header">
          <div className="shipment-record-heading">
            <div>
              <span className="shipment-record-label">Tracking number</span>
              <h2>{shipment.tracking_number}</h2>
            </div>

            <span
              className={`status-pill status-${shipment.status.toLowerCase()}`}
            >
              {getStatusLabel(shipment.status)}
            </span>
          </div>

          <div className="shipment-record-subhead">
            <span>
              Customer reference:
              <strong>{shipment.customer_reference || " —"}</strong>
            </span>
            <span>
              Last updated:
              <strong>{formatDate(shipment.updated_at)}</strong>
            </span>
          </div>
        </header>

        <section className="shipment-route-band">
          <div className="shipment-route-location">
            <span>Origin</span>
            <strong>{shipment.origin}</strong>
          </div>

          <div className="shipment-route-middle">
            <div className="shipment-route-line" />
            <span>{shipment.current_location || "In network"}</span>
          </div>

          <div className="shipment-route-location shipment-route-location-end">
            <span>Destination</span>
            <strong>{shipment.destination}</strong>
          </div>
        </section>

        <section className="shipment-record-facts">
          <div>
            <span>Service</span>
            <strong>{shipment.service_type}</strong>
          </div>
          <div>
            <span>Estimated delivery</span>
            <strong>{formatDate(shipment.estimated_delivery)}</strong>
          </div>
          <div>
            <span>Packages</span>
            <strong>{shipment.package_count}</strong>
          </div>
          <div>
            <span>Weight</span>
            <strong>
              {shipment.weight_kg ? `${shipment.weight_kg} kg` : "—"}
            </strong>
          </div>
          <div>
            <span>Created</span>
            <strong>{formatDate(shipment.created_at)}</strong>
          </div>
        </section>

        <div className="shipment-record-body">
          <main className="shipment-record-main">
            <div className="shipment-record-section-title">
              <div>
                <span>Operational history</span>
                <h3>Tracking activity</h3>
              </div>
              <strong>
                {events.length} event{events.length === 1 ? "" : "s"}
              </strong>
            </div>

            <div className="shipment-event-log">
              <div className="shipment-event-log-head">
                <span>Date & time</span>
                <span>Status</span>
                <span>Location</span>
                <span>Activity</span>
              </div>

              {events.map((event) => (
                <article key={event.id}>
                  <time>{formatDate(event.event_time)}</time>

                  <div>
                    <span
                      className={`status-pill status-${event.status.toLowerCase()}`}
                    >
                      {getStatusLabel(event.status)}
                    </span>
                  </div>

                  <strong>{event.location || "—"}</strong>

                  <div className="shipment-event-description">
                    <strong>{event.title}</strong>
                    {event.description ? <p>{event.description}</p> : null}
                  </div>
                </article>
              ))}

              {!events.length ? (
                <div className="shipment-event-empty">
                  <strong>No tracking activity yet</strong>
                  <span>
                    Use Update shipment to publish the first tracking event.
                  </span>
                </div>
              ) : null}
            </div>
          </main>

          <aside className="shipment-record-sidebar">
            <section>
              <div className="shipment-record-section-title compact">
                <div>
                  <span>Recipient</span>
                  <h3>Delivery contact</h3>
                </div>
              </div>

              <dl className="shipment-record-dl">
                <div>
                  <dt>Name</dt>
                  <dd>{shipment.recipient_name || "Not provided"}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    {shipment.recipient_email ? (
                      <a href={`mailto:${shipment.recipient_email}`}>
                        {shipment.recipient_email}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    {shipment.recipient_phone ? (
                      <a href={`tel:${shipment.recipient_phone}`}>
                        {shipment.recipient_phone}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </dd>
                </div>
              </dl>
            </section>

            <section>
              <div className="shipment-record-section-title compact">
                <div>
                  <span>Operations</span>
                  <h3>Record information</h3>
                </div>
              </div>

              <dl className="shipment-record-dl">
                <div>
                  <dt>Shipment ID</dt>
                  <dd className="shipment-record-id">{shipment.id}</dd>
                </div>
                <div>
                  <dt>Current location</dt>
                  <dd>{shipment.current_location || "In network"}</dd>
                </div>
                <div>
                  <dt>Service</dt>
                  <dd>{shipment.service_type}</dd>
                </div>
                <div>
                  <dt>Last updated</dt>
                  <dd>{formatDate(shipment.updated_at)}</dd>
                </div>
              </dl>
            </section>

            <Link
              href={`/track?ref=${encodeURIComponent(shipment.tracking_number)}`}
              target="_blank"
              className="shipment-record-public-link"
            >
              <div>
                <span>Public tracking</span>
                <strong>Open customer view</strong>
              </div>
              <span>↗</span>
            </Link>
          </aside>
        </div>
      </div>
    </AdminShell>
  );
}
