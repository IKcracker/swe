import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documents & Resources",
  description:
    "Access SWE Red proposal documents and internal resource previews.",
};

const documentation = [
  ["Account Application","A neutral sample account-onboarding resource for the proposal.","account-application"],
  ["Shipping Guide","General shipment preparation guidance for the demo experience.","shipping-guide"],
  ["Privacy & Compliance","A placeholder compliance area to be replaced with client-approved legal content.","privacy-compliance"],
  ["Cargo Care Overview","A neutral overview of claims and shipment protection workflows.","cargo-care"],
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default function DocumentsPage() {
  return (
    <main>
      <section className="inner-hero documents-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="section-label">Documents & resources</p>
            <h1>Proposal resources, kept in-house.</h1>
          </div>
          <div className="inner-hero-copy">
            <p>
              These resources are original SWE Red placeholders. Client-owned
              forms, policies and certifications can replace them before launch.
            </p>
          </div>
        </div>
      </section>

      <section className="documents-section">
        <div className="container documents-layout">
          <aside>
            <p className="section-label">Internal resources</p>
            <h2>No copied PDFs or external company links.</h2>
            <p>
              Every resource below stays inside this proposal site, avoiding
              dependencies on another company&apos;s documents or hosted assets.
            </p>
          </aside>

          <div className="documents-list">
            {documentation.map(([title,description,slug], index) => (
              <Link href={`/documents/${slug}`} className="document-row" key={slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="certification-section">
        <div className="container certification-grid">
          <div>
            <p className="section-label section-label-light">Launch checklist</p>
            <h2>Client-owned compliance content goes here.</h2>
          </div>
          <div className="certification-list">
            {["Company registration details","Insurance or cargo-cover policy","Privacy and POPIA documentation","Industry certifications"].map((item,index)=>(
              <div key={item}><span>{String(index+1).padStart(2,"0")}</span><strong>{item}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-cta">
        <div className="container inner-cta-grid">
          <div>
            <p className="section-label section-label-light">Need a resource?</p>
            <h2>Client documents can be connected at launch.</h2>
          </div>
          <Link href="/contact" className="button button-light">Contact SWE Red <Arrow /></Link>
        </div>
      </section>
    </main>
  );
}
