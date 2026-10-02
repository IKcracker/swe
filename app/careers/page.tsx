import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers at SWE",
  description:
    "Explore career opportunities at Siyanqoba Worldwide Express and learn about joining the SWE team.",
};

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

const values = [
  {
    number: "01",
    title: "Communication",
    copy: "SWE's service philosophy places strong emphasis on consistent communication with customers and teams.",
  },
  {
    number: "02",
    title: "Training",
    copy: "Continuous training and motivation are part of how SWE works to maintain strong service levels.",
  },
  {
    number: "03",
    title: "Improvement",
    copy: "The business continually evaluates and improves its products, services and operating approach.",
  },
];

export default function CareersPage() {
  return (
    <main>

      <section className="inner-hero careers-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="section-label">Careers at SWE</p>
            <h1>Build a career that keeps business moving.</h1>
          </div>
          <div className="inner-hero-copy">
            <p>
              Join a courier and freight business built around service,
              communication, training and continuous improvement.
            </p>
          </div>
        </div>
      </section>

      <section className="career-intro">
        <div className="container career-intro-grid">
          <div className="career-photo" />
          <div className="career-copy">
            <p className="section-label">Working at SWE</p>
            <h2>People are part of the service.</h2>
            <p>
              SWE's customer promise depends on people who communicate clearly,
              work with urgency and take ownership of the shipment journey from
              collection through delivery.
            </p>
            <p>
              The company also places emphasis on training and development as
              part of maintaining high service levels across its network.
            </p>
          </div>
        </div>
      </section>

      <section className="career-values">
        <div className="container">
          <div className="career-values-head">
            <p className="section-label section-label-light">What matters here</p>
            <h2>Three principles that shape the way SWE works.</h2>
          </div>

          <div className="career-values-grid">
            {values.map((value) => (
              <article key={value.number}>
                <span>{value.number}</span>
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="career-openings">
        <div className="container career-openings-grid">
          <div>
            <p className="section-label">Open opportunities</p>
            <h2>Current vacancies.</h2>
          </div>

          <div className="career-empty-state">
            <span>No public vacancies listed</span>
            <h3>There are no verified public openings available right now.</h3>
            <p>
              You can still send your CV and a short introduction to SWE for
              consideration when a suitable opportunity becomes available.
            </p>
            <a href="mailto:larryw@swe.co.za?subject=Career%20Enquiry%20-%20SWE" className="button button-dark">
              Send your CV <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="career-process">
        <div className="container career-process-grid">
          <div>
            <p className="section-label">Application process</p>
            <h2>Keep it simple.</h2>
          </div>

          <div className="career-process-list">
            <div>
              <span>01</span>
              <strong>Introduce yourself</strong>
              <p>Share your CV, the type of role you are interested in and the branch or location you prefer.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Initial review</strong>
              <p>SWE may review and verify applicant information as part of the recruitment process.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Next steps</strong>
              <p>If there is a suitable opportunity, the relevant team can contact you directly about the next stage.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="inner-cta">
        <div className="container inner-cta-grid">
          <div>
            <p className="section-label section-label-light">Interested in SWE?</p>
            <h2>Introduce yourself to the team.</h2>
          </div>
          <a href="mailto:larryw@swe.co.za?subject=Career%20Enquiry%20-%20SWE" className="button button-light">
            Send your CV <Arrow />
          </a>
        </div>
      </section>
    </main>
  );
}
