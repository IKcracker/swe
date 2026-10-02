import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Courier & Freight Services",
  description:
    "Explore SWE domestic and international courier, express, road freight and airfreight services.",
};

const domestic = [
  ["Same Day Express","For urgent door-to-door shipments between major destinations when delivery cannot wait."],
  ["Overnight Express","Next-business-day delivery to major centres with extended regional coverage."],
  ["Early Bird Delivery","Priority early-morning delivery for shipments that need to arrive before the normal business day."],
  ["Economy","A more cost-conscious courier option for less urgent consignments."],
  ["Road Freight","Practical transport for larger, heavier or less time-sensitive shipments."],
];

const international = [
  ["Courier Documents","Time-sensitive international document delivery."],
  ["Courier Parcels","International parcel movement for business shipments."],
  ["Urgent Special Shipments","Special handling for urgent or non-standard international consignments."],
  ["International Road Freight","Cross-border road freight into neighbouring Southern African markets."],
  ["International Air Freight","Flexible airfreight for larger international shipments."],
  ["Temporary Exports","Support for goods leaving South Africa temporarily and returning later."],
];

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

export default function ServicesPage() {
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
            <Link href="/#network">Network</Link>
            <Link href="/documents">Documents</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="header-actions">
            <a href="https://swe.pperfect.com/" target="_blank" rel="noreferrer" className="track-link">Track shipment</a>
            <Link href="/#quote" className="header-cta">Get a quote <Arrow /></Link>
          </div>
        </div>
      </header>

      <section className="inner-hero services-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="section-label">Courier & freight services</p>
            <h1>The right service for every shipment.</h1>
          </div>
          <div className="inner-hero-copy">
            <p>
              Choose from urgent courier, economy delivery, road freight and
              international options based on where your shipment is going and
              how quickly it needs to arrive.
            </p>
          </div>
        </div>
      </section>

      <section className="service-category">
        <div className="container service-category-grid">
          <aside>
            <span>01</span>
            <p className="section-label">Domestic</p>
            <h2>Across South Africa.</h2>
            <p>Time-critical, overnight and freight services for local business deliveries.</p>
          </aside>

          <div className="service-detail-list">
            {domestic.map(([title,copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2,"0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <Link href="/#quote" aria-label={`Request a quote for ${title}`}><Arrow /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-category service-category-dark">
        <div className="container service-category-grid">
          <aside>
            <span>02</span>
            <p className="section-label section-label-light">International</p>
            <h2>Beyond our borders.</h2>
            <p>Courier, road freight and airfreight solutions for international movement.</p>
          </aside>

          <div className="service-detail-list">
            {international.map(([title,copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2,"0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <Link href="/#quote" aria-label={`Request a quote for ${title}`}><Arrow /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-guide">
        <div className="container service-guide-grid">
          <div>
            <p className="section-label">Not sure which service?</p>
            <h2>Start with the shipment, not the product name.</h2>
          </div>
          <div>
            <p>
              Tell SWE what you are sending, where it is going, its weight and
              dimensions, and when it needs to arrive. The team can guide you
              toward the most practical service.
            </p>
            <Link href="/#quote" className="button button-dark">Request a quote <Arrow /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
