import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documents & Resources",
  description:
    "Access SWE account forms, insurance information, privacy documents, cargo care resources and certifications.",
};

const documentation = [
  {
    title: "Accounts Facility Application Form",
    description: "Apply for an SWE account facility and review the applicable standard trading conditions.",
    href: "https://www.swe.co.za/documents/Account%20Facility%20Application.pdf",
  },
  {
    title: "Insurance Information",
    description: "Review insurance-related information for shipments and freight movements.",
    href: "https://www.swe.co.za/documents.php",
  },
  {
    title: "Privacy Information",
    description: "Read SWE privacy information and policies regarding customer and company data.",
    href: "https://www.swe.co.za/documents.php",
  },
  {
    title: "POPI & PAIA",
    description: "Access SWE information relating to POPIA and the Promotion of Access to Information Act.",
    href: "https://www.swe.co.za/documents/PAIA_POPI_MANUAL_SWE.pdf",
  },
  {
    title: "Cargo Care Terms & Conditions",
    description: "Understand SWE Cargo Care terms, claims requirements and applicable cover.",
    href: "https://www.swe.co.za/documents/Cargo%20Care%20Terms%20%20Conditions%2008.09.21.pdf",
  },
  {
    title: "Cargo Care Claim Form",
    description: "Access the documentation required when submitting a Cargo Care claim.",
    href: "https://www.swe.co.za/documents.php",
  },
];

const certifications = [
  "BEE Certification",
  "ICASA Certification",
  "COIDA Letter of Good Standing",
  "Employment Equity Certificate of Compliance",
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

export default function DocumentsPage() {
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
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="header-actions">
            <a href="/track" className="track-link">
              Track shipment
            </a>
            <Link href="/quote" className="header-cta">
              Get a quote <Arrow />
            </Link>
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

      <section className="inner-hero documents-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="section-label">Documents & resources</p>
            <h1>Important information, easy to find.</h1>
          </div>
          <div className="inner-hero-copy">
            <p>
              Access customer application forms, insurance information, privacy
              and compliance documents, Cargo Care resources and company
              certifications.
            </p>
          </div>
        </div>
      </section>

      <section className="documents-section">
        <div className="container documents-layout">
          <aside>
            <p className="section-label">Documentation</p>
            <h2>Customer forms & policies.</h2>
            <p>
              Open the resource you need in a new tab. Existing SWE source
              documents remain available while the new website is being rebuilt.
            </p>
          </aside>

          <div className="documents-list">
            {documentation.map((document, index) => (
              <a
                href={document.href}
                target="_blank"
                rel="noreferrer"
                className="document-row"
                key={document.title}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{document.title}</h3>
                  <p>{document.description}</p>
                </div>
                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="certification-section">
        <div className="container certification-grid">
          <div>
            <p className="section-label section-label-light">Certification</p>
            <h2>Company credentials and compliance.</h2>
          </div>

          <div className="certification-list">
            {certifications.map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
            <a
              href="https://www.swe.co.za/documents.php"
              target="_blank"
              rel="noreferrer"
              className="certification-link"
            >
              View certification documents <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="inner-cta">
        <div className="container inner-cta-grid">
          <div>
            <p className="section-label section-label-light">Need assistance?</p>
            <h2>Not sure which document you need?</h2>
          </div>
          <Link href="/contact" className="button button-light">
            Contact SWE <Arrow />
          </Link>
        </div>
      </section>
    </main>
  );
}
