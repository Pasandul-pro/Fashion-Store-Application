import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`navbar ${isScrolled || !isHomePage ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="nav-left">
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <ul className="nav-links desktop-only">
            <li><Link to="/women">WOMEN</Link></li>
            <li><Link to="/men">MEN</Link></li>
            <li><Link to="/">COLLECTIONS</Link></li>
          </ul>
        </div>

        <div className="nav-center">
          <Link to="/" className="logo">ATELIER NOIR</Link>
        </div>

        <div className="nav-right">
          <button className="nav-icon-btn"><Search size={20} /></button>
          <Link to={user ? "/profile" : "/login"} className="nav-icon-btn"><User size={20} /></Link>
          <Link to="/cart" className="nav-icon-btn cart-icon">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><Link to="/women">WOMEN</Link></li>
          <li><Link to="/men">MEN</Link></li>
          <li><Link to="/">COLLECTIONS</Link></li>
          <li><Link to={user ? "/profile" : "/login"}>{user ? "PROFILE" : "LOGIN"}</Link></li>
        </ul>
      </div>

      <style jsx="true">{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--header-height);
          background: transparent;
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: var(--transition-smooth);
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          height: 70px;
          border-bottom: 1px solid var(--border);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .nav-left, .nav-right {
          display: flex;
          align-items: center;
          gap: 24px;
          flex: 1;
        }

        .nav-center {
          flex: 0;
          text-align: center;
        }

        .nav-right {
          justify-content: flex-end;
        }

        .logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 0.2em;
          white-space: nowrap;
        }

        .nav-links {
          display: flex;
          gap: 32px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
        }

        .nav-links li a:hover {
          color: var(--text-secondary);
        }

        .nav-icon-btn {
          position: relative;
          color: var(--text-primary);
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--text-primary);
          color: white;
          font-size: 10px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .mobile-menu-btn {
          display: none;
        }

        .mobile-only {
          display: none;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: -100%;
          width: 80%;
          height: 100vh;
          background: white;
          z-index: 999;
          transition: 0.4s ease;
          padding: 100px 40px;
          box-shadow: 20px 0 50px rgba(0,0,0,0.05);
        }

        .mobile-menu.open {
          left: 0;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 30px;
          font-size: 24px;
          font-family: 'Cormorant Garamond', serif;
        }

        @media (max-width: 1024px) {
          .desktop-only {
            display: none;
          }
          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
