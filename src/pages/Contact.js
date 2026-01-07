import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">

      {/* CONTACT BANNER */}
      <section
        className="contact-banner"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <div className="contact-banner-content">
          <h1>Contact Us</h1>
          <p>We are available 24/7 for emergency services</p>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="contact-section">
        <h2>Get In Touch</h2>
        <p className="contact-subtitle">
          Fill out the form below and our team will reach out to you.
        </p>

        <form className="contact-form">

          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" placeholder="Enter your phone number" required />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="Type your message" rows="4"></textarea>
          </div>

          <button type="submit" className="contact-btn">Submit</button>

        </form>
      </section>

    </div>
  );
}