const services = [
  {
    title: "Same Day Express",
    eyebrow: "Urgent",
    copy: "Priority door-to-door delivery between major centres when tomorrow is too late.",
    className: "service-featured",
  },
  {
    title: "Overnight Express",
    eyebrow: "Next business day",
    copy: "Fast, dependable overnight delivery across SWE's major-centre network.",
    className: "",
  },
  {
    title: "Road Freight",
    eyebrow: "Nationwide",
    copy: "Cost-effective movement for larger or less time-sensitive consignments.",
    className: "",
  },
  {
    title: "International",
    eyebrow: "Worldwide",
    copy: "Courier and airfreight solutions connecting South Africa to global destinations.",
    className: "service-wide",
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
      <section className="hero">
        <div className="hero-backdrop" />
        <div className="hero-shade" />

        <header className="header">
          <a href="#" aria-label="SWE home">
            <Brand />
          </a>

          <nav className="nav" aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#coverage">Coverage</a>
            <a href="#resources">Resources</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="header-right">
            <a
              href="https://swe.pperfect.com/"
              target="_blank"
              rel="noreferrer"
              className="track-link"
            >
              Track shipment
            </a>
            <a href="#quote" className="quote-link">
              Get a quote
              <Arrow />
            </a>
          </div>

          <details className="mobile-menu">
            <summary aria-label="Open menu">
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

        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Courier • Freight • Express</p>
            <h1>
              Built to move
              <span>what matters.</span>
            </h1>
            <p className="hero-lead">
              Reliable delivery across South Africa and beyond, backed by
              responsive service and logistics expertise.
            </p>
            <div className="hero-buttons">
              <a href="#quote" className="primary-button">
                Request a quote
                <Arrow />
              </a>
              <a
                href="https://swe.pperfect.com/"
                target="_blank"
                rel="noreferrer"
                className="secondary-button"
              >
                Track a shipment
              </a>
            </div>
          </div>

          <div className="hero-bottom">
            <div className="hero-stat">
              <span>01</span>
              <strong>Domestic express</strong>
            </div>
            <div className="hero-stat">
              <span>02</span>
              <strong>Road freight</strong>
            </div>
            <div className="hero-stat">
              <span>03</span>
              <strong>International</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="tracking-strip">
        <div className="container tracking-inner">
          <div>
            <span className="mini-label">Track & trace</span>
            <h2>Where is your shipment?</h2>
          </div>

          <form
            action="https://swe.pperfect.com/"
            method="get"
            target="_blank"
            className="tracking-form"
          >
            <label>
              <span className="sr-only">Waybill number</span>
              <input name="waybill" placeholder="Enter your waybill number" />
            </label>
            <button type="submit">
              Track now
              <Arrow />
            </button>
          </form>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="container about-layout">
          <div className="about-label">
            <span>About SWE</span>
          </div>

          <div className="about-main">
            <h2>
              Logistics should feel simple,
              <span>even when the journey is not.</span>
            </h2>

            <div className="about-details">
              <p>
                Specialised Worldwide Express provides domestic and
                international courier, express and freight solutions from major
                South African centres to regional and worldwide destinations.
              </p>

              <div className="about-points">
                <div>
                  <strong>South Africa</strong>
                  <span>Major-centre and regional delivery</span>
                </div>
                <div>
                  <strong>Southern Africa</strong>
                  <span>Cross-border road freight</span>
                </div>
                <div>
                  <strong>Worldwide</strong>
                  <span>Courier and airfreight capability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="container services-heading">
          <p className="mini-label">Our services</p>
          <div>
            <h2>Choose the right way to move.</h2>
            <p>
              From urgent documents to heavy freight, SWE gives you practical
              delivery options without unnecessary complexity.
            </p>
          </div>
        </div>

        <div className="container service-grid">
          {services.map((service, index) => (
            <a
              href="#quote"
              className={`service-block ${service.className}`}
              key={service.title}
            >
              <div className="service-top">
                <span className="service-index">0{index + 1}</span>
                <span className="service-eyebrow">{service.eyebrow}</span>
              </div>
              <div className="service-bottom">
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </div>
              <span className="service-arrow">
                <Arrow />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="image-break">
        <div className="image-break-photo" />
        <div className="image-break-content">
          <p className="mini-label">Built around reliability</p>
          <h2>From collection to final delivery.</h2>
          <p>
            Whether it is time-critical courier work or planned freight, we
            focus on getting the basics right: communication, movement and
            delivery.
          </p>
          <a href="#quote" className="text-link-arrow">
            Start a shipment
            <Arrow />
          </a>
        </div>
      </section>

      <section className="coverage-section" id="coverage">
        <div className="container coverage-heading">
          <div>
            <p className="mini-label mini-label-light">Our network</p>
            <h2>South Africa connected.</h2>
          </div>
          <p>
            SWE operates from key South African centres with regional and
            international connections that extend your reach beyond the major
            routes.
          </p>
        </div>

        <div className="container coverage-grid">
          <div className="city">
            <span>JHB</span>
            <strong>Johannesburg</strong>
          </div>
          <div className="city">
            <span>DUR</span>
            <strong>Durban</strong>
          </div>
          <div className="city">
            <span>CPT</span>
            <strong>Cape Town</strong>
          </div>
          <div className="city">
            <span>MQP</span>
            <strong>Nelspruit</strong>
          </div>
          <div className="city city-world">
            <span>INTL</span>
            <strong>Worldwide connections</strong>
          </div>
        </div>
      </section>

      <section className="resources-section" id="resources">
        <div className="container resources-layout">
          <div className="resources-title">
            <p className="mini-label">Customer tools</p>
            <h2>Useful links, without the clutter.</h2>
          </div>

          <div className="resource-list">
            <a
              href="https://swe.pperfect.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span>01</span>
              <div>
                <strong>Track & trace</strong>
                <small>Check your shipment status</small>
              </div>
              <Arrow />
            </a>

            <a href="#contact">
              <span>02</span>
              <div>
                <strong>Shipping documents</strong>
                <small>Forms and shipment information</small>
              </div>
              <Arrow />
            </a>

            <a href="#contact">
              <span>03</span>
              <div>
                <strong>Customer support</strong>
                <small>Speak to the SWE team</small>
              </div>
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="quote-section" id="quote">
        <div className="container quote-layout">
          <div>
            <p className="mini-label mini-label-light">Ready when you are</p>
            <h2>Let&apos;s get it moving.</h2>
          </div>

          <div>
            <p>
              Tell us what you are sending, where it is going and when it needs
              to arrive.
            </p>
            <a
              href="mailto:info@swe.co.za?subject=SWE%20Quote%20Request"
              className="quote-button"
            >
              Request a quote
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              Courier, freight and express delivery across South Africa and
              beyond.
            </p>
          </div>

          <div className="footer-col">
            <strong>Explore</strong>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#coverage">Coverage</a>
            <a href="#resources">Resources</a>
          </div>

          <div className="footer-col">
            <strong>Actions</strong>
            <a
              href="https://swe.pperfect.com/"
              target="_blank"
              rel="noreferrer"
            >
              Track shipment
            </a>
            <a href="#quote">Get a quote</a>
            <a href="mailto:info@swe.co.za">Email us</a>
          </div>

          <div className="footer-col">
            <strong>South Africa</strong>
            <span>Johannesburg</span>
            <span>Durban</span>
            <span>Cape Town</span>
            <span>Nelspruit</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
