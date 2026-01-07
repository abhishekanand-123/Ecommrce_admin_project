import React, { useState, useEffect } from 'react';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    discount_amount: '',
    min_amount: '',
    expiry_date: '',
    is_active: true
  });

  // Fetch all coupons
  const fetchCoupons = async () => {
    try {
      const res = await fetch('http://localhost:5000/coupons');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCoupons(data);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Add new coupon
  const handleAddCoupon = async (e) => {
    e.preventDefault();
    
    try {
      // Convert string values to numbers for numeric fields
      const dataToSend = {
        ...formData,
        discount_amount: Number(formData.discount_amount) || 0,
        min_amount: Number(formData.min_amount) || 0
      };

      const res = await fetch('http://localhost:5000/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      
      if (res.ok) {
        alert('Coupon added successfully!');
        setShowModal(false);
        resetForm();
        fetchCoupons();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to add coupon');
      }
    } catch (error) {
      console.error('Error adding coupon:', error);
      alert('Failed to add coupon');
    }
  };

  // Edit coupon
  const handleEditCoupon = async (e) => {
    e.preventDefault();
    
    try {
      // Convert string values to numbers for numeric fields
      const dataToSend = {
        ...formData,
        discount_amount: Number(formData.discount_amount) || 0,
        min_amount: Number(formData.min_amount) || 0
      };

      const res = await fetch(`http://localhost:5000/coupons/${editingCoupon.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      
      if (res.ok) {
        alert('Coupon updated successfully!');
        setShowModal(false);
        setEditingCoupon(null);
        resetForm();
        fetchCoupons();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to update coupon');
      }
    } catch (error) {
      console.error('Error updating coupon:', error);
      alert('Failed to update coupon');
    }
  };

  // Delete coupon
  const handleDeleteCoupon = async (id) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    
    try {
      const res = await fetch(`http://localhost:5000/coupons/${id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        alert('Coupon deleted successfully!');
        fetchCoupons();
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
      alert('Failed to delete coupon');
    }
  };

  // Toggle coupon status
  const toggleCouponStatus = async (coupon) => {
    try {
      const res = await fetch(`http://localhost:5000/coupons/${coupon.id}/toggle`, {
        method: 'PUT'
      });
      
      if (res.ok) {
        fetchCoupons();
      }
    } catch (error) {
      console.error('Error toggling coupon status:', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      code: '',
      discount_amount: '',
      min_amount: '',
      expiry_date: '',
      is_active: true
    });
  };

  // Open edit modal
  const openEditModal = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discount_amount: coupon.discount_amount || '',
      min_amount: coupon.min_amount || '',
      expiry_date: coupon.expiry_date ? coupon.expiry_date.split('T')[0] : '',
      is_active: coupon.is_active
    });
    setShowModal(true);
  };

  // Open add modal
  const openAddModal = () => {
    setEditingCoupon(null);
    resetForm();
    setShowModal(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Coupon Management</h3>
        <button className="btn btn-primary" onClick={openAddModal}>
          <i className="mdi mdi-plus"></i> Add Coupon
        </button>
      </div>

      {/* Coupons Table */}
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">All Coupons</h4>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Discount (₹)</th>
                  <th>Min Amount</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>No coupons found</td>
                  </tr>
                ) : (
                  coupons.map(coupon => (
                    <tr key={coupon.id}>
                      <td><strong>{coupon.code}</strong></td>
                      <td>₹{coupon.discount_amount || 0}</td>
                      <td>₹{coupon.min_amount || 0}</td>
                      <td>{coupon.expiry_date ? new Date(coupon.expiry_date).toLocaleDateString() : 'No expiry'}</td>
                      <td>
                        <span 
                          className={`badge ${coupon.is_active ? 'badge-success' : 'badge-danger'}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => toggleCouponStatus(coupon)}
                        >
                          {coupon.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-info me-2"
                          onClick={() => openEditModal(coupon)}
                        >
                          <i className="mdi mdi-pencil"></i> Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteCoupon(coupon.id)}
                        >
                          <i className="mdi mdi-delete"></i> Delete
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5>{editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}</h5>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={editingCoupon ? handleEditCoupon : handleAddCoupon}>
              <div className="form-group">
                <label>Coupon Code</label>
                <input
                  type="text"
                  name="code"
                  className="form-control"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g., SAVE20"
                  required
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
              <div className="form-group">
                <label>Discount Amount (₹)</label>
                <input
                  type="number"
                  name="discount_amount"
                  className="form-control"
                  value={formData.discount_amount}
                  onChange={handleChange}
                  min="1"
                  step="0.01"
                  required
                />
                <small style={{ color: '#666', fontSize: '12px' }}>Fixed rupee discount amount</small>
              </div>
              <div className="form-group">
                <label>Minimum Order Amount (₹)</label>
                <input
                  type="number"
                  name="min_amount"
                  className="form-control"
                  value={formData.min_amount}
                  onChange={handleChange}
                  placeholder="0 for no minimum"
                />
              </div>
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="date"
                  name="expiry_date"
                  className="form-control"
                  value={formData.expiry_date}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                  />
                  <span>Active</span>
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCoupon ? 'Update Coupon' : 'Add Coupon'}
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
        .badge-success {
          background: #1bcfb4;
          color: #fff;
        }
        .badge-danger {
          background: #fe7c96;
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
        .btn-info {
          background: #1bcfb4;
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
        .me-2 {
          margin-right: 8px;
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
          max-height: 90vh;
          overflow-y: auto;
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
        .checkbox-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .checkbox-group input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #9a55ff;
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

export default CouponManagement;








