const services = [
  {
    number: "01",
    title: "Same Day Express",
    description:
      "Priority door-to-door delivery for urgent shipments moving between major destinations.",
    meta: "Urgent delivery",
  },
  {
    number: "02",
    title: "Overnight Express",
    description:
      "Dependable next-business-day delivery to major centres, with extended regional coverage.",
    meta: "Next business day",
  },
  {
    number: "03",
    title: "Road Freight",
    description:
      "A cost-effective option for larger consignments and deliveries where speed is less critical.",
    meta: "Nationwide",
  },
  {
    number: "04",
    title: "International Courier",
    description:
      "Time-sensitive documents and parcels delivered internationally with experienced handling.",
    meta: "Worldwide",
  },
  {
    number: "05",
    title: "Air Freight",
    description:
      "Flexible international freight solutions for larger shipments moving by air.",
    meta: "Global freight",
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark" aria-hidden="true">
        <span>S</span>
        <span>W</span>
        <span>E</span>
      </span>
      <span className="brand-copy">
        <strong>Specialised</strong>
        <small>Worldwide Express</small>
      </span>
    </span>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero-shell">
        <header className="site-header">
          <a href="#" aria-label="Specialised Worldwide Express home">
            <Brand />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#coverage">Coverage</a>
            <a href="#resources">Resources</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="header-actions">
            <a
              className="header-track"
              href="https://swe.pperfect.com/"
              target="_blank"
              rel="noreferrer"
            >
              Track shipment
            </a>
            <a className="button button-orange button-compact" href="#quote">
              Get a quote
              <Arrow />
            </a>
          </div>

          <details className="mobile-nav">
            <summary aria-label="Open navigation">
              <span />
              <span />
            </summary>
            <div>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#coverage">Coverage</a>
              <a href="#resources">Resources</a>
              <a href="#contact">Contact</a>
              <a href="https://swe.pperfect.com/" target="_blank" rel="noreferrer">
                Track shipment
              </a>
            </div>
          </details>
        </header>

        <div className="hero">
          <div className="hero-content">
            <p className="eyebrow">South African courier & freight</p>

            <h1>
              Move anything.
              <span>Move it well.</span>
            </h1>

            <p className="hero-lead">
              Domestic and international courier, freight and express delivery
              solutions built around reliability, reach and responsive service.
            </p>

            <div className="hero-actions">
              <a className="button button-orange" href="#quote">
                Request a quote
                <Arrow />
              </a>
              <a
                className="button button-outline"
                href="https://swe.pperfect.com/"
                target="_blank"
                rel="noreferrer"
              >
                Track a shipment
              </a>
            </div>

            <div className="hero-proof">
              <div>
                <strong>Domestic</strong>
                <span>Express & road freight</span>
              </div>
              <div>
                <strong>International</strong>
                <span>Courier & air freight</span>
              </div>
              <div>
                <strong>Cross-border</strong>
                <span>Southern Africa</span>
              </div>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-image" />
            <div className="hero-media-caption">
              <span>Specialised Worldwide Express</span>
              <span>South Africa → Worldwide</span>
            </div>
          </div>
        </div>

        <div className="track-panel">
          <div className="track-panel-intro">
            <span>Track & trace</span>
            <strong>Find your shipment</strong>
          </div>

          <form
            action="https://swe.pperfect.com/"
            method="get"
            target="_blank"
            className="track-form"
          >
            <label>
              <span className="sr-only">Waybill number</span>
              <input name="waybill" placeholder="Enter waybill number" />
            </label>
            <button type="submit">
              Track shipment
              <Arrow />
            </button>
          </form>

          <div className="track-help">
            <span>Need help?</span>
            <a href="#contact">Contact our team</a>
          </div>
        </div>
      </section>

      <section className="statement-section" id="about">
        <div className="container statement-layout">
          <div className="section-label">Who we are</div>
          <div className="statement-copy">
            <h2>
              A logistics partner built for businesses that cannot afford to
              stand still.
            </h2>
            <div className="statement-detail">
              <p>
                SWE provides domestic and international courier, express and
                freight solutions from major South African centres to regional
                and worldwide destinations.
              </p>
              <a href="#services" className="text-arrow">
                Explore our services
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="section-label">What we move</p>
              <h2>Delivery options for every level of urgency.</h2>
            </div>
            <p>
              From documents that need to arrive today to larger consignments
              moving across borders, choose the service that matches your
              timeline.
            </p>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <a className="service-row" href="#quote" key={service.title}>
                <span className="service-number">{service.number}</span>
                <div className="service-title">
                  <h3>{service.title}</h3>
                  <span>{service.meta}</span>
                </div>
                <p>{service.description}</p>
                <span className="service-arrow">
                  <Arrow />
                </span>
              </a>
            ))}
          </div>

          <div className="service-footer">
            <p>Need a different shipping solution?</p>
            <a className="text-arrow" href="#contact">
              Talk to our team
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="coverage-section" id="coverage">
        <div className="container coverage-layout">
          <div className="coverage-content">
            <p className="section-label section-label-light">Our network</p>
            <h2>Local reach. International capability.</h2>
            <p className="coverage-lead">
              Connect major South African centres, regional destinations and
              international markets through one experienced logistics partner.
            </p>

            <div className="coverage-cities">
              <div>
                <span>01</span>
                <strong>Johannesburg</strong>
              </div>
              <div>
                <span>02</span>
                <strong>Durban</strong>
              </div>
              <div>
                <span>03</span>
                <strong>Cape Town</strong>
              </div>
              <div>
                <span>04</span>
                <strong>Nelspruit</strong>
              </div>
            </div>
          </div>

          <div className="coverage-visual" aria-hidden="true">
            <div className="coverage-line line-one" />
            <div className="coverage-line line-two" />
            <div className="coverage-line line-three" />
            <span className="coverage-dot dot-one" />
            <span className="coverage-dot dot-two" />
            <span className="coverage-dot dot-three" />
            <span className="coverage-dot dot-four" />
            <div className="coverage-badge">
              <small>Coverage</small>
              <strong>SA → WORLD</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="resources-section" id="resources">
        <div className="container">
          <div className="resources-heading">
            <p className="section-label">Customer tools</p>
            <h2>Everything you need to keep shipments moving.</h2>
          </div>

          <div className="resource-grid">
            <a
              className="resource-card resource-card-dark"
              href="https://swe.pperfect.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="resource-index">01</span>
              <div>
                <h3>Track & trace</h3>
                <p>Check the progress of an existing SWE shipment online.</p>
              </div>
              <Arrow />
            </a>

            <a className="resource-card" href="#contact">
              <span className="resource-index">02</span>
              <div>
                <h3>Shipping documents</h3>
                <p>Access customer forms and useful shipment information.</p>
              </div>
              <Arrow />
            </a>

            <a className="resource-card" href="#contact">
              <span className="resource-index">03</span>
              <div>
                <h3>Customer support</h3>
                <p>Speak to the SWE team about a shipment or service.</p>
              </div>
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="quote-section" id="quote">
        <div className="container quote-layout">
          <div>
            <p className="section-label section-label-light">Start a shipment</p>
            <h2>Where do you need it to go?</h2>
          </div>
          <div className="quote-copy">
            <p>
              Tell us where it is going, what you are sending and how quickly it
              needs to arrive. We will help you choose the right service.
            </p>
            <a
              className="button button-light"
              href="mailto:info@swe.co.za?subject=SWE%20Quote%20Request"
            >
              Request a quote
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="container footer-top">
          <div className="footer-brand">
            <Brand />
            <p>
              Courier, freight and express delivery across South Africa and
              beyond.
            </p>
          </div>

          <div className="footer-column">
            <strong>Company</strong>
            <a href="#about">About SWE</a>
            <a href="#services">Services</a>
            <a href="#coverage">Coverage</a>
          </div>

          <div className="footer-column">
            <strong>Tools</strong>
            <a href="https://swe.pperfect.com/" target="_blank" rel="noreferrer">
              Track shipment
            </a>
            <a href="#quote">Request a quote</a>
            <a href="#resources">Resources</a>
          </div>

          <div className="footer-column">
            <strong>Contact</strong>
            <a href="mailto:info@swe.co.za">info@swe.co.za</a>
            <span>Johannesburg</span>
            <span>Durban</span>
            <span>Cape Town</span>
            <span>Nelspruit</span>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>Specialised Worldwide Express</span>
          <span>South Africa</span>
        </div>
      </footer>
    </main>
  );
}
