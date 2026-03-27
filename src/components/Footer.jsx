import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-section brand-info">
          <h2 className="logo">ATELIER NOIR</h2>
          <p>Curating the finest essential fashion for the modern minimalist. Premium quality, timeless designs.</p>
          <div className="social-links">
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Facebook size={20} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>SHOP</h3>
          <ul>
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/">New Arrivals</Link></li>
            <li><Link to="/">Featured</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>COMPANY</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/sustainability">Sustainability</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>SUPPORT</h3>
          <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/shipping">Shipping & Returns</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h3>NEWSLETTER</h3>
          <p>Subscribe to receive updates and exclusive offers.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Email address" />
            <button className="submit-btn"><Mail size={18} /></button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} ATELIER NOIR. All rights reserved.</p>
        </div>
      </div>

      <style jsx="true">{`
        .footer {
          background: var(--bg-secondary);
          padding: 80px 0 40px;
          margin-top: 100px;
          border-top: 1px solid var(--border);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .footer-section h3 {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
          font-family: 'Inter', sans-serif;
        }

        .footer-section p {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 24px;
        }

        .footer-section ul li {
          margin-bottom: 12px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .footer-section ul li a:hover {
          color: var(--text-primary);
        }

        .brand-info .logo {
          font-size: 24px;
          margin-bottom: 20px;
          letter-spacing: 0.15em;
        }

        .social-links {
          display: flex;
          gap: 20px;
          color: var(--text-primary);
        }

        .newsletter-form {
          display: flex;
          border-bottom: 1px solid var(--text-primary);
          padding-bottom: 8px;
        }

        .newsletter-form input {
          border: none;
          background: transparent;
          flex: 1;
          padding: 8px 0;
          font-family: inherit;
          font-size: 14px;
        }

        .newsletter-form input:focus {
          outline: none;
        }

        .footer-bottom {
          padding-top: 40px;
          border-top: 1px solid var(--border);
          text-align: center;
          font-size: 12px;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
          }
          .brand-info, .newsletter {
            grid-column: span 3;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .brand-info, .newsletter {
            grid-column: span 1;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
