import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers at SWE Red",
  description: "Explore the SWE Red careers proposal experience.",
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

const values = [
  ["01","Communication","Clear information and responsive service across every handoff."],
  ["02","Ownership","A culture where people take responsibility for shipment outcomes."],
  ["03","Improvement","Digital tools and processes designed to reduce customer friction."],
];

export default function CareersPage() {
  return (
    <main>
      <section className="inner-hero careers-hero">
        <div className="container inner-hero-grid">
          <div><p className="section-label">Careers at SWE Red</p><h1>Build a career around movement.</h1></div>
          <div className="inner-hero-copy"><p>A proposal careers experience ready to connect to the client&apos;s real recruitment process.</p></div>
        </div>
      </section>

      <section className="career-intro">
        <div className="container career-intro-grid">
          <div className="career-photo" />
          <div className="career-copy">
            <p className="section-label">Working at SWE Red</p>
            <h2>People make logistics work.</h2>
            <p>The concept positions service, accountability and communication as the foundation of the customer experience.</p>
            <p>Real vacancies, employment policies and recruitment contacts should be supplied by the client before launch.</p>
          </div>
        </div>
      </section>

      <section className="career-values">
        <div className="container">
          <div className="career-values-head"><p className="section-label section-label-light">What matters here</p><h2>Three principles for the proposed culture.</h2></div>
          <div className="career-values-grid">
            {values.map(([number,title,copy])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="career-openings">
        <div className="container career-openings-grid">
          <div><p className="section-label">Open opportunities</p><h2>Client vacancies at launch.</h2></div>
          <div className="career-empty-state">
            <span>Proposal placeholder</span>
            <h3>No fabricated vacancies or copied recruitment contacts.</h3>
            <p>Connect this section to the client&apos;s approved jobs feed, HR email or application system before launch.</p>
            <Link href="/contact" className="button button-dark">Contact page <Arrow /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
