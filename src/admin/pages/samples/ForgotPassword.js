import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter code & new password
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Request reset code
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Reset code sent! Check console for code: ${data.resetCode}`);
        setStep(2);
      } else {
        setError(data.message || 'Failed to send reset code');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset password with code
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resetCode, newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password reset successful! Please login with your new password.');
        navigate('/admin/login');
      } else {
        setError(data.message || 'Failed to reset password');
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
        
        <h4 className="auth-title">Forgot Password?</h4>
        <h6 className="auth-subtitle">
          {step === 1 
            ? "Enter your email to receive a reset code" 
            : "Enter the code and your new password"}
        </h6>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        {step === 1 ? (
          <form onSubmit={handleRequestCode}>
            <div className="auth-form-group">
              <input
                type="email"
                className="auth-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'SENDING...' : 'SEND RESET CODE'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="auth-form-group">
              <input
                type="text"
                className="auth-input"
                placeholder="Enter 6-digit reset code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                maxLength="6"
                required
              />
            </div>

            <div className="auth-form-group">
              <input
                type="password"
                className="auth-input"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength="6"
                required
              />
            </div>

            <div className="auth-form-group">
              <input
                type="password"
                className="auth-input"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength="6"
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'RESETTING...' : 'RESET PASSWORD'}
            </button>

            <button 
              type="button" 
              className="auth-btn-secondary"
              onClick={() => setStep(1)}
            >
              BACK
            </button>
          </form>
        )}

        <div className="auth-footer">
          Remember your password? <Link to="/admin/login" className="text-primary">Login</Link>
        </div>
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
        .auth-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .auth-btn-secondary {
          width: 100%;
          padding: 15px;
          background: #e8ecf1;
          color: #1f1f1f;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1px;
          cursor: pointer;
          margin-top: 10px;
          transition: opacity 0.3s;
        }
        .auth-btn-secondary:hover {
          opacity: 0.8;
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
        .auth-success {
          background: #e8f5e9;
          color: #2e7d32;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
          font-size: 14px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;








