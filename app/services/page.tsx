import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Courier & Freight Services",
  description:
    "Explore SWE Red domestic courier, road freight, cross-border and international logistics services.",
};

const domestic = [
  ["Same Day Express","For urgent door-to-door shipments between major destinations when delivery cannot wait."],
  ["Next Day Express","Next-business-day delivery for routine business shipments."],
  ["Priority Delivery","Early or time-sensitive delivery for critical consignments."],
  ["Economy","A cost-conscious option for less urgent shipments."],
  ["Road Freight","Practical transport for larger, heavier or less time-sensitive consignments."],
];

const international = [
  ["International Documents","Time-sensitive international document delivery."],
  ["International Parcels","Global parcel movement for business shipments."],
  ["Urgent Special Shipments","Priority handling for urgent or non-standard consignments."],
  ["Cross-Border Road Freight","Regional road freight into neighbouring markets."],
  ["International Air Freight","Flexible airfreight for larger international shipments."],
  ["Temporary Export Support","A proposed service flow for temporary outbound goods."],
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <main>
      <section className="inner-hero services-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="section-label">SWE Red services</p>
            <h1>The right movement for every shipment.</h1>
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
            <p>Time-critical, routine and freight services for local business deliveries.</p>
          </aside>

          <div className="service-detail-list">
            {domestic.map(([title,copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2,"0")}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
                <Link href="/quote" aria-label={`Request a quote for ${title}`}><Arrow /></Link>
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
            <h2>Regional and global.</h2>
            <p>Courier, road freight and airfreight concepts for cross-border movement.</p>
          </aside>

          <div className="service-detail-list">
            {international.map(([title,copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2,"0")}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
                <Link href="/quote" aria-label={`Request a quote for ${title}`}><Arrow /></Link>
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
              Share the route, weight, dimensions and delivery deadline. The
              final implementation can use those details to recommend the most
              practical service.
            </p>
            <Link href="/quote" className="button button-dark">Request a quote <Arrow /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
