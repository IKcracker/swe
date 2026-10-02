import Link from "next/link";

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

export function SiteHeader() {
  return (
    <>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>Courier • Freight • Airfreight</span>
          <div className="utility-right">
            <a href="tel:+27315696808">031 569 6808</a>
            <i />
            <strong>8 Days a Week</strong>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="Siyanqoba Worldwide Express home">
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
            <Link href="/track" className="track-link">
              <span className="track-dot" />
              Track shipment
            </Link>
            <Link href="/quote" className="header-cta">
              Get a quote <Arrow />
            </Link>
          </div>

          <details className="mobile-menu">
            <summary aria-label="Open navigation menu">
              <span className="mobile-menu-label">Menu</span>
              <span className="mobile-menu-icon" aria-hidden="true">
                <i />
                <i />
              </span>
            </summary>
            <div className="mobile-menu-panel">
              <span className="mobile-menu-kicker">Explore SWE</span>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/#network">Network</Link>
              <Link href="/documents">Documents</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/contact">Contact</Link>
              <div className="mobile-menu-actions">
                <Link href="/track">Track shipment</Link>
                <Link href="/quote">Get a quote</Link>
              </div>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}
