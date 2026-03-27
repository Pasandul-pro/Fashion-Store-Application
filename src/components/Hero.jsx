import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle"
          >
            NEW COLLECTION 2026
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-title"
          >
            The Art of <br /> <span>Minimalism</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hero-description"
          >
            Elevated essentials for the modern wardrobe. <br /> Designed for longevity and refined taste.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="hero-actions"
          >
            <Link to="/women" className="btn btn-primary">SHOP WOMEN</Link>
            <Link to="/men" className="btn btn-outline">SHOP MEN</Link>
          </motion.div>
        </div>

        <div className="hero-image-container">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="hero-image"
            style={{ backgroundImage: "url('/assets/hero.png')" }}
          />
          <div className="hero-scroll-indicator">
            <div className="mouse"></div>
            <span>SCROLL</span>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .hero {
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: #fff;
        }

        .hero-container {
          display: flex;
          align-items: center;
          height: 100%;
          width: 100%;
        }

        .hero-content {
          flex: 1;
          padding-right: 5%;
          z-index: 10;
        }

        .hero-subtitle {
          font-size: 14px;
          letter-spacing: 0.3em;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 20px;
        }

        .hero-title {
          font-size: clamp(60px, 8vw, 100px);
          line-height: 0.9;
          margin-bottom: 30px;
        }

        .hero-title span {
          font-style: italic;
          font-weight: 300;
        }

        .hero-description {
          font-size: 18px;
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 450px;
        }

        .hero-actions {
          display: flex;
          gap: 20px;
        }

        .btn {
          padding: 16px 40px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          transition: var(--transition-smooth);
        }

        .btn-primary {
          background: var(--text-primary);
          color: #fff;
        }

        .btn-primary:hover {
          background: #333;
          transform: translateY(-2px);
        }

        .btn-outline {
          border: 1px solid var(--text-primary);
          color: var(--text-primary);
        }

        .btn-outline:hover {
          background: var(--text-primary);
          color: #fff;
          transform: translateY(-2px);
        }

        .hero-image-container {
          flex: 1.2;
          height: 100%;
          position: relative;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 40px;
          right: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .hero-scroll-indicator span {
          font-size: 10px;
          letter-spacing: 0.3em;
          writing-mode: vertical-rl;
          color: var(--text-secondary);
        }

        .mouse {
          width: 20px;
          height: 35px;
          border: 1px solid #ccc;
          border-radius: 20px;
          position: relative;
        }

        .mouse::after {
          content: '';
          width: 2px;
          height: 6px;
          background: var(--text-primary);
          position: absolute;
          left: 50%;
          top: 6px;
          transform: translateX(-50%);
          border-radius: 2px;
          animation: mouseScroll 1.5s infinite;
        }

        @keyframes mouseScroll {
          0% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, 15px); }
        }

        @media (max-width: 1024px) {
          .hero {
            flex-direction: column-reverse;
          }
          .hero-content {
            padding: 60px 40px;
            flex: none;
            width: 100%;
          }
          .hero-image-container {
            width: 100%;
            height: 50vh;
            flex: none;
          }
          .hero-title {
            font-size: 50px;
          }
          .hero-scroll-indicator {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
