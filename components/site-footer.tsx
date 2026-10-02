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

export function SiteFooter() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer-cta">
        <div className="container footer-cta-inner">
          <div>
            <span className="footer-kicker">Ready to move?</span>
            <h2>Let&apos;s get your shipment moving.</h2>
          </div>

          <div className="footer-cta-actions">
            <Link href="/quote" className="footer-primary-action">
              Request a quote <Arrow />
            </Link>
            <Link href="/track" className="footer-secondary-action">
              Track shipment
            </Link>
          </div>
        </div>
      </div>

      <div className="container footer-content">
        <div className="footer-brand-block">
          <div className="footer-brand">
            <Mark />
            <div>
              <strong>Siyanqoba Worldwide Express</strong>
              <span>Courier • Freight • Airfreight</span>
            </div>
          </div>

          <p>
            Domestic and international courier, express and freight solutions
            connecting South African businesses to regional and worldwide destinations.
          </p>

          <div className="footer-service-line">
            <span>South Africa</span>
            <i />
            <span>Southern Africa</span>
            <i />
            <span>Worldwide</span>
          </div>
        </div>

        <div className="footer-nav-group">
          <div className="footer-column">
            <strong>Company</strong>
            <Link href="/about">About SWE</Link>
            <Link href="/services">Services</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <strong>Customer</strong>
            <Link href="/track">Track shipment</Link>
            <Link href="/quote">Request a quote</Link>
            <Link href="/documents">Documents</Link>
            <Link href="/#network">Our network</Link>
          </div>

          <div className="footer-column footer-contact-column">
            <strong>Get in touch</strong>
            <a href="mailto:info@swe.co.za">info@swe.co.za</a>
            <a href="tel:+27315696808">031 569 6808</a>
            <span>Riverhorse Valley</span>
            <span>Durban, South Africa</span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Siyanqoba Worldwide Express</span>
        <div>
          <Link href="/documents">Privacy & compliance</Link>
          <span>8 Days a Week</span>
        </div>
      </div>
    </footer>
  );
}
