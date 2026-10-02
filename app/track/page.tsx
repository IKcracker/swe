import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Track a Shipment",
  description:
    "Track an SWE courier or freight shipment using your waybill number.",
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}


export default function TrackPage() {
  return (
    <main>

      <section className="track-page-section">
        <div className="container track-page-grid">
          <div className="track-page-copy">
            <p className="section-label">Track & trace</p>
            <h1>Track your shipment.</h1>
            <p>
              Enter your SWE waybill number below. Tracking is completed through
              SWE's existing ParcelPerfect tracking service.
            </p>
          </div>

          <div className="track-page-card">
            <span>Shipment tracking</span>
            <h2>Enter your waybill number</h2>
            <form action="https://swe.pperfect.com/" method="get" target="_blank">
              <label>
                <span className="sr-only">Waybill number</span>
                <input
                  name="waybill"
                  autoComplete="off"
                  placeholder="e.g. SWE123456"
                  required
                />
              </label>
              <button type="submit">
                Track shipment <Arrow />
              </button>
            </form>
            <p>
              Tracking will open in a new tab using SWE's live tracking system.
            </p>
          </div>
        </div>
      </section>

      <section className="track-help-section">
        <div className="container track-help-grid">
          <div>
            <p className="section-label">Need assistance?</p>
            <h2>Cannot find your waybill or tracking result?</h2>
          </div>
          <div>
            <p>
              Contact SWE with your shipment reference, collection details and
              destination so the team can assist.
            </p>
            <Link href="/contact" className="button button-dark">
              Contact SWE <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
