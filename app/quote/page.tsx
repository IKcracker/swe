import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a courier, road freight or international shipping quote from Siyanqoba Worldwide Express.",
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}


export default function QuotePage() {
  return (
    <main>

      <section className="inner-hero quote-page-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="section-label">Request a quote</p>
            <h1>Tell us what needs to move.</h1>
          </div>
          <div className="inner-hero-copy">
            <p>
              Share the basic shipment details with SWE and the team can help
              identify the most practical courier or freight service.
            </p>
          </div>
        </div>
      </section>

      <section className="quote-request-section">
        <div className="container quote-request-grid">
          <aside>
            <p className="section-label">Before you enquire</p>
            <h2>Have these shipment details ready.</h2>

            <div className="quote-checklist">
              <div><span>01</span><p>Collection location</p></div>
              <div><span>02</span><p>Delivery destination</p></div>
              <div><span>03</span><p>Parcel quantity, weight and dimensions</p></div>
              <div><span>04</span><p>Required delivery date or urgency</p></div>
              <div><span>05</span><p>Domestic or international shipment</p></div>
            </div>
          </aside>

          <div className="quote-contact-card">
            <span className="quote-card-label">Quote request</span>
            <h3>Send your shipment details to SWE.</h3>
            <p>
              Email the team with the information listed alongside. For urgent
              shipments, include your preferred collection time and delivery deadline.
            </p>

            <div className="quote-contact-options">
              <a href="mailto:info@swe.co.za?subject=SWE%20Quote%20Request">
                <small>Email</small>
                <strong>info@swe.co.za</strong>
                <Arrow />
              </a>
              <Link href="/contact">
                <small>Need help first?</small>
                <strong>Contact the SWE team</strong>
                <Arrow />
              </Link>
            </div>

            <p className="quote-note">
              This page currently routes quote enquiries to SWE directly. A fully
              integrated online quote submission workflow can be connected later
              without changing the page structure.
            </p>
          </div>
        </div>
      </section>

      <section className="quote-service-selector">
        <div className="container">
          <div className="quote-selector-heading">
            <p className="section-label section-label-light">Not sure what you need?</p>
            <h2>Start with the type of movement.</h2>
          </div>

          <div className="quote-selector-grid">
            <Link href="/services">
              <span>01</span>
              <h3>Urgent courier</h3>
              <p>Same day, overnight and early delivery options.</p>
              <Arrow />
            </Link>
            <Link href="/services">
              <span>02</span>
              <h3>Road freight</h3>
              <p>Larger or less time-sensitive domestic consignments.</p>
              <Arrow />
            </Link>
            <Link href="/services">
              <span>03</span>
              <h3>International</h3>
              <p>Courier, airfreight and cross-border shipment options.</p>
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
