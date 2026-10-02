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
          <span>Domestic & international courier</span>
          <strong>8 Days a Week</strong>
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
            <Link href="/track" className="track-link">Track shipment</Link>
            <Link href="/quote" className="header-cta">
              Get a quote <Arrow />
            </Link>
          </div>

          <details className="mobile-menu">
            <summary aria-label="Open navigation menu"><span /><span /></summary>
            <div>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/#network">Network</Link>
              <Link href="/documents">Documents</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/track">Track shipment</Link>
              <Link href="/quote">Get a quote</Link>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}
