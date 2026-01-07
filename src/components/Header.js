import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };
    
    checkUser();
    
    // Listen for storage changes (login/logout from other tabs)
    window.addEventListener('storage', checkUser);
    
    // Custom event for same-tab login
    window.addEventListener('userLogin', checkUser);
    
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('userLogin', checkUser);
    };
  }, []);

  const handleLogout = () => {
    // Clear all user data
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    localStorage.removeItem('pendingCartProduct');
    setUser(null);
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">MyWebsite</div>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact Us</Link>

        {/* 🛒 New Shop Link */}
        <Link to="/products">Shop</Link>

        {/* Optional: Cart Link */}
        <Link to="/cart">Cart</Link>

        {/* Login/Logout */}
        {user ? (
          <>
            <span className="user-name">Hi, {user.username}</span>
            {user.is_affiliate === 1 && (
              <Link to="/affiliate-dashboard" className="affiliate-link">
                <i className="mdi mdi-chart-line"></i> Affiliate Dashboard
              </Link>
            )}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
