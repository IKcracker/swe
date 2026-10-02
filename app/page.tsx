const services = [
  ["01","Overnight Express","Reliable overnight delivery to major centres and regional destinations.","Next day"],
  ["02","Same Day Express","Priority door-to-door delivery for urgent shipments between major destinations.","Urgent"],
  ["03","Road Freight","A secure, cost-effective option for larger and less time-sensitive shipments.","Nationwide"],
  ["04","International Courier","Time-sensitive documents and parcels delivered internationally.","Worldwide"],
  ["05","Air Freight","Flexible international airfreight for larger shipments.","Global"],
  ["06","Cross-Border Freight","Road freight into neighbouring Southern African countries.","SADC"],
];

function Arrow(){return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>}

export default function Home() {
  return (
    <main>
      <div className="site-shell">
        <header className="site-header">
          <a className="brand" href="#"><span className="brand-mark"><span>S</span><span>W</span><span>E</span></span><span className="brand-copy"><strong>Specialised</strong><small>Worldwide Express</small></span></a>
          <nav className="desktop-nav"><a href="#about">About</a><a href="#services">Services</a><a href="#network">Network</a><a href="#resources">Resources</a></nav>
          <div className="header-actions"><a className="text-link" href="https://swe.pperfect.com/" target="_blank" rel="noreferrer">Track parcel</a><a className="button button-small" href="#quote">Get a quote<Arrow/></a></div>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span/>South African courier & freight</div>
            <h1>Logistics that<span>keeps moving.</span></h1>
            <p className="hero-intro">Reliable domestic and international courier, freight and express delivery solutions built around the way your business moves.</p>
            <div className="hero-actions"><a className="button" href="#quote">Request a quote<Arrow/></a><a className="button button-ghost" href="#services">Explore services</a></div>
            <div className="hero-trust"><div><strong>Domestic</strong><span>Express & road freight</span></div><div><strong>International</strong><span>Courier & air freight</span></div><div><strong>Cross-border</strong><span>Southern Africa network</span></div></div>
          </div>
          <div className="hero-visual" role="img" aria-label="Freight truck travelling at sunset">
            <div className="route-card"><div className="route-card-top"><span className="status-dot"/>Shipment network<span>LIVE</span></div><div className="route-line"><span>JHB</span><i/><span>DUR</span><i/><span>CPT</span></div><p>Moving your shipment from collection to final delivery.</p></div>
          </div>
          <form className="tracking-card" action="https://swe.pperfect.com/" method="get" target="_blank">
            <div className="tracking-label"><div><span>Track & trace</span><strong>Where is my parcel?</strong></div></div>
            <label className="tracking-input"><span className="sr-only">Waybill number</span><input name="waybill" placeholder="Enter your waybill number"/></label>
            <button type="submit">Track shipment<Arrow/></button>
          </form>
        </section>
      </div>

      <section className="intro-section" id="about"><div className="section-wrap intro-grid"><div><div className="section-kicker">Built for dependable delivery</div><h2>One logistics partner. Multiple ways to move.</h2></div><div className="intro-copy"><p>From urgent same-day documents to larger road freight and international shipments, SWE connects businesses to a broad domestic and cross-border delivery network.</p><a href="#services">View all services<Arrow/></a></div></div></section>

      <section className="services-section" id="services"><div className="section-wrap"><div className="section-heading"><div><div className="section-kicker">Our services</div><h2>Choose the right speed for every shipment.</h2></div><p>Courier, freight and express options for routine deliveries, urgent consignments and international movement.</p></div><div className="service-grid">{services.map(([code,title,description,tag])=><article className="service-card" key={title}><div className="service-card-top"><span className="service-code">{code}</span><span className="service-tag">{tag}</span></div><h3>{title}</h3><p>{description}</p><a href="#quote">Get a quote<Arrow/></a></article>)}</div></div></section>

      <section className="network-section" id="network"><div className="section-wrap network-grid"><div className="network-copy"><div className="section-kicker section-kicker-light">Our network</div><h2>From South Africa to the world.</h2><p>Major-centre coverage, regional delivery options and international connections help keep shipments moving beyond the obvious routes.</p><div className="network-list">{["Johannesburg","Durban","Cape Town","Nelspruit","Regional network","International partners"].map((item)=><div key={item}><span/>{item}</div>)}</div></div><div className="network-map"><div className="map-orbit map-orbit-one"/><div className="map-orbit map-orbit-two"/><span className="map-node map-node-one">JHB</span><span className="map-node map-node-two">DUR</span><span className="map-node map-node-three">CPT</span><span className="map-node map-node-four">INTL</span><div className="map-caption"><strong>Connected coverage</strong><span>Domestic • regional • international</span></div></div></div></section>

      <section className="resources-section" id="resources"><div className="section-wrap resource-grid">
        <article className="resource-feature"><span>01</span><div><p className="resource-label">Shipment tools</p><h3>Track and trace</h3><p>Check your shipment status using SWE&apos;s existing online tracking service.</p><a href="https://swe.pperfect.com/" target="_blank" rel="noreferrer">Track a parcel<Arrow/></a></div></article>
        <article className="resource-feature"><span>02</span><div><p className="resource-label">Shipping information</p><h3>Documents & resources</h3><p>Waybills, account forms, shipping guidance and useful customer information in one place.</p><a href="#quote">View resources<Arrow/></a></div></article>
        <article className="resource-feature"><span>03</span><div><p className="resource-label">Need assistance?</p><h3>Talk to our team</h3><p>Get help choosing a service, arranging a shipment or understanding delivery requirements.</p><a href="#quote">Contact SWE<Arrow/></a></div></article>
      </div></section>

      <section className="quote-section" id="quote"><div className="section-wrap quote-panel"><div><div className="section-kicker section-kicker-light">Ready to move?</div><h2>Tell us what you need to send.</h2><p>We&apos;ll help you choose the right service for your route, urgency and shipment size.</p></div><a className="button button-light" href="mailto:info@swe.co.za?subject=SWE%20Quote%20Request">Request a quote<Arrow/></a></div></section>

      <footer className="site-footer"><div className="section-wrap footer-grid"><div><a className="brand brand-footer" href="#"><span className="brand-mark"><span>S</span><span>W</span><span>E</span></span><span className="brand-copy"><strong>Specialised</strong><small>Worldwide Express</small></span></a><p>Courier, freight and express delivery solutions across South Africa and beyond.</p></div><div className="footer-links"><strong>Explore</strong><a href="#about">About SWE</a><a href="#services">Services</a><a href="#network">Network</a><a href="#resources">Resources</a></div><div className="footer-links"><strong>Quick links</strong><a href="https://swe.pperfect.com/" target="_blank" rel="noreferrer">Track parcel</a><a href="#quote">Get a quote</a><a href="mailto:info@swe.co.za">Contact</a></div><div className="footer-links"><strong>Key centres</strong><span>Johannesburg</span><span>Durban</span><span>Cape Town</span><span>Nelspruit</span></div></div></footer>
    </main>
  );
}
