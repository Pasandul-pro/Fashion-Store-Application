import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    const { data, error } = await signUp(email, password);
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setMessage('Registration successful! Confirmaion emails are disabled in local mocks, proceeding to login...');
      setLoading(false);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="auth-page">
      <div className="container flex-center">
        <motion.div 
          className="auth-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>CREATE ACCOUNT</h2>
          <p className="auth-subtitle">Join Atelier Noir for an exclusive experience.</p>
          
          {error && <div className="auth-error">{error}</div>}
          {message && <div className="auth-success">{message}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'CREATING ACCOUNT...' : 'REGISTER'}
            </button>
          </form>
          
          <div className="auth-links">
            <p>Already have an account? <Link to="/login">Sign in here</Link></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
