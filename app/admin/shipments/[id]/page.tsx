import Link from "next/link";
import { notFound } from "next/navigation";
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
      <main className="admin-shell">
        <section className="admin-setup-notice">
          Configure the Supabase backend before managing shipments.
        </section>
      </main>
    );
  }

  const { id } = await params;
  const { updated } = await searchParams;
  const shipment = await getShipmentById(id);
  if (!shipment) notFound();

  const events = await getShipmentEvents(id);

  return (
    <main className="admin-shell">
      <div className="admin-detail-back">
        <Link href="/admin">← All shipments</Link>
      </div>

      <section className="admin-detail-hero">
        <div>
          <span className="admin-kicker">Tracking number</span>
          <h1>{shipment.tracking_number}</h1>
          <p>{shipment.origin} → {shipment.destination}</p>
        </div>
        <div>
          <span className={`status-pill status-${shipment.status.toLowerCase()}`}>
            {getStatusLabel(shipment.status)}
          </span>
          <Link href={`/track?ref=${encodeURIComponent(shipment.tracking_number)}`} target="_blank">
            Open public tracking ↗
          </Link>
        </div>
      </section>

      {updated === "1" ? (
        <div className="admin-success-notice">Shipment status updated.</div>
      ) : null}

      <section className="admin-detail-grid">
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <span>Shipment</span>
            <h2>Current details</h2>
          </div>

          <dl className="admin-details-list">
            <div><dt>Customer reference</dt><dd>{shipment.customer_reference || "—"}</dd></div>
            <div><dt>Service</dt><dd>{shipment.service_type}</dd></div>
            <div><dt>Current location</dt><dd>{shipment.current_location || "—"}</dd></div>
            <div><dt>Estimated delivery</dt><dd>{formatDate(shipment.estimated_delivery)}</dd></div>
            <div><dt>Packages</dt><dd>{shipment.package_count}</dd></div>
            <div><dt>Weight</dt><dd>{shipment.weight_kg ? `${shipment.weight_kg} kg` : "—"}</dd></div>
            <div><dt>Recipient</dt><dd>{shipment.recipient_name || "—"}</dd></div>
            <div><dt>Recipient email</dt><dd>{shipment.recipient_email || "—"}</dd></div>
            <div><dt>Recipient phone</dt><dd>{shipment.recipient_phone || "—"}</dd></div>
          </dl>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-heading">
            <span>New tracking update</span>
            <h2>Publish status event</h2>
          </div>

          <form action={updateShipmentAction} className="admin-form-grid">
            <input type="hidden" name="shipment_id" value={shipment.id} />

            <label>
              <span>Status</span>
              <select name="status" defaultValue={shipment.status}>
                {shipmentStatuses.map((status) => (
                  <option key={status} value={status}>{getStatusLabel(status)}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Current location</span>
              <input name="current_location" defaultValue={shipment.current_location || ""} />
            </label>

            <label>
              <span>Estimated delivery</span>
              <input
                name="estimated_delivery"
                type="datetime-local"
                defaultValue={datetimeLocalValue(shipment.estimated_delivery)}
              />
            </label>

            <label className="admin-field-full">
              <span>Update title *</span>
              <input
                name="event_title"
                required
                placeholder="Arrived at Johannesburg hub"
              />
            </label>

            <label className="admin-field-full">
              <span>Description</span>
              <textarea
                name="event_description"
                rows={4}
                placeholder="Optional customer-facing tracking note"
              />
            </label>

            <button type="submit" className="admin-primary-button">
              Publish tracking update
            </button>
          </form>
        </div>

        <div className="admin-panel admin-panel-wide">
          <div className="admin-panel-heading">
            <span>Timeline</span>
            <h2>Tracking history</h2>
          </div>

          <div className="admin-timeline">
            {events.map((event) => (
              <article key={event.id}>
                <div className="admin-timeline-dot" />
                <div>
                  <div className="admin-timeline-meta">
                    <strong>{event.title}</strong>
                    <span>{formatDate(event.event_time)}</span>
                  </div>
                  <p>
                    {getStatusLabel(event.status)}
                    {event.location ? ` • ${event.location}` : ""}
                  </p>
                  {event.description ? <small>{event.description}</small> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
