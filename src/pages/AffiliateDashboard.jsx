import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AffiliateDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCommissions: 0,
    pendingCommissions: 0,
    paidCommissions: 0,
    totalOrders: 0
  });

  useEffect(() => {
    // Check if user is logged in and is an affiliate
    const userData = localStorage.getItem('user');
    if (!userData) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    const userObj = JSON.parse(userData);
    if (!userObj.is_affiliate || userObj.is_affiliate === 0) {
      alert('You are not an affiliate user');
      navigate('/');
      return;
    }

    setUser(userObj);
    fetchCommissions(userObj.id);
  }, [navigate]);

  const fetchCommissions = async (affiliateId) => {
    try {
      const res = await fetch(`http://localhost:5000/affiliate-commissions/${affiliateId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setCommissions(data);
        
        // Calculate stats
        const total = data.reduce((sum, c) => sum + parseFloat(c.commission_amount || 0), 0);
        const pending = data
          .filter(c => c.status === 'pending')
          .reduce((sum, c) => sum + parseFloat(c.commission_amount || 0), 0);
        const paid = data
          .filter(c => c.status === 'paid')
          .reduce((sum, c) => sum + parseFloat(c.commission_amount || 0), 0);
        
        setStats({
          totalCommissions: total,
          pendingCommissions: pending,
          paidCommissions: paid,
          totalOrders: data.length
        });
      }
    } catch (error) {
      console.error('Error fetching commissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = (productId = '') => {
    const baseUrl = window.location.origin;
    const referralUrl = productId 
      ? `${baseUrl}/product/${productId}?ref=${user.affiliate_code}`
      : `${baseUrl}?ref=${user.affiliate_code}`;
    
    navigator.clipboard.writeText(referralUrl);
    alert('Referral link copied to clipboard!');
  };

  if (loading || !user) return <div>Loading...</div>;

  return (
    <div className="affiliate-dashboard">
      <div className="dashboard-header">
        <h2>Affiliate Dashboard</h2>
        <p>Welcome, {user.username}!</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <h3>Total Commissions</h3>
          <h2>₹{stats.totalCommissions.toFixed(2)}</h2>
        </div>
        <div className="stat-card stat-warning">
          <h3>Pending</h3>
          <h2>₹{stats.pendingCommissions.toFixed(2)}</h2>
        </div>
        <div className="stat-card stat-success">
          <h3>Paid</h3>
          <h2>₹{stats.paidCommissions.toFixed(2)}</h2>
        </div>
        <div className="stat-card stat-info">
          <h3>Total Orders</h3>
          <h2>{stats.totalOrders}</h2>
        </div>
      </div>

      {/* Referral Code Section */}
      <div className="referral-section">
        <h3>Your Affiliate Code</h3>
        <div className="referral-code-box">
          <code>{user.affiliate_code}</code>
          <button onClick={() => copyReferralLink()} className="copy-btn">
            <i className="mdi mdi-content-copy"></i> Copy Link
          </button>
        </div>
              <p className="referral-info">
                Share this link with your friends. When they make a purchase, you'll earn a commission!
              </p>
              <p className="referral-expiry-note">
                ⏰ <strong>Note:</strong> Referral links expire after 1 day (24 hours). Make sure to share fresh links!
              </p>
      </div>

      {/* Commissions Table */}
      <div className="commissions-table">
        <h3>Your Commissions</h3>
        {commissions.length === 0 ? (
          <p>No commissions yet. Start sharing your referral link!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Amount</th>
                <th>Commission Rate</th>
                <th>Commission</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {commissions.map(commission => (
                <tr key={commission.id}>
                  <td><code>{commission.order_id}</code></td>
                  <td>₹{parseFloat(commission.order_amount || 0).toFixed(2)}</td>
                  <td>{commission.commission_rate}%</td>
                  <td><strong>₹{parseFloat(commission.commission_amount || 0).toFixed(2)}</strong></td>
                  <td>
                    <span className={`status-badge status-${commission.status}`}>
                      {commission.status}
                    </span>
                  </td>
                  <td>{new Date(commission.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .affiliate-dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .dashboard-header {
          margin-bottom: 30px;
        }
        .dashboard-header h2 {
          color: #1f1f1f;
          margin-bottom: 5px;
        }
        .dashboard-header p {
          color: #8e94a9;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-card {
          background: #fff;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .stat-card h3 {
          font-size: 14px;
          color: rgba(255,255,255,0.9);
          margin-bottom: 10px;
          font-weight: 500;
        }
        .stat-card h2 {
          font-size: 32px;
          color: #fff;
          margin: 0;
        }
        .stat-primary {
          background: linear-gradient(to right, #da8cff, #9a55ff);
        }
        .stat-warning {
          background: linear-gradient(to right, #ffc107, #ff9800);
        }
        .stat-success {
          background: linear-gradient(to right, #1bcfb4, #0d9488);
        }
        .stat-info {
          background: linear-gradient(to right, #047edf, #1bcfb4);
        }
        .referral-section {
          background: #fff;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }
        .referral-section h3 {
          color: #1f1f1f;
          margin-bottom: 15px;
        }
        .referral-code-box {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 10px;
        }
        .referral-code-box code {
          flex: 1;
          background: #f8f9fa;
          padding: 15px;
          border-radius: 4px;
          font-size: 18px;
          font-weight: bold;
          color: #9a55ff;
        }
        .copy-btn {
          background: linear-gradient(to right, #da8cff, #9a55ff);
          color: #fff;
          border: none;
          padding: 15px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .copy-btn:hover {
          opacity: 0.9;
        }
        .referral-info {
          color: #8e94a9;
          font-size: 14px;
          margin: 0 0 10px 0;
        }
        .referral-expiry-note {
          background: #fff3cd;
          border: 1px solid #ffc107;
          padding: 10px;
          border-radius: 4px;
          font-size: 12px;
          color: #856404;
          margin: 10px 0 0 0;
        }
        .commissions-table {
          background: #fff;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .commissions-table h3 {
          color: #1f1f1f;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        table th, table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e8ecf1;
        }
        table th {
          background: #f8f9fa;
          font-weight: 600;
          color: #1f1f1f;
        }
        table tbody tr:hover {
          background: #f8f9fa;
        }
        .status-badge {
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        .status-pending {
          background: #ffc107;
          color: #000;
        }
        .status-paid {
          background: #1bcfb4;
          color: #fff;
        }
        .status-cancelled {
          background: #fe7c96;
          color: #fff;
        }
        code {
          background: #f8f9fa;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

export default AffiliateDashboard;

