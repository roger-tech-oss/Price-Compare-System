// src/pages/Home.jsx
import React from 'react';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to Aivora</h1>
        <p>Save money and time by comparing product prices across multiple e-commerce sites in real-time.</p>
        <button className="cta-button">Start Comparing</button>
      </section>

      <section className="features-section">
        <h2>Why Choose Aivora?</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Real-Time Price Tracking</h3>
            <p>We fetch latest prices directly from Amazon, Flipkart, and Croma in real-time.</p>
          </div>
          <div className="feature-card">
            <h3>Multiple Platforms</h3>
            <p>Compare products across major Indian retailers instantly.</p>
          </div>
          <div className="feature-card">
            <h3>Save Big</h3>
            <p>Never overpay again—get the lowest price at your fingertips.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>"Aivora helped me save ₹3,000 on my laptop! Super easy to use."</p>
            <strong>- Priya R.</strong>
          </div>
          <div className="testimonial">
            <p>"I no longer have to check three websites before buying anything. Amazing work!"</p>
            <strong>- Arjun M.</strong>
          </div>
          <div className="testimonial">
            <p>"Clean interface, fast comparison, and accurate prices. Highly recommend."</p>
            <strong>- Neha S.</strong>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h4>1. Add Products</h4>
            <p>Admins upload products with links to Amazon, Flipkart, and Croma.</p>
          </div>
          <div className="step">
            <h4>2. Compare Prices</h4>
            <p>Aivora fetches real-time prices across platforms.</p>
          </div>
          <div className="step">
            <h4>3. Buy Smart</h4>
            <p>Users compare and choose the cheapest option instantly.</p>
          </div>
        </div>
      </section>

      <section className="trusted-by">
        <h2>Trusted by Hundreds of Users</h2>
        <p>Join a growing community of smart shoppers across India.</p>
        <div className="stats">
          <div className="stat">
            <h3>10K+</h3>
            <p>Products Compared</p>
          </div>
          <div className="stat">
            <h3>500+</h3>
            <p>Happy Users</p>
          </div>
          <div className="stat">
            <h3>₹2 Lakh+</h3>
            <p>Saved</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start Saving?</h2>
        <p>Compare prices across top platforms with just one click.</p>
        <button className="cta-button">Compare Now</button>
      </section>
    </div>
  );
}
