// src/pages/Contact.jsx
import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea rows="4" placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>

      <div className="privacy-section">
        <h3>Privacy Policy</h3>
        <p>
          We respect your privacy. Any information you provide via the contact form will only be used to respond to your inquiry. We do not share your data with third parties.
        </p>
      </div>
    </div>
  );
}
