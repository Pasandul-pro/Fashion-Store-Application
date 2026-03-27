import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container empty-cart-container flex-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="empty-cart-content"
          >
            <h2>YOUR CART IS EMPTY</h2>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/" className="btn btn-primary">START SHOPPING</Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">SHOPPING CART</h1>
        
        <div className="cart-layout">
          <div className="cart-items">
            <div className="cart-header">
              <span>PRODUCT</span>
              <span>QUANTITY</span>
              <span>TOTAL</span>
            </div>

            <AnimatePresence>
              {cart.map(item => (
                <motion.div 
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="cart-item"
                >
                  <div className="item-product">
                    <div className="item-img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-variant">Size: {item.size}</p>
                      <p className="item-price">${item.price}</p>
                    </div>
                  </div>

                  <div className="item-quantity">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}><Minus size={14} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}><Plus size={14} /></button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id, item.size)}><Trash2 size={16} /></button>
                  </div>

                  <div className="item-total">
                    ${item.price * item.quantity}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="cart-summary">
            <h3>ORDER SUMMARY</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>$0 (FREE)</span>
            </div>
            <div className="summary-row total">
              <span>Estimated Total</span>
              <span>${cartTotal}</span>
            </div>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              CHECKOUT <ArrowRight size={18} />
            </button>
            <p className="summary-note">Tax included and shipping calculated at checkout</p>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 80px;
          align-items: start;
        }

        .cart-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--text-secondary);
        }

        .cart-item {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          padding: 40px 0;
          border-bottom: 1px solid var(--border);
          align-items: center;
        }

        .item-product {
          display: flex;
          gap: 24px;
        }

        .item-img {
          width: 100px;
          aspect-ratio: 3 / 4;
          background: #f5f5f5;
          overflow: hidden;
        }

        .item-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-details h3 {
          font-size: 18px;
          margin-bottom: 8px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
        }

        .item-variant {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .item-price {
          font-size: 14px;
          font-weight: 500;
        }

        .item-quantity {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 15px;
          border: 1px solid var(--border);
          width: fit-content;
          padding: 8px 15px;
        }

        .remove-btn {
          color: var(--text-secondary);
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-left: 2px;
          width: fit-content;
        }

        .remove-btn:hover {
          color: #ff0000;
        }

        .item-total {
          font-size: 18px;
          font-weight: 600;
          text-align: right;
        }

        .cart-summary {
          background: var(--bg-secondary);
          padding: 40px;
          border-radius: 4px;
        }

        .cart-summary h3 {
          font-size: 20px;
          margin-bottom: 30px;
          letter-spacing: 0.05em;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .summary-row.total {
          border-top: 1px solid var(--border);
          padding-top: 20px;
          margin-top: 20px;
          font-weight: 700;
          font-size: 18px;
        }

        .checkout-btn {
          width: 100%;
          background: #000;
          color: #fff;
          padding: 20px;
          margin: 30px 0 20px;
          font-weight: 700;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .summary-note {
          font-size: 12px;
          color: var(--text-secondary);
          text-align: center;
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .cart-layout {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .cart-summary {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .cart-header {
            display: none;
          }
          .cart-item {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .item-total {
            text-align: left;
            border-top: 1px dashed var(--border);
            padding-top: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
