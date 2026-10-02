const domesticServices = [
  "Same Day Express",
  "Overnight Express",
  "Early Bird Delivery",
  "Economy",
  "Road Freight",
];

const internationalServices = [
  "Courier Documents",
  "Courier Parcels",
  "Urgent Special Shipments",
  "International Road Freight",
  "International Air Freight",
  "Temporary Exports",
];

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

export default function Home() {
  return (
    <main>

      <section className="hero">
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <p className="eyebrow">Siyanqoba Worldwide Express</p>
            <h1>
              Domestic speed.
              <span>Worldwide reach.</span>
            </h1>
            <p className="hero-lead">
              Courier, airfreight and road freight solutions for businesses that
              expect communication, reliability and service without compromise.
            </p>

            <div className="hero-actions">
              <a href="/quote" className="button button-dark">
                Request a quote <Arrow />
              </a>
              <a href="/services" className="button button-text">
                Explore services <Arrow />
              </a>
            </div>

            <div className="hero-footnote">
              <span>South Africa</span>
              <span>Southern Africa</span>
              <span>Worldwide</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-image-overlay" />
          <div className="conquer-tag">
            <small>Siyanqoba</small>
            <strong>TO CONQUER</strong>
          </div>
        </div>

        <div className="tracking-panel">
          <div className="tracking-title">
            <small>Track & trace</small>
            <strong>Find your shipment</strong>
          </div>
          <form action="https://swe.pperfect.com/" method="get" target="_blank">
            <label>
              <span className="sr-only">Waybill number</span>
              <input name="waybill" placeholder="Enter waybill number" />
            </label>
            <button type="submit">
              Track <Arrow />
            </button>
          </form>
        </div>
      </section>

      <section className="identity-section" id="about">
        <div className="container identity-grid">
          <div className="identity-word">
            <span>SIYANQOBA</span>
            <strong>TO CONQUER.</strong>
          </div>

          <div className="identity-copy">
            <p className="section-label">The name behind the service</p>
            <h2>
              More than a courier company. A commitment to keep moving forward.
            </h2>
            <p>
              “Siyanqoba” is derived from the Zulu word meaning “to conquer” —
              a reflection of the dedication and passion SWE brings to every
              customer relationship and every shipment.
            </p>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="container services-head">
          <div>
            <p className="section-label section-label-light">Services</p>
            <h2>One partner. Two networks. Every kind of shipment.</h2>
          </div>
          <p>
            Choose from time-critical courier services, economy delivery,
            road freight and international airfreight options.
          </p>
        </div>

        <div className="container service-columns">
          <div className="service-column">
            <div className="service-column-head">
              <span>01</span>
              <h3>Domestic</h3>
              <p>Across South Africa</p>
            </div>
            <div className="service-links">
              {domesticServices.map((service) => (
                <a href="/quote" key={service}>
                  <span>{service}</span><Arrow />
                </a>
              ))}
            </div>
          </div>

          <div className="service-column">
            <div className="service-column-head">
              <span>02</span>
              <h3>International</h3>
              <p>Beyond our borders</p>
            </div>
            <div className="service-links">
              {internationalServices.map((service) => (
                <a href="/quote" key={service}>
                  <span>{service}</span><Arrow />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="image-story">
        <div className="image-story-photo" />
        <div className="image-story-copy">
          <span className="story-number">08</span>
          <div>
            <p className="section-label">Days a week</p>
            <h2>Service that does not stop at the ordinary.</h2>
            <p>
              Constant communication, trained teams and continuous improvement
              remain at the centre of SWE&apos;s service philosophy.
            </p>
          </div>
        </div>
      </section>

      <section className="network-section" id="network">
        <div className="container network-grid">
          <div className="network-intro">
            <p className="section-label">Our footprint</p>
            <h2>Local teams. Connected reach.</h2>
          </div>

          <div className="branch-list">
            {["Durban","Johannesburg","Cape Town","Nelspruit"].map((city, index) => (
              <div className="branch-row" key={city}>
                <span>0{index + 1}</span>
                <strong>{city}</strong>
                <em>South Africa</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="resources-section" id="resources">
        <div className="container resource-grid">
          <div className="resource-intro">
            <p className="section-label">Customer resources</p>
            <h2>Everything you need, without the runaround.</h2>
          </div>

          <div className="resource-links">
            <a href="https://swe.pperfect.com/" target="_blank" rel="noreferrer">
              <span>Track a shipment</span><Arrow />
            </a>
            <a href="/contact">
              <span>Shipping documents</span><Arrow />
            </a>
            <a href="/contact">
              <span>Account application</span><Arrow />
            </a>
            <a href="/contact">
              <span>Conditions of carriage</span><Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="quote-section" id="quote">
        <div className="container quote-grid">
          <div>
            <p className="section-label section-label-light">Start moving</p>
            <h2>Tell us where it needs to go.</h2>
          </div>
          <div className="quote-action">
            <p>
              Speak to the SWE team about the right courier or freight solution
              for your shipment.
            </p>
            <a href="mailto:info@swe.co.za?subject=SWE%20Quote%20Request" className="button button-light">
              Request a quote <Arrow />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
