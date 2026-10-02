import Link from "next/link";

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
      <div className="container footer-main">
        <div className="footer-brand">
          <Mark />
          <div>
            <strong>Siyanqoba Worldwide Express</strong>
            <span>Courier • Freight • Airfreight</span>
          </div>
        </div>

        <div className="footer-column">
          <strong>Navigate</strong>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/#network">Network</Link>
          <Link href="/documents">Documents</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <strong>Customer</strong>
          <Link href="/track">Track shipment</Link>
          <Link href="/quote">Get a quote</Link>
          <a href="mailto:info@swe.co.za">info@swe.co.za</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Siyanqoba Worldwide Express</span>
        <span>8 Days a Week</span>
      </div>
    </footer>
  );
}
