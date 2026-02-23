// Footer.js
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/css/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo + Description */}
        <div className="footer-section">
          <div className="logo">
            <span className="logo-icon">✯</span>
            <h2 className="logo-text">Welowe</h2>
          </div>
          <p className="footer-description">
            Wimply dummy text of the priatype industry orem Ipsum has Maecenas quis eros at ante.
          </p>
          <button className="donation-button">
            <span>✚</span> Make Donation
          </button>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-title">Get In Touch!</h3>
          <ul className="footer-list">
            <li><FaMapMarkerAlt className="icon" />901 N Pitt Str., Suite 170, Alexandria, USA</li>
            <li><FaPhoneAlt className="icon" />(406) 555-0120</li>
            <li><FaEnvelope className="icon" />contact@example.com</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3 className="footer-title">Newsletter</h3>
          <p className="footer-description">Subscribe to our newsletter to get our daily latest news and updates</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Email address" className="newsletter-input" />
            <button type="submit" className="newsletter-button"><FaPaperPlane /></button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Copyrights by Gaviasthemes. All Rights Reserved</p>
        <div className="social-icons">
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
