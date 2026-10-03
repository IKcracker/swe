import type { Metadata } from "next";
import Link from "next/link";
import {
  getPublicShipmentByTrackingNumber,
  isDatabaseConfigured,
} from "@/lib/supabase-rest";
import { getStatusLabel } from "@/lib/tracking";

export const metadata: Metadata = {
  title: "Track a Shipment",
  description: "Track an SWE Red shipment using its tracking number.",
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function formatDate(value: string | null) {
  if (!value) return "To be confirmed";
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const reference = ref?.trim();
  const configured = isDatabaseConfigured();

  let shipment = null;
  let lookupError = "";

  if (reference && configured) {
    try {
      shipment = await getPublicShipmentByTrackingNumber(reference);
    } catch (error) {
      console.error("Tracking page lookup failed", error);
      lookupError = "Tracking is temporarily unavailable. Please try again.";
    }
  }

  return (
    <main>
      <section className="track-page-section">
        <div className="container track-page-grid">
          <div className="track-page-copy">
            <p className="section-label">SWE Red track & trace</p>
            <h1>Know where your shipment is.</h1>
            <p>
              Enter your SWE Red tracking number to view the latest shipment
              status, current location, estimated delivery and tracking history.
            </p>
          </div>

          <div className="track-page-card">
            <span>Shipment tracking</span>
            <h2>Enter your tracking number</h2>

            <form action="/track" method="get">
              <label>
                <span className="sr-only">Tracking number</span>
                <input
                  name="ref"
                  autoComplete="off"
                  placeholder="e.g. SWR-2026-A1B2C3D4"
                  defaultValue={reference}
                  required
                />
              </label>
              <button type="submit">
                Track shipment <Arrow />
              </button>
            </form>

            {!configured ? (
              <div className="tracking-message tracking-message-warning">
                <strong>Tracking backend setup required.</strong>
                <span>The public tracking UI is ready, but the database environment is not connected yet.</span>
              </div>
            ) : null}

            {lookupError ? (
              <div className="tracking-message tracking-message-error">{lookupError}</div>
            ) : null}

            {reference && configured && !shipment && !lookupError ? (
              <div className="tracking-message">
                <strong>No shipment found for {reference.toUpperCase()}.</strong>
                <span>Check the tracking number and try again.</span>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {shipment ? (
        <section className="tracking-result-section">
          <div className="container">
            <div className="tracking-result-head">
              <div>
                <p className="section-label">Tracking number</p>
                <h2>{shipment.tracking_number}</h2>
              </div>
              <span className={`status-pill status-${shipment.status.toLowerCase()}`}>
                {getStatusLabel(shipment.status)}
              </span>
            </div>

            <div className="tracking-summary-grid">
              <div>
                <small>From</small>
                <strong>{shipment.origin}</strong>
              </div>
              <div>
                <small>To</small>
                <strong>{shipment.destination}</strong>
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
                <small>Estimated delivery</small>
                <strong>{formatDate(shipment.estimated_delivery)}</strong>
              </div>
              <div>
                <small>Packages</small>
                <strong>{shipment.package_count}</strong>
              </div>
            </div>

            <div className="tracking-timeline-wrap">
              <div className="tracking-timeline-heading">
                <p className="section-label">Shipment history</p>
                <h3>Tracking timeline</h3>
              </div>

              <div className="tracking-timeline">
                {shipment.events.map((event, index) => (
                  <article key={event.id} className={index === 0 ? "is-latest" : ""}>
                    <div className="tracking-timeline-marker" />
                    <div>
                      <div className="tracking-event-topline">
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

                {!shipment.events.length ? (
                  <div className="tracking-message">
                    No tracking events have been published yet.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="track-help-section">
        <div className="container track-help-grid">
          <div>
            <p className="section-label">Need assistance?</p>
            <h2>Cannot find your shipment?</h2>
          </div>
          <div>
            <p>
              Contact the operations team with your customer reference and route
              details so the shipment can be located.
            </p>
            <Link href="/contact" className="button button-dark">
              Contact SWE Red <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
