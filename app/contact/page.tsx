import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact SWE Red",
  description:
    "Contact the SWE Red proposal team for logistics, tracking and quote enquiries.",
};

const branches = [
  ["Johannesburg","Primary hub","Demo location — client address supplied at launch"],
  ["Durban","Regional hub","Demo location — client address supplied at launch"],
  ["Cape Town","Regional hub","Demo location — client address supplied at launch"],
  ["Nelspruit","Regional hub","Demo location — client address supplied at launch"],
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main>
      <section className="inner-hero contact-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="section-label">Contact SWE Red</p>
            <h1>A clean contact experience, ready for client details.</h1>
          </div>
          <div className="inner-hero-copy">
            <p>
              This proposal intentionally avoids using another company&apos;s
              phone numbers, email addresses or branch locations.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-primary">
        <div className="container contact-primary-grid">
          <div>
            <p className="section-label">Proposal contact setup</p>
            <h2>Client-owned details at launch.</h2>
          </div>

          <div className="contact-details">
            <div><small>Email</small><p>Configured with the client&apos;s domain</p></div>
            <div><small>Phone</small><p>Configured with the client&apos;s support number</p></div>
            <div><small>Head office</small><p>Client address supplied during handover</p></div>
            <div><small>Tracking</small><Link href="/track">Open SWE Red demo tracking <Arrow /></Link></div>
          </div>
        </div>
      </section>

      <section className="branches-section">
        <div className="container">
          <div className="branches-heading">
            <p className="section-label">Illustrative network</p>
            <h2>Example hubs for proposal presentation.</h2>
          </div>

          <div className="branches-grid">
            {branches.map(([city,type,address], index) => (
              <article key={city}>
                <div className="branch-card-top"><span>{String(index+1).padStart(2,"0")}</span><small>{type}</small></div>
                <h3>{city}</h3>
                <p>{address}</p>
                <strong>Demo only</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-actions">
        <div className="container contact-actions-grid">
          <div><span>01</span><h3>Need a quote?</h3><p>Capture route, size and urgency in the SWE Red quote flow.</p><Link href="/quote">Request a quote <Arrow /></Link></div>
          <div><span>02</span><h3>Track a shipment?</h3><p>Use the internal demo tracking interface with no external courier dependency.</p><Link href="/track">Track shipment <Arrow /></Link></div>
          <div><span>03</span><h3>Need documents?</h3><p>Access original proposal resources and launch placeholders.</p><Link href="/documents">View documents <Arrow /></Link></div>
        </div>
      </section>
    </main>
  );
}
