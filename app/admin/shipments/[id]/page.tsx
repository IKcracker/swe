import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/admin-auth";
import {
  getShipmentById,
  getShipmentEvents,
  isDatabaseConfigured,
} from "@/lib/supabase-rest";
import {
  getStatusLabel,
  shipmentStatuses,
  type ShipmentStatus,
} from "@/lib/tracking";
import { updateShipmentAction } from "../../actions";

export const metadata = {
  title: "Shipment Details",
  robots: { index: false, follow: false },
};

const journeyStatuses: ShipmentStatus[] = [
  "BOOKED",
  "COLLECTED",
  "IN_TRANSIT",
  "AT_HUB",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

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

function getJourneyProgress(status: ShipmentStatus) {
  const index = journeyStatuses.indexOf(status);
  if (index < 0) return 0;
  return Math.round((index / (journeyStatuses.length - 1)) * 100);
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
  const progress = getJourneyProgress(shipment.status);
  const latestEvent = events[0];

  const pageActions = (
    <div className="shipment-page-actions">
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

      <details className="shipment-update-drawer">
        <summary>Update shipment</summary>
        <div className="shipment-update-drawer-panel">
          <div className="shipment-update-drawer-head">
            <div>
              <span className="admin-section-kicker">Tracking update</span>
              <h2>Publish shipment update</h2>
            </div>
            <small>{shipment.tracking_number}</small>
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
                placeholder="Optional tracking information"
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
      title="Shipment details"
      description={shipment.tracking_number}
      section="shipments"
      actions={pageActions}
    >
      {updated === "1" ? (
        <div className="admin-success-notice">
          Shipment update published successfully.
        </div>
      ) : null}

      <section className="shipment-command-header">
        <div className="shipment-command-primary">
          <div className="shipment-command-id">
            <span className="admin-section-kicker">Tracking number</span>
            <h2>{shipment.tracking_number}</h2>
            <p>
              {shipment.customer_reference
                ? `Customer ref: ${shipment.customer_reference}`
                : "No customer reference"}
            </p>
          </div>

          <div className="shipment-command-state">
            <span className={`status-pill status-${shipment.status.toLowerCase()}`}>
              {getStatusLabel(shipment.status)}
            </span>
            <small>Updated {formatDate(shipment.updated_at)}</small>
          </div>
        </div>

        <div className="shipment-command-route">
          <div className="shipment-command-stop">
            <small>Origin</small>
            <strong>{shipment.origin}</strong>
          </div>

          <div className="shipment-command-route-line">
            <span />
            <i />
            <em>{shipment.current_location || "In network"}</em>
            <i />
            <span />
          </div>

          <div className="shipment-command-stop shipment-command-stop-end">
            <small>Destination</small>
            <strong>{shipment.destination}</strong>
          </div>
        </div>

        <div className="shipment-command-meta">
          <div>
            <small>Service</small>
            <strong>{shipment.service_type}</strong>
          </div>
          <div>
            <small>Estimated delivery</small>
            <strong>{formatDate(shipment.estimated_delivery)}</strong>
          </div>
          <div>
            <small>Packages</small>
            <strong>{shipment.package_count}</strong>
          </div>
          <div>
            <small>Weight</small>
            <strong>{shipment.weight_kg ? `${shipment.weight_kg} kg` : "—"}</strong>
          </div>
        </div>
      </section>

      <section className="shipment-progress-section">
        <div className="shipment-progress-head">
          <div>
            <span className="admin-section-kicker">Delivery journey</span>
            <h2>Shipment progress</h2>
          </div>
          {shipment.status === "EXCEPTION" || shipment.status === "CANCELLED" ? (
            <span className="shipment-progress-alert">
              {getStatusLabel(shipment.status)}
            </span>
          ) : (
            <strong>{progress}%</strong>
          )}
        </div>

        <div className="shipment-progress-track">
          <div
            className="shipment-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="shipment-progress-steps">
          {journeyStatuses.map((status, index) => {
            const currentIndex = journeyStatuses.indexOf(shipment.status);
            const complete = currentIndex >= index && currentIndex >= 0;
            const current = shipment.status === status;

            return (
              <div
                key={status}
                className={[
                  "shipment-progress-step",
                  complete ? "is-complete" : "",
                  current ? "is-current" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{getStatusLabel(status)}</strong>
              </div>
            );
          })}
        </div>
      </section>

      <section className="shipment-command-layout">
        <div className="shipment-command-main">
          <div className="shipment-command-section-head">
            <div>
              <span className="admin-section-kicker">Activity</span>
              <h2>Tracking history</h2>
            </div>
            <span>{events.length} update{events.length === 1 ? "" : "s"}</span>
          </div>

          {latestEvent ? (
            <article className="shipment-latest-update">
              <div>
                <span>Latest update</span>
                <strong>{latestEvent.title}</strong>
                <p>
                  {getStatusLabel(latestEvent.status)}
                  {latestEvent.location ? ` • ${latestEvent.location}` : ""}
                </p>
              </div>
              <time>{formatDate(latestEvent.event_time)}</time>
            </article>
          ) : null}

          <div className="shipment-activity-feed">
            {events.map((event, index) => (
              <article key={event.id}>
                <div className={`shipment-activity-marker ${index === 0 ? "is-latest" : ""}`}>
                  <span />
                </div>

                <div className="shipment-activity-content">
                  <div className="shipment-activity-top">
                    <strong>{event.title}</strong>
                    <time>{formatDate(event.event_time)}</time>
                  </div>
                  <p>
                    {getStatusLabel(event.status)}
                    {event.location ? ` • ${event.location}` : ""}
                  </p>
                  {event.description ? <span>{event.description}</span> : null}
                </div>
              </article>
            ))}

            {!events.length ? (
              <div className="shipment-activity-empty">
                <strong>No tracking activity yet.</strong>
                <span>Use “Update shipment” to publish the first event.</span>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="shipment-command-aside">
          <section className="shipment-side-section">
            <span className="admin-section-kicker">Recipient</span>
            <dl>
              <div>
                <dt>Name</dt>
                <dd>{shipment.recipient_name || "Not provided"}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{shipment.recipient_email || "Not provided"}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{shipment.recipient_phone || "Not provided"}</dd>
              </div>
            </dl>
          </section>

          <section className="shipment-side-section">
            <span className="admin-section-kicker">Shipment record</span>
            <dl>
              <div>
                <dt>Created</dt>
                <dd>{formatDate(shipment.created_at)}</dd>
              </div>
              <div>
                <dt>Last update</dt>
                <dd>{formatDate(shipment.updated_at)}</dd>
              </div>
              <div>
                <dt>Current location</dt>
                <dd>{shipment.current_location || "In network"}</dd>
              </div>
            </dl>
          </section>

          <Link
            href={`/track?ref=${encodeURIComponent(shipment.tracking_number)}`}
            target="_blank"
            className="shipment-public-preview"
          >
            <span>Customer tracking page</span>
            <strong>Preview public view</strong>
            <em>↗</em>
          </Link>
        </aside>
      </section>
    </AdminShell>
  );
}
