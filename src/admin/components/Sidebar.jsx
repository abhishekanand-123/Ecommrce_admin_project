import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isMenuActive = (paths) => {
    return paths.some(path => location.pathname.startsWith(path));
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      {/* Profile Section */}
      <div className="nav-profile">
        <div className="nav-profile-image">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="profile" />
          <span className="online-status"></span>
        </div>
        <div className="nav-profile-text">
          <span className="font-weight-bold">David Grey. H</span>
          <span className="text-secondary">Project Manager</span>
        </div>
        <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
      </div>

      <ul className="nav">
        {/* Dashboard */}
        <li className={`nav-item ${isActive('/admin') ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin">
            <span className="menu-icon"><i className="mdi mdi-home"></i></span>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>

        {/* Product Management */}
        <li className={`nav-item ${isActive('/admin/products') ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/products">
            <span className="menu-icon"><i className="mdi mdi-package-variant"></i></span>
            <span className="menu-title">Products</span>
          </Link>
        </li>

        {/* Coupon Management */}
        <li className={`nav-item ${isActive('/admin/coupons') ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/coupons">
            <span className="menu-icon"><i className="mdi mdi-ticket-percent"></i></span>
            <span className="menu-title">Coupons</span>
          </Link>
        </li>

        {/* Basic UI Elements */}
        <li className={`nav-item ${isMenuActive(['/admin/buttons', '/admin/dropdowns', '/admin/typography']) ? 'active' : ''}`}>
          <a 
            className="nav-link" 
            onClick={() => toggleMenu('ui')}
            style={{ cursor: 'pointer' }}
          >
            <span className="menu-icon"><i className="mdi mdi-crosshairs-gps"></i></span>
            <span className="menu-title">Basic UI Elements</span>
            <i className={`menu-arrow mdi ${openMenus.ui ? 'mdi-chevron-down' : 'mdi-chevron-right'}`}></i>
          </a>
          {openMenus.ui && (
            <ul className="nav sub-menu">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/admin/buttons') ? 'active' : ''}`} to="/admin/buttons">Buttons</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/admin/dropdowns') ? 'active' : ''}`} to="/admin/dropdowns">Dropdowns</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/admin/typography') ? 'active' : ''}`} to="/admin/typography">Typography</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Icons */}
        <li className={`nav-item ${isMenuActive(['/admin/icons']) ? 'active' : ''}`}>
          <a 
            className="nav-link"
            onClick={() => toggleMenu('icons')}
            style={{ cursor: 'pointer' }}
          >
            <span className="menu-icon"><i className="mdi mdi-contacts"></i></span>
            <span className="menu-title">Icons</span>
            <i className={`menu-arrow mdi ${openMenus.icons ? 'mdi-chevron-down' : 'mdi-chevron-right'}`}></i>
          </a>
          {openMenus.icons && (
            <ul className="nav sub-menu">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/admin/icons') ? 'active' : ''}`} to="/admin/icons">Mdi Icons</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Forms */}
        <li className={`nav-item ${isMenuActive(['/admin/form-elements']) ? 'active' : ''}`}>
          <a 
            className="nav-link"
            onClick={() => toggleMenu('forms')}
            style={{ cursor: 'pointer' }}
          >
            <span className="menu-icon"><i className="mdi mdi-format-list-bulleted"></i></span>
            <span className="menu-title">Forms</span>
            <i className={`menu-arrow mdi ${openMenus.forms ? 'mdi-chevron-down' : 'mdi-chevron-right'}`}></i>
          </a>
          {openMenus.forms && (
            <ul className="nav sub-menu">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/admin/form-elements') ? 'active' : ''}`} to="/admin/form-elements">Form Elements</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Charts */}
        <li className={`nav-item ${isMenuActive(['/admin/charts']) ? 'active' : ''}`}>
          <a 
            className="nav-link"
            onClick={() => toggleMenu('charts')}
            style={{ cursor: 'pointer' }}
          >
            <span className="menu-icon"><i className="mdi mdi-chart-bar"></i></span>
            <span className="menu-title">Charts</span>
            <i className={`menu-arrow mdi ${openMenus.charts ? 'mdi-chevron-down' : 'mdi-chevron-right'}`}></i>
          </a>
          {openMenus.charts && (
            <ul className="nav sub-menu">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/admin/charts') ? 'active' : ''}`} to="/admin/charts">ChartJs</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Tables */}
        <li className={`nav-item ${isMenuActive(['/admin/tables']) ? 'active' : ''}`}>
          <a 
            className="nav-link"
            onClick={() => toggleMenu('tables')}
            style={{ cursor: 'pointer' }}
          >
            <span className="menu-icon"><i className="mdi mdi-table-large"></i></span>
            <span className="menu-title">Tables</span>
            <i className={`menu-arrow mdi ${openMenus.tables ? 'mdi-chevron-down' : 'mdi-chevron-right'}`}></i>
          </a>
          {openMenus.tables && (
            <ul className="nav sub-menu">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/admin/tables') ? 'active' : ''}`} to="/admin/tables">Basic Tables</Link>
              </li>
            </ul>
          )}
        </li>

        {/* User Pages */}
        <li className={`nav-item ${isMenuActive(['/admin/login', '/admin/register']) ? 'active' : ''}`}>
          <a 
            className="nav-link"
            onClick={() => toggleMenu('auth')}
            style={{ cursor: 'pointer' }}
          >
            <span className="menu-icon"><i className="mdi mdi-lock"></i></span>
            <span className="menu-title">User Pages</span>
            <i className={`menu-arrow mdi ${openMenus.auth ? 'mdi-chevron-down' : 'mdi-chevron-right'}`}></i>
          </a>
          {openMenus.auth && (
            <ul className="nav sub-menu">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/admin/login') ? 'active' : ''}`} to="/admin/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/admin/register') ? 'active' : ''}`} to="/admin/register">Register</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Documentation */}
        <li className="nav-item">
          <a className="nav-link" href="https://www.bootstrapdash.com/demo/purple-admin-free/" target="_blank" rel="noopener noreferrer">
            <span className="menu-icon"><i className="mdi mdi-file-document-box"></i></span>
            <span className="menu-title">Documentation</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
