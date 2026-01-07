import React, { useState, useEffect } from 'react';

const AffiliateCommissions = () => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all affiliate commissions
  const fetchCommissions = async () => {
    try {
      const res = await fetch('http://localhost:5000/affiliate-commissions');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCommissions(data);
      }
    } catch (error) {
      console.error('Error fetching commissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommissions();
  }, []);

  // Update commission status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/affiliate-commissions/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        alert('Commission status updated successfully!');
        fetchCommissions();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  // Calculate totals
  const totalCommissions = commissions.reduce((sum, c) => sum + parseFloat(c.commission_amount || 0), 0);
  const pendingCommissions = commissions
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + parseFloat(c.commission_amount || 0), 0);
  const paidCommissions = commissions
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + parseFloat(c.commission_amount || 0), 0);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Affiliate Commissions</h3>
      </div>

      {/* Stats Cards */}
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col-md-4">
          <div className="card bg-gradient-primary">
            <div className="card-body">
              <h4 className="card-title">Total Commissions</h4>
              <h2>₹{totalCommissions.toFixed(2)}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-gradient-warning">
            <div className="card-body">
              <h4 className="card-title">Pending</h4>
              <h2>₹{pendingCommissions.toFixed(2)}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-gradient-success">
            <div className="card-body">
              <h4 className="card-title">Paid</h4>
              <h2>₹{paidCommissions.toFixed(2)}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Commissions Table */}
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">All Commissions ({commissions.length})</h4>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Affiliate</th>
                  <th>Order ID</th>
                  <th>Order Amount</th>
                  <th>Commission Rate</th>
                  <th>Commission Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {commissions.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center' }}>No commissions found</td>
                  </tr>
                ) : (
                  commissions.map(commission => (
                    <tr key={commission.id}>
                      <td>{commission.id}</td>
                      <td>
                        <div>
                          <strong>{commission.affiliate_username}</strong><br />
                          <small style={{ color: '#666' }}>{commission.affiliate_email}</small>
                        </div>
                      </td>
                      <td><code>{commission.order_id}</code></td>
                      <td>₹{parseFloat(commission.order_amount || 0).toFixed(2)}</td>
                      <td>{commission.commission_rate}%</td>
                      <td><strong>₹{parseFloat(commission.commission_amount || 0).toFixed(2)}</strong></td>
                      <td>
                        <span className={`badge ${
                          commission.status === 'paid' ? 'badge-success' :
                          commission.status === 'pending' ? 'badge-warning' :
                          'badge-danger'
                        }`}>
                          {commission.status}
                        </span>
                      </td>
                      <td>{new Date(commission.created_at).toLocaleDateString()}</td>
                      <td>
                        <select
                          className="form-control form-control-sm"
                          value={commission.status}
                          onChange={(e) => handleUpdateStatus(commission.id, e.target.value)}
                          style={{ width: '120px' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .page-title {
          margin: 0;
          color: #1f1f1f;
        }
        .row {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        .col-md-4 {
          flex: 1;
        }
        .card {
          background: #fff;
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        .card-body {
          padding: 25px;
        }
        .card-title {
          margin-bottom: 10px;
          color: #1f1f1f;
          font-size: 14px;
          font-weight: 500;
        }
        .bg-gradient-primary {
          background: linear-gradient(to right, #da8cff, #9a55ff);
          color: #fff;
        }
        .bg-gradient-primary .card-title,
        .bg-gradient-primary h2 {
          color: #fff;
        }
        .bg-gradient-warning {
          background: linear-gradient(to right, #ffc107, #ff9800);
          color: #fff;
        }
        .bg-gradient-warning .card-title,
        .bg-gradient-warning h2 {
          color: #fff;
        }
        .bg-gradient-success {
          background: linear-gradient(to right, #1bcfb4, #0d9488);
          color: #fff;
        }
        .bg-gradient-success .card-title,
        .bg-gradient-success h2 {
          color: #fff;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        .table th, .table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e8ecf1;
        }
        .table th {
          background: #f8f9fa;
          font-weight: 600;
          color: #1f1f1f;
        }
        .table-hover tbody tr:hover {
          background: #f8f9fa;
        }
        .badge {
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        .badge-success {
          background: #1bcfb4;
          color: #fff;
        }
        .badge-warning {
          background: #ffc107;
          color: #000;
        }
        .badge-danger {
          background: #fe7c96;
          color: #fff;
        }
        .form-control {
          padding: 5px 10px;
          border: 1px solid #e8ecf1;
          border-radius: 4px;
          font-size: 14px;
        }
        .form-control-sm {
          padding: 4px 8px;
          font-size: 12px;
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

export default AffiliateCommissions;

