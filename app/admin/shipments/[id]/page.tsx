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
  title: "Manage Shipment",
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

  const publicTrackingAction = (
    <div className="admin-detail-actions">
      <Link href="/admin" className="admin-secondary-link">
        ← Shipments
      </Link>
      <Link
        href={`/track?ref=${encodeURIComponent(shipment.tracking_number)}`}
        target="_blank"
        className="admin-primary-link"
      >
        Open public tracking ↗
      </Link>
    </div>
  );

  return (
    <AdminShell
      title={shipment.tracking_number}
      description={`${shipment.origin} → ${shipment.destination}`}
      section="shipments"
      actions={publicTrackingAction}
    >
      {updated === "1" ? (
        <div className="admin-success-notice">Shipment update published successfully.</div>
      ) : null}

      <section className="shipment-control-hero">
        <div className="shipment-control-status">
          <span className="admin-section-kicker">Live shipment status</span>
          <span className={`status-pill status-${shipment.status.toLowerCase()}`}>
            {getStatusLabel(shipment.status)}
          </span>
          <small>Updated {formatDate(shipment.updated_at)}</small>
        </div>

        <div className="shipment-control-route">
          <div>
            <small>Origin</small>
            <strong>{shipment.origin}</strong>
          </div>
          <div className="shipment-control-journey">
            <span className="journey-point is-start" />
            <i />
            <span className="journey-truck">→</span>
            <i />
            <span className="journey-point is-end" />
          </div>
          <div>
            <small>Destination</small>
            <strong>{shipment.destination}</strong>
          </div>
        </div>

        <div className="shipment-control-eta">
          <small>Estimated delivery</small>
          <strong>{formatDate(shipment.estimated_delivery)}</strong>
          <span>{shipment.current_location || "In network"}</span>
        </div>
      </section>

      <section className="shipment-detail-shell">
        <div className="shipment-detail-main">
          <section className="shipment-facts-card">
            <div className="shipment-section-heading">
              <div>
                <span className="admin-section-kicker">Shipment facts</span>
                <h2>At a glance</h2>
              </div>
            </div>

            <div className="shipment-facts-grid">
              <div>
                <small>Customer reference</small>
                <strong>{shipment.customer_reference || "—"}</strong>
              </div>
              <div>
                <small>Service</small>
                <strong>{shipment.service_type}</strong>
              </div>
              <div>
                <small>Current location</small>
                <strong>{shipment.current_location || "In network"}</strong>
              </div>
              <div>
                <small>Packages</small>
                <strong>{shipment.package_count}</strong>
              </div>
              <div>
                <small>Weight</small>
                <strong>{shipment.weight_kg ? `${shipment.weight_kg} kg` : "—"}</strong>
              </div>
              <div>
                <small>Created</small>
                <strong>{formatDate(shipment.created_at)}</strong>
              </div>
            </div>
          </section>

          <section className="shipment-facts-card">
            <div className="shipment-section-heading">
              <div>
                <span className="admin-section-kicker">Recipient</span>
                <h2>Delivery contact</h2>
              </div>
            </div>

            <div className="shipment-contact-grid">
              <div>
                <small>Name</small>
                <strong>{shipment.recipient_name || "Not provided"}</strong>
              </div>
              <div>
                <small>Email</small>
                <strong>{shipment.recipient_email || "Not provided"}</strong>
              </div>
              <div>
                <small>Phone</small>
                <strong>{shipment.recipient_phone || "Not provided"}</strong>
              </div>
            </div>
          </section>

          <section className="shipment-timeline-card">
            <div className="shipment-section-heading shipment-section-heading-split">
              <div>
                <span className="admin-section-kicker">Tracking history</span>
                <h2>Shipment timeline</h2>
              </div>
              <span className="admin-event-count">
                {events.length} update{events.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="shipment-timeline">
              {events.map((event, index) => (
                <article key={event.id} className={index === 0 ? "is-latest" : undefined}>
                  <div className="shipment-timeline-marker">
                    <span />
                  </div>
                  <div className="shipment-timeline-content">
                    <div className="shipment-timeline-meta">
                      <strong>{event.title}</strong>
                      <time>{formatDate(event.event_time)}</time>
                    </div>
                    <p>
                      {getStatusLabel(event.status)}
                      {event.location ? ` • ${event.location}` : ""}
                    </p>
                    {event.description ? <small>{event.description}</small> : null}
                  </div>
                </article>
              ))}

              {!events.length ? (
                <div className="admin-empty-state">
                  <strong>No tracking events yet</strong>
                  <span>Publish the first update from the shipment controls.</span>
                </div>
              ) : null}
            </div>
          </section>
        </div>

        <aside className="shipment-detail-aside">
          <section className="shipment-update-panel">
            <div className="shipment-section-heading">
              <div>
                <span className="admin-section-kicker">Shipment controls</span>
                <h2>Publish update</h2>
              </div>
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
                <span>Customer-facing update *</span>
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
                  placeholder="Optional additional tracking information"
                />
              </label>

              <button type="submit" className="admin-primary-button">
                Publish tracking update
              </button>
            </form>
          </section>

          <section className="shipment-customer-preview">
            <span>Public tracking</span>
            <p>
              Updates published here appear immediately on the customer tracking page.
            </p>
            <Link
              href={`/track?ref=${encodeURIComponent(shipment.tracking_number)}`}
              target="_blank"
            >
              Preview customer view ↗
            </Link>
          </section>
        </aside>
      </section>
    </AdminShell>
  );
}
