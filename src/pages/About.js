import "./About.css";

export default function About() {
  return (
    <div className="about-page">

      {/* FULL WIDTH BANNER */}
      <section
        className="about-banner"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <div className="about-banner-content">
          <h1>About Us</h1>
          <p>Your Trusted Restoration Experts</p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="about-section">
        <div className="about-container">
          <h2>Who We Are</h2>
          <p>
            For over 27 years, Olympia has been the leading provider of restoration
            services, specializing in water, mold, fire, smoke, and storm damage
            recovery. Our team is dedicated to restoring homes and businesses to their
            original condition with unmatched quality and professionalism.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver fast, reliable, and high-quality restoration
            services while ensuring complete customer satisfaction. We work with honesty,
            transparency, and a strong commitment to excellence.
          </p>

          <h2>Why Choose Us?</h2>
          <ul>
            <li>✔ Over 27 years of experience</li>
            <li>✔ Certified restoration specialists</li>
            <li>✔ 24/7 emergency services</li>
            <li>✔ Fast response time</li>
            <li>✔ 100% customer satisfaction</li>
          </ul>
        </div>
      </section>

    </div>
  );
}