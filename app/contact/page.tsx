import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact SWE",
  description:
    "Contact Siyanqoba Worldwide Express for courier, freight, tracking and shipment support.",
};

const branches = [
  {
    city: "Durban",
    type: "Head office",
    address: "Unit 3 Grid Heights, 11 Riverhorse Close, Riverhorse Valley, Durban, KwaZulu-Natal",
    phone: "031 569 6808",
  },
  {
    city: "Johannesburg",
    type: "Branch",
    address: "Contact SWE for current branch location and collection arrangements.",
    phone: "Contact SWE",
  },
  {
    city: "Cape Town",
    type: "Branch",
    address: "Contact SWE for current branch location and collection arrangements.",
    phone: "Contact SWE",
  },
  {
    city: "Nelspruit",
    type: "Branch",
    address: "Contact SWE for current branch location and collection arrangements.",
    phone: "Contact SWE",
  },
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

export default function ContactPage() {
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
            <a href="https://swe.pperfect.com/" target="_blank" rel="noreferrer" className="track-link">
              Track shipment
            </a>
            <Link href="/#quote" className="header-cta">
              Get a quote <Arrow />
            </Link>
          </div>
        </div>
      </header>

      <section className="inner-hero contact-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="section-label">Contact SWE</p>
            <h1>Talk to the team that keeps things moving.</h1>
          </div>
          <div className="inner-hero-copy">
            <p>
              Whether you need shipment support, a courier recommendation or
              help choosing the right freight option, speak directly with SWE.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-primary">
        <div className="container contact-primary-grid">
          <div>
            <p className="section-label">Head office</p>
            <h2>Riverhorse Valley, Durban.</h2>
          </div>

          <div className="contact-details">
            <div>
              <small>Phone</small>
              <a href="tel:+27315696808">031 569 6808</a>
            </div>
            <div>
              <small>Email</small>
              <a href="mailto:larry@swe.co.za">larry@swe.co.za</a>
            </div>
            <div>
              <small>Address</small>
              <p>Unit 3 Grid Heights, 11 Riverhorse Close, Riverhorse Valley, Durban, KwaZulu-Natal</p>
            </div>
            <div>
              <small>Shipment tracking</small>
              <a href="https://swe.pperfect.com/" target="_blank" rel="noreferrer">
                Open track & trace <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="branches-section">
        <div className="container">
          <div className="branches-heading">
            <p className="section-label">Our network</p>
            <h2>Four key South African centres.</h2>
          </div>

          <div className="branches-grid">
            {branches.map((branch, index) => (
              <article key={branch.city}>
                <div className="branch-card-top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{branch.type}</small>
                </div>
                <h3>{branch.city}</h3>
                <p>{branch.address}</p>
                <strong>{branch.phone}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-actions">
        <div className="container contact-actions-grid">
          <div>
            <span>01</span>
            <h3>Need a quote?</h3>
            <p>Tell SWE what you are sending, where it is going and when it needs to arrive.</p>
            <Link href="/#quote">Request a quote <Arrow /></Link>
          </div>

          <div>
            <span>02</span>
            <h3>Already shipped?</h3>
            <p>Use SWE Track & Trace to check the progress of your existing shipment.</p>
            <a href="https://swe.pperfect.com/" target="_blank" rel="noreferrer">
              Track shipment <Arrow />
            </a>
          </div>

          <div>
            <span>03</span>
            <h3>Need documents?</h3>
            <p>Access customer forms, Cargo Care information, POPI/PAIA documents and certifications.</p>
            <Link href="/documents">View documents <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="inner-cta">
        <div className="container inner-cta-grid">
          <div>
            <p className="section-label section-label-light">Start a conversation</p>
            <h2>Have a shipment question?</h2>
          </div>
          <a href="mailto:larry@swe.co.za" className="button button-light">
            Email SWE <Arrow />
          </a>
        </div>
      </section>
    </main>
  );
}
