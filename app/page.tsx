const domesticServices = [
  "Same Day Express",
  "Next Day Express",
  "Priority Delivery",
  "Economy",
  "Road Freight",
];

const internationalServices = [
  "International Documents",
  "International Parcels",
  "Urgent Special Shipments",
  "Cross-Border Road Freight",
  "International Air Freight",
  "Temporary Export Support",
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <p className="eyebrow">SWE Red Logistics Network</p>
            <h1>
              Logistics built
              <span>to move faster.</span>
            </h1>
            <p className="hero-lead">
              A modern courier and freight experience designed for domestic,
              regional and international shipment needs.
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
              <span>Domestic</span>
              <span>Regional</span>
              <span>International</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-image-overlay" />
          <div className="conquer-tag">
            <small>SWE Red</small>
            <strong>MOVE WITH CERTAINTY</strong>
          </div>
        </div>

        <div className="tracking-panel">
          <div className="tracking-title">
            <small>Demo tracking</small>
            <strong>Find your shipment</strong>
          </div>
          <form action="/track" method="get">
            <label>
              <span className="sr-only">Reference number</span>
              <input name="ref" placeholder="Enter demo reference" />
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
            <span>SWE RED</span>
            <strong>MOVE FORWARD.</strong>
          </div>

          <div className="identity-copy">
            <p className="section-label">A new logistics identity</p>
            <h2>
              Built around clarity, speed and dependable movement.
            </h2>
            <p>
              SWE Red is a proposal concept created as an independent logistics
              brand. It uses original visual assets, original copy and internal
              demo flows so it can be presented without relying on another
              company&apos;s website, documents or tracking platform.
            </p>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="container services-head">
          <div>
            <p className="section-label section-label-light">Services</p>
            <h2>One network. Multiple ways to move.</h2>
          </div>
          <p>
            Flexible delivery options for urgent courier work, larger freight
            and international movement.
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
              <p>Regional and global</p>
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
          <span className="story-number">24</span>
          <div>
            <p className="section-label">Built around movement</p>
            <h2>Visibility and service from first mile to final mile.</h2>
            <p>
              The proposal experience focuses on simple communication,
              transparent shipment steps and easy access to support.
            </p>
          </div>
        </div>
      </section>

      <section className="network-section" id="network">
        <div className="container network-grid">
          <div className="network-intro">
            <p className="section-label">Illustrative network</p>
            <h2>Key South African logistics centres.</h2>
          </div>

          <div className="branch-list">
            {["Johannesburg","Durban","Cape Town","Nelspruit"].map((city, index) => (
              <div className="branch-row" key={city}>
                <span>0{index + 1}</span>
                <strong>{city}</strong>
                <em>Demo coverage</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="resources-section" id="resources">
        <div className="container resource-grid">
          <div className="resource-intro">
            <p className="section-label">Customer tools</p>
            <h2>Everything important stays inside SWE Red.</h2>
          </div>

          <div className="resource-links">
            <a href="/track"><span>Demo shipment tracking</span><Arrow /></a>
            <a href="/documents"><span>Shipping documents</span><Arrow /></a>
            <a href="/documents"><span>Account application</span><Arrow /></a>
            <a href="/documents"><span>Compliance resources</span><Arrow /></a>
          </div>
        </div>
      </section>

      <section className="quote-section" id="quote">
        <div className="container quote-grid">
          <div>
            <p className="section-label section-label-light">Start moving</p>
            <h2>Tell us what your shipment needs.</h2>
          </div>
          <div className="quote-action">
            <p>
              Use the proposal quote flow to capture the route, shipment size
              and required delivery speed.
            </p>
            <a href="/quote" className="button button-light">
              Request a quote <Arrow />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
