import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About SWE",
  description:
    "Learn about Siyanqoba Worldwide Express, its service philosophy, network and approach to courier and freight.",
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

export default function AboutPage() {
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

      <section className="inner-hero about-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="section-label">About SWE</p>
            <h1>Driven by service. Built to conquer.</h1>
          </div>
          <div className="inner-hero-copy">
            <p>
              Siyanqoba Worldwide Express combines domestic and international
              courier, road freight and airfreight capability with a service
              philosophy centred on communication, training and continuous
              improvement.
            </p>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story-grid">
          <div className="about-story-visual">
            <div className="about-story-image" />
            <div className="about-story-badge">
              <small>Siyanqoba</small>
              <strong>TO CONQUER</strong>
            </div>
          </div>

          <div className="about-story-copy">
            <p className="section-label">The meaning behind the name</p>
            <h2>A name that reflects how we approach every shipment.</h2>
            <p>
              “Siyanqoba” is derived from the Zulu word meaning “to conquer”.
              That idea shapes the dedication and passion SWE brings to its
              customers and the way the business approaches service.
            </p>
            <p>
              The goal is straightforward: keep customers informed, keep teams
              improving and keep shipments moving through a dependable
              worldwide network.
            </p>
          </div>
        </div>
      </section>

      <section className="vision-section">
        <div className="container vision-grid">
          <div>
            <p className="section-label section-label-light">Our vision</p>
            <h2>High service levels are built deliberately.</h2>
          </div>

          <div className="vision-list">
            <article>
              <span>01</span>
              <div>
                <h3>Constant communication</h3>
                <p>Stay close to customers and keep them informed throughout the delivery journey.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Continuous training</h3>
                <p>Develop and motivate management and staff so service quality keeps improving.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Continuous improvement</h3>
                <p>Review products and services regularly so they remain useful, competitive and dependable.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="about-network">
        <div className="container about-network-grid">
          <div>
            <p className="section-label">Our footprint</p>
            <h2>South African roots. Worldwide reach.</h2>
          </div>
          <div className="about-network-copy">
            <p>
              SWE serves customers from key South African centres while
              connecting shipments to regional and international destinations.
            </p>
            <div className="about-network-cities">
              <span>Durban</span>
              <span>Johannesburg</span>
              <span>Cape Town</span>
              <span>Nelspruit</span>
            </div>
          </div>
        </div>
      </section>

      <section className="inner-cta">
        <div className="container inner-cta-grid">
          <div>
            <p className="section-label section-label-light">Work with SWE</p>
            <h2>Ready to move your next shipment?</h2>
          </div>
          <Link href="/services" className="button button-light">
            Explore services <Arrow />
          </Link>
        </div>
      </section>
    </main>
  );
}
