import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  if (cart.length === 0 && !isFinished) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFinished(true);
    clearCart();
  };

  if (isFinished) {
    return (
      <div className="checkout-finished">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="success-message"
          >
            <CheckCircle2 size={80} color="#000" />
            <h1>THANK YOU FOR YOUR ORDER</h1>
            <p>Your order has been placed successfully. You will receive an email confirmation shortly.</p>
            <button onClick={() => navigate('/')} className="btn btn-primary">BACK TO HOME</button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-layout">
          <div className="checkout-forms">
            <button className="back-link" onClick={() => navigate('/cart')}>
              <ChevronLeft size={16} /> BACK TO CART
            </button>
            
            <form onSubmit={handleSubmit}>
              <section className="form-section">
                <h2>CONTACT INFORMATION</h2>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email Address" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </section>

              <section className="form-section">
                <h2>SHIPPING ADDRESS</h2>
                <div className="form-row">
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="firstName" 
                      placeholder="First Name" 
                      required 
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="lastName" 
                      placeholder="Last Name" 
                      required 
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="address" 
                    placeholder="Address" 
                    required 
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="city" 
                      placeholder="City" 
                      required 
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="zip" 
                      placeholder="ZIP Code" 
                      required 
                      value={formData.zip}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </section>

              <section className="form-section">
                <h2>PAYMENT METHOD</h2>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="cardNumber" 
                    placeholder="Card Number" 
                    required 
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="expiry" 
                      placeholder="MM / YY" 
                      required 
                      value={formData.expiry}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="cvv" 
                      placeholder="CVV" 
                      required 
                      value={formData.cvv}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </section>

              <button type="submit" className="place-order-btn">PLACE ORDER</button>
            </form>
          </div>

          <div className="checkout-sidebar">
            <div className="order-summary-card">
              <h2>YOUR ORDER</h2>
              <div className="summary-items">
                {cart.map(item => (
                  <div key={`${item.id}-${item.size}`} className="summary-item">
                    <div className="summary-item-info">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h4>{item.name}</h4>
                        <p>Size: {item.size} × {item.quantity}</p>
                      </div>
                    </div>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="summary-footer">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="summary-row total">
                  <span>TOTAL</span>
                  <span>${cartTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .checkout-page {
          padding: calc(var(--header-height) + 40px) 0 120px;
        }

        .checkout-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 100px;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 40px;
          color: var(--text-secondary);
        }

        .form-section {
          margin-bottom: 60px;
        }

        .form-section h2 {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 30px;
          font-family: 'Inter', sans-serif;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        input {
          width: 100%;
          padding: 16px;
          border: 1px solid var(--border);
          font-family: inherit;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        input:focus {
          outline: none;
          border-color: #000;
        }

        .place-order-btn {
          width: 100%;
          background: #000;
          color: #fff;
          padding: 24px;
          font-weight: 700;
          letter-spacing: 0.2em;
          font-size: 14px;
          margin-top: 20px;
        }

        .checkout-sidebar {
          position: sticky;
          top: 120px;
        }

        .order-summary-card {
          background: var(--bg-secondary);
          padding: 40px;
        }

        .order-summary-card h2 {
          font-size: 18px;
          margin-bottom: 30px;
          letter-spacing: 0.05em;
        }

        .summary-items {
          margin-bottom: 30px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .summary-item-info {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .summary-item-info img {
          width: 50px;
          aspect-ratio: 3/4;
          object-fit: cover;
        }

        .summary-item-info h4 {
          font-size: 14px;
          margin-bottom: 4px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
        }

        .summary-item-info p {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .summary-footer {
          border-top: 1px solid var(--border);
          padding-top: 25px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .summary-row.total {
          margin-top: 20px;
          font-weight: 800;
          font-size: 18px;
        }

        .checkout-finished {
          height: 90vh;
          display: flex;
          align-items: center;
          text-align: center;
        }

        .success-message {
          max-width: 500px;
          margin: 0 auto;
        }

        .success-message h1 {
          font-size: 32px;
          margin: 30px 0 20px;
        }

        .success-message p {
          color: var(--text-secondary);
          margin-bottom: 40px;
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .checkout-layout {
            grid-template-columns: 1fr;
          }
          .checkout-sidebar {
            position: static;
            order: -1;
            margin-bottom: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
