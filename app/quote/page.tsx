import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Use the SWE Red proposal quote flow for courier and freight enquiries.",
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
          <div><p className="section-label">Request a quote</p><h1>Tell SWE Red what needs to move.</h1></div>
          <div className="inner-hero-copy"><p>This demo captures the information a future CRM or quote workflow would need.</p></div>
        </div>
      </section>

      <section className="quote-request-section">
        <div className="container quote-request-grid">
          <aside>
            <p className="section-label">Shipment details</p>
            <h2>Start with the essentials.</h2>
            <div className="quote-checklist">
              <div><span>01</span><p>Collection location</p></div>
              <div><span>02</span><p>Delivery destination</p></div>
              <div><span>03</span><p>Parcel quantity, weight and dimensions</p></div>
              <div><span>04</span><p>Required delivery speed</p></div>
              <div><span>05</span><p>Domestic or international movement</p></div>
            </div>
          </aside>

          <div className="quote-contact-card">
            <span className="quote-card-label">Proposal flow</span>
            <h3>Quote submission connects to the client&apos;s system at launch.</h3>
            <p>No copied email address or third-party quote endpoint is used in this build.</p>
            <div className="quote-contact-options">
              <Link href="/contact"><small>Next step</small><strong>Configure client contact / CRM</strong><Arrow /></Link>
              <Link href="/services"><small>Need help choosing?</small><strong>Review SWE Red services</strong><Arrow /></Link>
            </div>
            <p className="quote-note">The production implementation can connect this page to Zoho CRM, email, or another approved quote workflow.</p>
          </div>
        </div>
      </section>

      <section className="quote-service-selector">
        <div className="container">
          <div className="quote-selector-heading"><p className="section-label section-label-light">Choose a movement</p><h2>Start with the shipment type.</h2></div>
          <div className="quote-selector-grid">
            <Link href="/services"><span>01</span><h3>Urgent courier</h3><p>Priority domestic movement.</p><Arrow /></Link>
            <Link href="/services"><span>02</span><h3>Road freight</h3><p>Larger or less urgent consignments.</p><Arrow /></Link>
            <Link href="/services"><span>03</span><h3>International</h3><p>Regional and global movement.</p><Arrow /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
