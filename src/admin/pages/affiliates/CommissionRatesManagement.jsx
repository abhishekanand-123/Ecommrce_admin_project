import React, { useState, useEffect } from 'react';

const CommissionRatesManagement = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRate, setEditingRate] = useState(null);
  const [formData, setFormData] = useState({
    rate_name: '',
    commission_percentage: '',
    min_sales_amount: '',
    is_active: true,
    cookie_duration: 30
  });

  // Fetch all commission rates
  const fetchRates = async () => {
    try {
      const res = await fetch('http://localhost:5000/commission-rates');
      const data = await res.json();
      if (Array.isArray(data)) {
        setRates(data);
      }
    } catch (error) {
      console.error('Error fetching commission rates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Add new commission rate
  const handleAddRate = async (e) => {
    e.preventDefault();
    
    try {
      const dataToSend = {
        ...formData,
        commission_percentage: Number(formData.commission_percentage) || 0,
        min_sales_amount: Number(formData.min_sales_amount) || 0,
        cookie_duration: Number(formData.cookie_duration) || 30
      };

      const res = await fetch('http://localhost:5000/commission-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      
      if (res.ok) {
        alert('Commission rate added successfully!');
        setShowModal(false);
        resetForm();
        fetchRates();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to add commission rate');
      }
    } catch (error) {
      console.error('Error adding commission rate:', error);
      alert('Failed to add commission rate');
    }
  };

  // Edit commission rate
  const handleEditRate = async (e) => {
    e.preventDefault();
    
    try {
      const dataToSend = {
        ...formData,
        commission_percentage: Number(formData.commission_percentage) || 0,
        min_sales_amount: Number(formData.min_sales_amount) || 0,
        cookie_duration: Number(formData.cookie_duration) || 30
      };

      const res = await fetch(`http://localhost:5000/commission-rates/${editingRate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      
      if (res.ok) {
        alert('Commission rate updated successfully!');
        setShowModal(false);
        setEditingRate(null);
        resetForm();
        fetchRates();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to update commission rate');
      }
    } catch (error) {
      console.error('Error updating commission rate:', error);
      alert('Failed to update commission rate');
    }
  };

  // Delete commission rate
  const handleDeleteRate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this commission rate?')) return;
    
    try {
      const res = await fetch(`http://localhost:5000/commission-rates/${id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        alert('Commission rate deleted successfully!');
        fetchRates();
      }
    } catch (error) {
      console.error('Error deleting commission rate:', error);
      alert('Failed to delete commission rate');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      rate_name: '',
      commission_percentage: '',
      min_sales_amount: '',
      is_active: true,
      cookie_duration: 30
    });
  };

  // Open edit modal
  const openEditModal = (rate) => {
    setEditingRate(rate);
    setFormData({
      rate_name: rate.rate_name || '',
      commission_percentage: rate.commission_percentage || '',
      min_sales_amount: rate.min_sales_amount || '',
      is_active: rate.is_active === 1,
      cookie_duration: rate.cookie_duration || 30
    });
    setShowModal(true);
  };

  // Open add modal
  const openAddModal = () => {
    setEditingRate(null);
    resetForm();
    setShowModal(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Commission Rates Management</h3>
        <button className="btn btn-primary" onClick={openAddModal}>
          <i className="mdi mdi-plus"></i> Add Commission Rate
        </button>
      </div>

      {/* Commission Rates Table */}
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">All Commission Rates</h4>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Rate Name</th>
                  <th>Commission %</th>
                  <th>Min Sales (₹)</th>
                  <th>Cookie Duration (Days)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rates.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>No commission rates found</td>
                  </tr>
                ) : (
                  rates.map(rate => (
                    <tr key={rate.id}>
                      <td><strong>{rate.rate_name}</strong></td>
                      <td>{rate.commission_percentage}%</td>
                      <td>₹{rate.min_sales_amount || 0}</td>
                      <td>{rate.cookie_duration} days</td>
                      <td>
                        <span className={`badge ${rate.is_active === 1 ? 'badge-success' : 'badge-danger'}`}>
                          {rate.is_active === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-info me-2"
                          onClick={() => openEditModal(rate)}
                        >
                          <i className="mdi mdi-pencil"></i> Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteRate(rate.id)}
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
              <h5>{editingRate ? 'Edit Commission Rate' : 'Add New Commission Rate'}</h5>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={editingRate ? handleEditRate : handleAddRate}>
              <div className="form-group">
                <label>Rate Name</label>
                <input
                  type="text"
                  name="rate_name"
                  className="form-control"
                  value={formData.rate_name}
                  onChange={handleChange}
                  placeholder="e.g., Standard Rate"
                  required
                />
              </div>
              <div className="form-group">
                <label>Commission Percentage (%)</label>
                <input
                  type="number"
                  name="commission_percentage"
                  className="form-control"
                  value={formData.commission_percentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label>Minimum Sales Amount (₹)</label>
                <input
                  type="number"
                  name="min_sales_amount"
                  className="form-control"
                  value={formData.min_sales_amount}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0 for no minimum"
                />
              </div>
              <div className="form-group">
                <label>Cookie Duration (Days)</label>
                <input
                  type="number"
                  name="cookie_duration"
                  className="form-control"
                  value={formData.cookie_duration}
                  onChange={handleChange}
                  min="1"
                  required
                />
                <small style={{ color: '#666', fontSize: '12px' }}>
                  How long to track referrals after click
                </small>
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
                  {editingRate ? 'Update Rate' : 'Add Rate'}
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

export default CommissionRatesManagement;

