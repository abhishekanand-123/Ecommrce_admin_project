import React, { useState, useEffect } from 'react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    commission_percentage: '',
    image: null
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/products');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('commission_percentage', formData.commission_percentage || '');
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const res = await fetch('http://localhost:5000/products', {
        method: 'POST',
        body: data
      });
      
      if (res.ok) {
        alert('Product added successfully!');
        setShowModal(false);
        setFormData({ title: '', price: '', description: '', commission_percentage: '', image: null });
        fetchProducts();
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  // Edit product
  const handleEditProduct = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('commission_percentage', formData.commission_percentage || '');
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const res = await fetch(`http://localhost:5000/products/${editingProduct.id}`, {
        method: 'PUT',
        body: data
      });
      
      if (res.ok) {
        alert('Product updated successfully!');
        setShowModal(false);
        setEditingProduct(null);
        setFormData({ title: '', price: '', description: '', commission_percentage: '', image: null });
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        alert('Product deleted successfully!');
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  // Open edit modal
  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description || '',
      commission_percentage: product.commission_percentage || '',
      image: null
    });
    setShowModal(true);
  };

  // Open add modal
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ title: '', price: '', description: '', image: null });
    setShowModal(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Product Management</h3>
        <button className="btn btn-primary" onClick={openAddModal}>
          <i className="mdi mdi-plus"></i> Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">All Products</h4>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Commission %</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img 
                        src={`http://localhost:5000/uploads/${product.image}`} 
                        alt={product.title}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>₹{product.price}</td>
                    <td>
                      {product.commission_percentage !== null && product.commission_percentage !== undefined 
                        ? `${product.commission_percentage}%` 
                        : <span style={{ color: '#999' }}>Global Rate</span>}
                    </td>
                    <td>{product.description?.substring(0, 50)}...</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-info me-2"
                        onClick={() => openEditModal(product)}
                      >
                        <i className="mdi mdi-pencil"></i> Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <i className="mdi mdi-delete"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
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
              <h5>{editingProduct ? 'Edit Product' : 'Add New Product'}</h5>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={formData.price}
                  onChange={handleChange}
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
                  placeholder="Leave empty to use global commission rates"
                />
                <small style={{ color: '#666', fontSize: '12px', display: 'block', marginTop: '5px' }}>
                  If set, this product will use this commission rate. Leave empty to use global commission rates.
                </small>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Image {editingProduct && '(Leave empty to keep current)'}</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Update Product' : 'Add Product'}
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

export default ProductManagement;








