import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About SWE Red",
  description:
    "Learn about the SWE Red logistics concept, service principles and proposed network.",
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <main>
      <section className="inner-hero about-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="section-label">About SWE Red</p>
            <h1>Modern logistics without the noise.</h1>
          </div>
          <div className="inner-hero-copy">
            <p>
              SWE Red is an independent proposal concept focused on a simple,
              confident logistics experience for domestic, regional and
              international shipment services.
            </p>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story-grid">
          <div className="about-story-visual">
            <div className="about-story-image" />
            <div className="about-story-badge">
              <small>SWE Red</small>
              <strong>MOVE FORWARD</strong>
            </div>
          </div>

          <div className="about-story-copy">
            <p className="section-label">The brand idea</p>
            <h2>A sharper identity for a modern logistics business.</h2>
            <p>
              The SWE Red concept is built around movement, visibility and
              dependable service. Its visual system and copy were created for
              this proposal rather than copied from an existing courier brand.
            </p>
            <p>
              Operational details such as live depot addresses, account
              documents, support contacts and tracking APIs can be connected to
              the client&apos;s own systems at launch.
            </p>
          </div>
        </div>
      </section>

      <section className="vision-section">
        <div className="container vision-grid">
          <div>
            <p className="section-label section-label-light">Service principles</p>
            <h2>A simple promise: clear, responsive, dependable.</h2>
          </div>

          <div className="vision-list">
            <article>
              <span>01</span>
              <div>
                <h3>Clear communication</h3>
                <p>Keep shipment information understandable and accessible.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Responsive service</h3>
                <p>Make it easy for customers to reach the right person quickly.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Continuous improvement</h3>
                <p>Design processes and digital tools around fewer customer friction points.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="about-network">
        <div className="container about-network-grid">
          <div>
            <p className="section-label">Illustrative footprint</p>
            <h2>South African reach with room to scale.</h2>
          </div>
          <div className="about-network-copy">
            <p>
              The proposal uses four major logistics centres to demonstrate how
              a national network could be presented. Final branch data should be
              supplied by the client.
            </p>
            <div className="about-network-cities">
              <span>Johannesburg</span>
              <span>Durban</span>
              <span>Cape Town</span>
              <span>Nelspruit</span>
            </div>
          </div>
        </div>
      </section>

      <section className="inner-cta">
        <div className="container inner-cta-grid">
          <div>
            <p className="section-label section-label-light">Explore the concept</p>
            <h2>See how SWE Red moves shipments.</h2>
          </div>
          <Link href="/services" className="button button-light">
            Explore services <Arrow />
          </Link>
        </div>
      </section>
    </main>
  );
}
