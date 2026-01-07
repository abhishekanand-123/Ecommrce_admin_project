import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login_user = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Check if there's a pending cart product
  const pendingProduct = localStorage.getItem('pendingCartProduct');
  const pendingProductData = pendingProduct ? JSON.parse(pendingProduct) : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('user_id', data.user.id);
        
        // Dispatch event to update Header
        window.dispatchEvent(new Event('userLogin'));
        
        // Check if there's a pending product to add to cart
        const pendingProduct = localStorage.getItem('pendingCartProduct');
        if (pendingProduct) {
          const productData = JSON.parse(pendingProduct);
          
          // Add product to cart automatically
          const cartRes = await fetch('http://localhost:5000/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: data.user.id,
              product_id: productData.product_id,
              qty: 1
            })
          });
          
          const cartData = await cartRes.json();
          localStorage.removeItem('pendingCartProduct');
          alert(`Login successful! "${productData.product_title}" added to cart!`);
          navigate('/cart');
        } else {
          alert('Login successful!');
          navigate('/');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <i className="mdi mdi-layers-triple"></i>
          <span>Purple</span>
        </div>
        
        <h4 className="auth-title">Hello! let's get started</h4>
        <h6 className="auth-subtitle">
          Sign in to continue.
        </h6>

        <form onSubmit={handleSubmit}>
          {pendingProductData && (
            <div className="auth-notice">
              🛒 Login to add "<strong>{pendingProductData.product_title}</strong>" to your cart
            </div>
          )}
          {error && <div className="auth-error">{error}</div>}
          
          <div className="auth-form-group">
            <input
              type="email"
              name="email"
              className="auth-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-form-group">
            <input
              type="password"
              name="password"
              className="auth-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>

          <div className="auth-links">
            <div className="auth-remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me signed in</label>
            </div>
            <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>
          </div>

          <div className="auth-footer">
            Don't have an account? <Link to="/register" className="text-primary">Create</Link>
          </div>
        </form>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f2edf3;
          padding: 20px;
        }
        .auth-card {
          background: #fff;
          border-radius: 4px;
          padding: 40px 50px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 0 20px rgba(0,0,0,0.05);
        }
        .auth-brand {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
        }
        .auth-brand i {
          font-size: 40px;
          color: #9a55ff;
          margin-right: 10px;
        }
        .auth-brand span {
          font-size: 28px;
          font-weight: 700;
          color: #9a55ff;
        }
        .auth-title {
          font-size: 24px;
          font-weight: 500;
          color: #1f1f1f;
          margin-bottom: 10px;
        }
        .auth-subtitle {
          font-size: 14px;
          color: #8e94a9;
          margin-bottom: 30px;
          font-weight: 400;
        }
        .auth-form-group {
          margin-bottom: 20px;
        }
        .auth-input {
          width: 100%;
          padding: 15px 20px;
          border: 1px solid #e8ecf1;
          border-radius: 4px;
          font-size: 14px;
          color: #1f1f1f;
          background: #fff;
          transition: border-color 0.3s;
        }
        .auth-input:focus {
          outline: none;
          border-color: #9a55ff;
        }
        .auth-input::placeholder {
          color: #c9c8c8;
        }
        .auth-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(to right, #da8cff, #9a55ff);
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1px;
          cursor: pointer;
          margin-top: 10px;
          transition: opacity 0.3s;
        }
        .auth-btn:hover {
          opacity: 0.9;
        }
        .auth-links {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }
        .auth-remember {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .auth-remember input[type="checkbox"] {
          width: 16px;
          height: 16px;
          cursor: pointer;
          accent-color: #9a55ff;
        }
        .auth-remember label {
          font-size: 14px;
          color: #8e94a9;
          cursor: pointer;
        }
        .auth-forgot {
          font-size: 14px;
          color: #9a55ff;
          text-decoration: none;
        }
        .auth-forgot:hover {
          text-decoration: underline;
        }
        .auth-footer {
          text-align: center;
          margin-top: 25px;
          font-size: 14px;
          color: #8e94a9;
        }
        .auth-footer a {
          color: #9a55ff;
          text-decoration: none;
          font-weight: 500;
        }
        .text-primary {
          color: #9a55ff !important;
        }
        .auth-error {
          background: #ffe0e0;
          color: #d32f2f;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
          font-size: 14px;
          text-align: center;
        }
        .auth-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .auth-notice {
          background: #e8f5e9;
          color: #2e7d32;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
          font-size: 14px;
          text-align: center;
          border: 1px solid #a5d6a7;
        }
      `}</style>
    </div>
  );
};

export default Login_user;
