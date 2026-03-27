import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { insforge } from '../lib/insforge';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      const { data, error } = await insforge.database
        .from('orders')
        .select(`
          *,
          order_items (
            quantity,
            size,
            price_at_purchase,
            products (
              name,
              image_url
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h2>MY ACCOUNT</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleSignOut} className="btn btn-outline" style={{ marginTop: '20px' }}>
            SIGN OUT
          </button>
        </div>

        <div className="order-history">
          <h3>ORDER HISTORY</h3>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>You haven't placed any orders yet.</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={order.id} 
                  className="order-card"
                >
                  <div className="order-header">
                    <span>Order #{order.id.slice(0, 8)}</span>
                    <span className="order-date">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                    <span className={`order-status status-${order.status}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="order-items">
                    {order.order_items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <img 
                          src={item.products?.image_url || 'https://via.placeholder.com/60x80'} 
                          alt={item.products?.name} 
                        />
                        <div className="item-details">
                          <h4>{item.products?.name}</h4>
                          <p>Size: {item.size} | Qty: {item.quantity}</p>
                          <p className="item-price">${item.price_at_purchase}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-total">
                    <span>Total</span>
                    <span>${order.total_amount}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
