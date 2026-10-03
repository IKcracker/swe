import type { Metadata } from "next";
import Link from "next/link";
import { submitQuoteRequest } from "./actions";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a domestic, regional or international logistics quote from SWE Red.",
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>;
}) {
  const { submitted } = await searchParams;
  const submittedQuote = submitted && submitted !== "1" ? submitted : null;

  return (
    <main>
      <section className="inner-hero quote-page-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="section-label">Request a quote</p>
            <h1>Tell us what needs to move.</h1>
          </div>
          <div className="inner-hero-copy">
            <p>
              Share your shipment details and SWE Red can review the route,
              service requirements and delivery timing.
            </p>
          </div>
        </div>
      </section>

      <section className="quote-request-section">
        <div className="container quote-request-grid">
          <aside>
            <p className="section-label">Before you submit</p>
            <h2>Give us enough detail to quote accurately.</h2>
            <div className="quote-checklist">
              <div><span>01</span><p>Collection and delivery locations</p></div>
              <div><span>02</span><p>Service type or delivery urgency</p></div>
              <div><span>03</span><p>Package count, weight and dimensions</p></div>
              <div><span>04</span><p>Preferred collection date</p></div>
              <div><span>05</span><p>Your contact details</p></div>
            </div>
          </aside>

          <div className="quote-form-card">
            {submitted ? (
              <div className="quote-success-state">
                <span>Quote request received</span>
                <h2>Thanks — your request is with the SWE Red team.</h2>
                {submittedQuote ? (
                  <div className="quote-reference">
                    <small>Your quote reference</small>
                    <strong>{submittedQuote}</strong>
                  </div>
                ) : null}
                <p>
                  Keep this reference for follow-up. The operations team can now
                  review the request from the admin dashboard.
                </p>
                <div className="quote-success-actions">
                  <Link href="/quote" className="button button-dark">
                    Submit another request
                  </Link>
                  <Link href="/services" className="button button-text">
                    View services <Arrow />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="quote-form-heading">
                  <span>Get a quote</span>
                  <h2>Shipment details</h2>
                  <p>Fields marked with * are required.</p>
                </div>

                <form action={submitQuoteRequest} className="public-quote-form">
                  <div className="quote-form-section">
                    <div className="quote-form-section-head">
                      <span>01</span>
                      <strong>Contact information</strong>
                    </div>

                    <div className="quote-form-grid">
                      <label>
                        <span>Full name *</span>
                        <input name="full_name" required />
                      </label>
                      <label>
                        <span>Company</span>
                        <input name="company_name" />
                      </label>
                      <label>
                        <span>Email *</span>
                        <input name="email" type="email" required />
                      </label>
                      <label>
                        <span>Phone *</span>
                        <input name="phone" type="tel" required />
                      </label>
                    </div>
                  </div>

                  <div className="quote-form-section">
                    <div className="quote-form-section-head">
                      <span>02</span>
                      <strong>Route & service</strong>
                    </div>

                    <div className="quote-form-grid">
                      <label>
                        <span>Collection location *</span>
                        <input name="origin" required placeholder="Johannesburg" />
                      </label>
                      <label>
                        <span>Delivery destination *</span>
                        <input name="destination" required placeholder="Cape Town" />
                      </label>
                      <label>
                        <span>Service type *</span>
                        <select name="service_type" defaultValue="Next Day Express" required>
                          <option>Same Day Express</option>
                          <option>Next Day Express</option>
                          <option>Priority Delivery</option>
                          <option>Economy</option>
                          <option>Road Freight</option>
                          <option>International Air Freight</option>
                          <option>Cross-Border Road Freight</option>
                          <option>Not sure — advise me</option>
                        </select>
                      </label>
                      <label>
                        <span>Preferred collection date</span>
                        <input name="preferred_collection_date" type="date" />
                      </label>
                    </div>
                  </div>

                  <div className="quote-form-section">
                    <div className="quote-form-section-head">
                      <span>03</span>
                      <strong>Shipment information</strong>
                    </div>

                    <div className="quote-form-grid">
                      <label>
                        <span>Packages</span>
                        <input
                          name="package_count"
                          type="number"
                          min="1"
                          defaultValue="1"
                        />
                      </label>
                      <label>
                        <span>Total weight (kg)</span>
                        <input name="weight_kg" type="number" min="0" step="0.01" />
                      </label>
                      <label className="quote-field-full">
                        <span>Dimensions</span>
                        <input
                          name="dimensions"
                          placeholder="e.g. 60 x 40 x 35 cm per package"
                        />
                      </label>
                      <label className="quote-field-full">
                        <span>Additional information</span>
                        <textarea
                          name="notes"
                          rows={5}
                          placeholder="Describe the goods, urgency, special handling or any other requirements."
                        />
                      </label>
                    </div>
                  </div>

                  <div className="quote-form-submit">
                    <p>
                      By submitting, you are asking SWE Red to contact you about
                      this shipment enquiry.
                    </p>
                    <button type="submit">
                      Submit quote request <Arrow />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="quote-service-selector">
        <div className="container">
          <div className="quote-selector-heading">
            <p className="section-label section-label-light">Need guidance?</p>
            <h2>Start with the type of movement.</h2>
          </div>
          <div className="quote-selector-grid">
            <Link href="/services">
              <span>01</span><h3>Urgent courier</h3>
              <p>Priority domestic movement.</p><Arrow />
            </Link>
            <Link href="/services">
              <span>02</span><h3>Road freight</h3>
              <p>Larger or less urgent consignments.</p><Arrow />
            </Link>
            <Link href="/services">
              <span>03</span><h3>International</h3>
              <p>Regional and global movement.</p><Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
