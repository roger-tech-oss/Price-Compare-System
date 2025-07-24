// src/components/Footer.jsx
import "../styles/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Aivora. All rights reserved.</p>
      <div>
        <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> |{" "}
        <Link to="/privacy">Privacy Policy</Link>
      </div>
    </footer>
  );
}
