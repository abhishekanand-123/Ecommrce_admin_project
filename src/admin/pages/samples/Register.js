import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    country: '',
    password: '',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Check if admin already exists
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/check');
        const data = await response.json();
        
        if (data.adminExists) {
          alert('Admin already registered. Redirecting to login...');
          navigate('/admin/login');
        }
      } catch (err) {
        console.error('Error checking admin:', err);
      } finally {
        setChecking(false);
      }
    };
    
    checkAdmin();
  }, [navigate]);

  // Show loading while checking
  if (checking) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f2edf3' }}>
        <h3>Checking...</h3>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      setError('Please agree to Terms & Conditions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          country: formData.country,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Admin registration successful! Please login.');
        navigate('/admin/login');
      } else {
        setError(data.message || 'Registration failed');
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
        
        <h4 className="auth-title">New here?</h4>
        <h6 className="auth-subtitle">
          <span className="text-primary">Signing up</span> is easy. 
          <span className="text-success"> It only takes a few steps</span>
        </h6>

        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          
          <div className="auth-form-group">
            <input
              type="text"
              name="username"
              className="auth-input"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

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
            <select
              name="country"
              className="auth-input auth-select"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="IN">India</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
            </select>
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

          <div className="auth-form-group auth-checkbox">
            <input
              type="checkbox"
              name="agreeTerms"
              id="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeTerms">
              I agree to all <a href="#" className="text-primary">Terms & Conditions</a>
            </label>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'SIGNING UP...' : 'SIGN UP'}
          </button>

          <div className="auth-footer">
            Already have an account? <Link to="/admin/login" className="text-primary">Login</Link>
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
        .auth-subtitle .text-primary {
          color: #9a55ff;
        }
        .auth-subtitle .text-success {
          color: #1bcfb4;
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
        .auth-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238e94a9' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 15px center;
          padding-right: 40px;
        }
        .auth-checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .auth-checkbox input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #9a55ff;
        }
        .auth-checkbox label {
          font-size: 14px;
          color: #8e94a9;
          cursor: pointer;
        }
        .auth-checkbox label a {
          color: #9a55ff;
          text-decoration: none;
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
      `}</style>
    </div>
  );
};

export default Register;
