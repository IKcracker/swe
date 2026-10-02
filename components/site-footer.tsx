import Image from "next/image";
import Link from "next/link";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer-cta">
        <div className="container footer-cta-inner">
          <div>
            <span className="footer-kicker">Move with SWE Red</span>
            <h2>Built for the next shipment.</h2>
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
            <Image src="/swe-red-logo.svg" alt="SWE Red Logistics Network" width={220} height={63} className="footer-logo" />
            <div>
              <strong>SWE Red Logistics Network</strong>
              <span>Courier • Freight • Logistics</span>
            </div>
          </div>

          <p>
            A proposal-ready logistics brand concept for domestic, regional and
            international shipment services.
          </p>

          <div className="footer-service-line">
            <span>Domestic</span>
            <i />
            <span>Regional</span>
            <i />
            <span>Global</span>
          </div>
        </div>

        <div className="footer-nav-group">
          <div className="footer-column">
            <strong>Company</strong>
            <Link href="/about">About SWE Red</Link>
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
            <strong>Proposal demo</strong>
            <span>Contact details configured at launch</span>
            <span>Tracking API connected at launch</span>
            <span>Compliance documents supplied by client</span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} SWE Red Logistics Network</span>
        <div>
          <Link href="/documents">Privacy & compliance</Link>
          <span>Concept website</span>
        </div>
      </div>
    </footer>
  );
}
