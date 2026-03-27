import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { insforge } from '../lib/insforge';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await insforge.database.from('products').select('*').limit(4);
      if (data) setFeaturedProducts(data);
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home-page">
      <Hero />

      {/* Featured Collection Section */}
      <section className="section container">
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-subtitle">CURATED SELECTION</span>
            <h2 className="section-title">New Arrivals</h2>
          </motion.div>
          <Link to="/women" className="view-all">VIEW ALL PRODUCTS</Link>
        </div>
        
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Highlights */}
      <section className="category-banners">
        <div className="category-banner-item">
          <div className="banner-image" style={{ backgroundImage: "url('/assets/women.png')" }}></div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="banner-content"
          >
            <h3>WOMEN'S <br /> COLLECTION</h3>
            <Link to="/women" className="btn btn-outline-white">DISCOVER</Link>
          </motion.div>
        </div>
        <div className="category-banner-item">
          <div className="banner-image" style={{ backgroundImage: "url('/assets/men.png')" }}></div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="banner-content"
          >
            <h3>MEN'S <br /> COLLECTION</h3>
            <Link to="/men" className="btn btn-outline-white">DISCOVER</Link>
          </motion.div>
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="section container ethos-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="ethos-content"
        >
          <h2 className="ethos-text">
            "Design is a way of life, a point of view. It involves the whole complex of visual, 
            intellectual, and emotional experiences."
          </h2>
          <span className="ethos-author">— Massimo Vignelli</span>
        </motion.div>
      </section>

      <style jsx="true">{`
        .section {
          padding: 120px 0;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 60px;
        }

        .section-subtitle {
          font-size: 12px;
          letter-spacing: 0.2em;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 10px;
        }

        .section-title {
          font-size: 48px;
        }

        .view-all {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          border-bottom: 1px solid var(--text-primary);
          padding-bottom: 4px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          justify-content: center;
        }

        .category-banners {
          display: flex;
          height: 80vh;
        }

        .category-banner-item {
          flex: 1;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .banner-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .category-banner-item:hover .banner-image {
          transform: scale(1.05);
        }

        .banner-content {
          z-index: 10;
          text-align: center;
          color: #fff;
        }

        .banner-content h3 {
          font-size: 50px;
          margin-bottom: 30px;
          line-height: 1;
        }

        .btn-outline-white {
          border: 1px solid #fff;
          color: #fff;
          padding: 14px 40px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
        }

        .btn-outline-white:hover {
          background: #fff;
          color: #000;
        }

        .ethos-section {
          text-align: center;
          background: var(--bg-secondary);
        }

        .ethos-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .ethos-text {
          font-style: italic;
          font-size: 36px;
          line-height: 1.4;
          margin-bottom: 30px;
        }

        .ethos-author {
          font-size: 14px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .category-banners {
            flex-direction: column;
            height: auto;
          }
          .category-banner-item {
            height: 60vh;
          }
          .section-title {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
