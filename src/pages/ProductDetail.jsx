import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize, quantity });
    // Visual feedback could be added here
  };

  return (
    <div className="product-detail-page">
      <div className="container detail-container">
        {/* Breadcrumbs */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')}>Home</span> <ChevronRight size={12} />
          <span onClick={() => navigate(`/${product.category}`)}>{product.category}</span> <ChevronRight size={12} />
          <span className="active">{product.name}</span>
        </div>

        <div className="detail-layout">
          {/* Image Gallery */}
          <div className="image-gallery">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="main-image-wrapper"
            >
              <img src={product.image} alt={product.name} />
            </motion.div>
            <div className="thumbnail-list">
              {[1,2,3].map(i => (
                <div key={i} className="thumbnail-item">
                  <img src={product.image} alt="thumbnail" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-panel">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="brand-label">ATELIER NOIR</span>
              <h1 className="detail-title">{product.name}</h1>
              <p className="detail-price">${product.price}</p>
              
              <div className="detail-section">
                <div className="section-label">SIZE</div>
                <div className="size-selector">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <div className="section-label">QUANTITY</div>
                <div className="quantity-selector">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><ChevronLeft size={16} /></button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}><ChevronRight size={16} /></button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  <ShoppingBag size={20} /> ADD TO CART
                </button>
                <button className="wishlist-btn"><Heart size={20} /></button>
              </div>

              <div className="extra-info">
                <div className="tabs">
                  <button className={activeTab === 'details' ? 'active' : ''} onClick={() => setActiveTab('details')}>DETAILS</button>
                  <button className={activeTab === 'shipping' ? 'active' : ''} onClick={() => setActiveTab('shipping')}>SHIPPING</button>
                </div>
                <div className="tab-content">
                  <AnimatePresence mode="wait">
                    {activeTab === 'details' ? (
                      <motion.p 
                        key="details"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {product.description}
                      </motion.p>
                    ) : (
                      <motion.p 
                        key="shipping"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Free standard shipping on all orders over $200. Returns accepted within 30 days of purchase.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .product-detail-page {
          padding-top: calc(var(--header-height) + 40px);
          padding-bottom: 120px;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          margin-bottom: 40px;
          text-transform: uppercase;
        }

        .breadcrumb span {
          cursor: pointer;
        }

        .breadcrumb .active {
          color: var(--text-primary);
          font-weight: 700;
        }

        .detail-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 80px;
        }

        .main-image-wrapper {
          width: 100%;
          aspect-ratio: 4 / 5;
          background: #f5f5f5;
          margin-bottom: 20px;
          overflow: hidden;
        }

        .main-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumbnail-list {
          display: flex;
          gap: 20px;
        }

        .thumbnail-item {
          width: 100px;
          aspect-ratio: 4 / 5;
          background: #f5f5f5;
          cursor: pointer;
          opacity: 0.6;
          transition: 0.3s;
        }

        .thumbnail-item:hover {
          opacity: 1;
        }

        .brand-label {
          font-size: 11px;
          letter-spacing: 0.3em;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 10px;
        }

        .detail-title {
          font-size: 42px;
          margin-bottom: 15px;
        }

        .detail-price {
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 40px;
        }

        .detail-section {
          margin-bottom: 40px;
        }

        .section-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 15px;
        }

        .size-selector {
          display: flex;
          gap: 12px;
        }

        .size-btn {
          width: 50px;
          height: 50px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
        }

        .size-btn:hover {
          border-color: #000;
        }

        .size-btn.active {
          background: #000;
          color: #fff;
          border-color: #000;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 20px;
          border: 1px solid var(--border);
          width: fit-content;
          padding: 10px 20px;
        }

        .action-buttons {
          display: flex;
          gap: 20px;
          margin-bottom: 60px;
        }

        .add-to-cart-btn {
          flex: 1;
          background: #000;
          color: #fff;
          padding: 20px;
          font-weight: 700;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .wishlist-btn {
          width: 60px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .extra-info .tabs {
          display: flex;
          gap: 30px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 20px;
        }

        .tabs button {
          padding: 15px 0;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text-secondary);
          position: relative;
        }

        .tabs button.active {
          color: #000;
        }

        .tabs button.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #000;
        }

        .tab-content {
          font-size: 14px;
          color: var(--text-secondary);
          min-height: 80px;
        }

        @media (max-width: 1024px) {
          .detail-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
