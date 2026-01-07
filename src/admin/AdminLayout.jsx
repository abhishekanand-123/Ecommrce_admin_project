import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const adminId = localStorage.getItem('admin_id');
    const adminData = localStorage.getItem('admin');

    if (!adminId || !adminData) {
      // Not logged in, redirect to admin login
      alert('Please login to access admin dashboard');
      navigate('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [navigate]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Outlet />
          </div>
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 2024. All rights reserved.
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;


