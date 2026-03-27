import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="product-card"
    >
      <Link to={`/product/${product.id}`} className="product-image-link">
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.name} />
          <div className="product-overlay">
            <button 
              className="quick-add-btn" 
              onClick={(e) => {
                e.preventDefault();
                addToCart({ ...product, quantity: 1, size: product.sizes[0] });
              }}
            >
              <ShoppingBag size={18} /> QUICK ADD
            </button>
          </div>
        </div>
      </Link>
      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{product.category.toUpperCase()}</span>
          <span className="product-price">${product.price}</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
      </div>

      <style jsx="true">{`
        .product-card {
          width: 100%;
          position: relative;
        }

        .product-image-wrapper {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #f5f5f5;
        }

        .product-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .product-card:hover .product-image-wrapper img {
          transform: scale(1.05);
        }

        .product-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(to top, rgba(255,255,255,0.8), transparent);
          transform: translateY(100%);
          transition: transform 0.4s ease;
        }

        .product-card:hover .product-overlay {
          transform: translateY(0);
        }

        .quick-add-btn {
          background: #fff;
          color: #000;
          padding: 12px 24px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #eee;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .quick-add-btn:hover {
          background: #000;
          color: #fff;
        }

        .product-info {
          padding-top: 20px;
        }

        .product-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
        }

        .product-name {
          font-size: 18px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .product-price {
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          color: var(--text-primary);
        }
      `}</style>
    </motion.div>
  );
};

export default ProductCard;
