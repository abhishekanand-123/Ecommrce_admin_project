import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('admin_id');
    alert('Logged out successfully!');
    navigate('/admin/login');
  };

  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <div>
          Free 24/7 customer support, updates, and more with this template! 
          <a href="https://www.bootstrapdash.com/product/purple-admin-template/" target="_blank" rel="noopener noreferrer">Buy Now</a>
        </div>
        <div className="banner-right">
          <a href="/"><i className="mdi mdi-home"></i></a>
          <a href="#" onClick={(e) => e.target.closest('.top-banner').style.display = 'none'}><i className="mdi mdi-close"></i></a>
        </div>
      </div>
      
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="navbar-brand-wrapper">
          <Link className="navbar-brand" to="/admin">
            <i className="mdi mdi-alpha-s-circle"></i>
            Purple
          </Link>
        </div>
        <div className="navbar-menu-wrapper">
          <div className="d-flex align-items-center">
            <button className="btn btn-link p-0 me-3" type="button" style={{ color: '#8e94a9', border: 'none', background: 'transparent' }}>
              <i className="mdi mdi-menu" style={{ fontSize: '24px' }}></i>
            </button>
            <div className="d-none d-md-flex align-items-center">
              <i className="mdi mdi-magnify me-2" style={{ color: '#8e94a9', fontSize: '20px' }}></i>
              <input 
                type="text" 
                className="search-field" 
                placeholder="Search projects"
              />
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="navbar-profile d-flex align-items-center me-2">
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="profile" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
              <span className="ms-2 d-none d-sm-inline" style={{ color: '#1f1f1f', fontWeight: 500, fontSize: '0.875rem' }}>
                {admin ? admin.username : 'Admin'}
              </span>
              <i className="mdi mdi-chevron-down ms-1" style={{ color: '#8e94a9' }}></i>
            </div>
            <a className="nav-link p-2" href="#" style={{ color: '#8e94a9' }}>
              <i className="mdi mdi-view-grid" style={{ fontSize: '20px' }}></i>
            </a>
            <a className="nav-link p-2" href="#" style={{ color: '#8e94a9', position: 'relative' }}>
              <i className="mdi mdi-email-outline" style={{ fontSize: '20px' }}></i>
              <span style={{ position: 'absolute', top: '5px', right: '5px', width: '6px', height: '6px', borderRadius: '50%', background: '#1bcfb4' }}></span>
            </a>
            <a className="nav-link p-2" href="#" style={{ color: '#8e94a9', position: 'relative' }}>
              <i className="mdi mdi-bell-outline" style={{ fontSize: '20px' }}></i>
              <span style={{ position: 'absolute', top: '5px', right: '5px', width: '6px', height: '6px', borderRadius: '50%', background: '#fe7c96' }}></span>
            </a>
            <button 
              onClick={handleLogout}
              className="nav-link p-2" 
              style={{ color: '#ff4444', border: 'none', background: 'transparent', cursor: 'pointer' }}
              title="Logout"
            >
              <i className="mdi mdi-power" style={{ fontSize: '20px' }}></i>
            </button>
            <a className="nav-link p-2" href="#" style={{ color: '#8e94a9' }}>
              <i className="mdi mdi-format-line-spacing" style={{ fontSize: '20px' }}></i>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
