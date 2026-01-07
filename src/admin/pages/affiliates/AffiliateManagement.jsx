import React, { useState, useEffect } from 'react';

const AffiliateManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [affiliateCode, setAffiliateCode] = useState('');

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/users');
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Make user an affiliate
  const handleMakeAffiliate = async (e) => {
    e.preventDefault();
    
    if (!affiliateCode.trim()) {
      alert('Please enter an affiliate code');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/users/${selectedUser.id}/make-affiliate`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ affiliate_code: affiliateCode.toUpperCase() })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert('User made affiliate successfully!');
        setShowModal(false);
        setAffiliateCode('');
        setSelectedUser(null);
        fetchUsers();
      } else {
        alert(data.message || 'Failed to make user affiliate');
      }
    } catch (error) {
      console.error('Error making affiliate:', error);
      alert('Failed to make user affiliate');
    }
  };

  // Remove affiliate status
  const handleRemoveAffiliate = async (userId) => {
    if (!window.confirm('Are you sure you want to remove affiliate status?')) return;
    
    try {
      const res = await fetch(`http://localhost:5000/users/${userId}/remove-affiliate`, {
        method: 'PUT'
      });
      
      if (res.ok) {
        alert('Affiliate status removed successfully!');
        fetchUsers();
      }
    } catch (error) {
      console.error('Error removing affiliate:', error);
      alert('Failed to remove affiliate status');
    }
  };

  // Open modal to make affiliate
  const openMakeAffiliateModal = (user) => {
    setSelectedUser(user);
    setAffiliateCode(user.username.toUpperCase() + Math.floor(Math.random() * 10000));
    setShowModal(true);
  };

  if (loading) return <div>Loading...</div>;

  const affiliates = users.filter(u => u.is_affiliate === 1);
  const nonAffiliates = users.filter(u => u.is_affiliate === 0 || !u.is_affiliate);

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Affiliate Management</h3>
      </div>

      {/* Affiliates Table */}
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Current Affiliates ({affiliates.length})</h4>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Affiliate Code</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {affiliates.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>No affiliates found</td>
                  </tr>
                ) : (
                  affiliates.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td><strong>{user.username}</strong></td>
                      <td>{user.email}</td>
                      <td><span className="badge badge-info">{user.affiliate_code}</span></td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveAffiliate(user.id)}
                        >
                          <i className="mdi mdi-account-remove"></i> Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Non-Affiliates Table */}
      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-body">
          <h4 className="card-title">All Users - Make Affiliate ({nonAffiliates.length})</h4>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {nonAffiliates.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>No users found</td>
                  </tr>
                ) : (
                  nonAffiliates.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td><strong>{user.username}</strong></td>
                      <td>{user.email}</td>
                      <td>{user.country || 'N/A'}</td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => openMakeAffiliateModal(user)}
                        >
                          <i className="mdi mdi-account-plus"></i> Make Affiliate
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Make Affiliate Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Make {selectedUser?.username} an Affiliate</h5>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleMakeAffiliate}>
              <div className="form-group">
                <label>Affiliate Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={affiliateCode}
                  onChange={(e) => setAffiliateCode(e.target.value.toUpperCase())}
                  placeholder="e.g., USER1234"
                  required
                  style={{ textTransform: 'uppercase' }}
                />
                <small style={{ color: '#666', fontSize: '12px' }}>
                  This code will be used for referrals. Make it unique.
                </small>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Make Affiliate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
        .card {
          background: #fff;
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        .card-body {
          padding: 25px;
        }
        .card-title {
          margin-bottom: 20px;
          color: #1f1f1f;
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
        .badge-info {
          background: #1bcfb4;
          color: #fff;
        }
        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .btn-primary {
          background: linear-gradient(to right, #da8cff, #9a55ff);
          color: #fff;
        }
        .btn-danger {
          background: #fe7c96;
          color: #fff;
        }
        .btn-secondary {
          background: #e8ecf1;
          color: #1f1f1f;
        }
        .btn-sm {
          padding: 5px 10px;
          font-size: 12px;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e8ecf1;
        }
        .modal-header h5 {
          margin: 0;
          color: #1f1f1f;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #8e94a9;
        }
        .form-group {
          padding: 0 20px;
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          color: #1f1f1f;
          font-weight: 500;
        }
        .form-control {
          width: 100%;
          padding: 10px;
          border: 1px solid #e8ecf1;
          border-radius: 4px;
          font-size: 14px;
        }
        .form-control:focus {
          outline: none;
          border-color: #9a55ff;
        }
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 20px;
          border-top: 1px solid #e8ecf1;
        }
      `}</style>
    </div>
  );
};

export default AffiliateManagement;

