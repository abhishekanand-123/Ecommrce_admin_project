import "./Services.css";

export default function Services() {
  return (
    <div className="services-page">
      {/* SERVICES BANNER */}
      <section
        className="services-banner"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <div className="services-banner-content">
          <h1>Our Services</h1>
          <p>Professional restoration services you can trust</p>
        </div>
      </section>

      {/* SERVICES CARDS SECTION */}
      <section className="services-section">
        <div className="services-container">

          {/* Service Card: Water Damage */}
          <div className="service-card">
            <img src="https://img.icons8.com/fluency/96/water.png" alt="Water Damage" />
            <h3>Water Damage Restoration</h3>
            <p>Fast and reliable water damage cleanup and repair services for your home or business.</p>
          </div>

          {/* Service Card: Mold Remediation */}
          <div className="service-card">
            <img
              src="https://www.pngkey.com/png/detail/233-2337602_mold-remediation-anti-mould-icon.png"
              alt="Mold Removal"
            />
            <h3>Mold Remediation</h3>
            <p>Safe and thorough mold removal services to keep your family and property healthy.</p>
          </div>

          {/* Service Card: Fire Damage */}
          <div className="service-card">
            <img src="https://img.icons8.com/fluency/96/fire-element.png" alt="Fire Damage" />
            <h3>Fire & Smoke Restoration</h3>
            <p>Expert fire and smoke damage restoration to bring your property back to life.</p>
          </div>

          {/* Service Card: Storm Damage */}
          <div className="service-card">
            <img src="https://img.icons8.com/fluency/96/storm.png" alt="Storm Damage" />
            <h3>Storm Damage Repair</h3>
            <p>Professional repair services for storm-damaged homes and commercial buildings.</p>
          </div>

        </div>
      </section>
    </div>
  );
}
