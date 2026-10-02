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

function Mark() {
  return (
    <span className="swe-mark" aria-hidden="true">
      <span>S</span><span>W</span><span>E</span>
    </span>
  );
}

export default function TrackPage() {
  return (
    <main>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>Domestic & international courier</span>
          <strong>8 Days a Week</strong>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="SWE home">
            <Mark />
            <span className="brand-name">
              <strong>Siyanqoba</strong>
              <small>Worldwide Express</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/documents">Documents</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="header-actions">
            <Link href="/track" className="track-link">Track shipment</Link>
            <Link href="/quote" className="header-cta">Get a quote <Arrow /></Link>
          </div>
          <details className="mobile-menu">
            <summary aria-label="Open menu"><span /><span /></summary>
            <div>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/documents">Documents</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/track">Track shipment</Link>
              <Link href="/quote">Get a quote</Link>
            </div>
          </details>
        </div>
      </header>

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
