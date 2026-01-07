import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const [user, setUser] = useState(null);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [commission, setCommission] = useState(null);
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    // Check if user is logged in and is affiliate
    const checkUserStatus = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const userObj = JSON.parse(userData);
          setUser(userObj);
          // Check if user is affiliate (handle both number and string)
          const isAff = userObj.is_affiliate === 1 || userObj.is_affiliate === '1' || userObj.is_affiliate === true;
          if (isAff) {
            setIsAffiliate(true);
            fetchCommission(product.id);
          } else {
            setIsAffiliate(false);
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          setIsAffiliate(false);
        }
      } else {
        setUser(null);
        setIsAffiliate(false);
      }
    };

    // Initial check
    checkUserStatus();

    // Listen for login events
    window.addEventListener('userLogin', checkUserStatus);
    window.addEventListener('storage', checkUserStatus); // For cross-tab updates
    
    return () => {
      window.removeEventListener('userLogin', checkUserStatus);
      window.removeEventListener('storage', checkUserStatus);
    };
  }, [product.id]);

  const fetchCommission = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${productId}/commission`);
      const data = await res.json();
      setCommission(data);
    } catch (error) {
      console.error('Error fetching commission:', error);
    }
  };

  const copyShareLink = () => {
    if (!user || !user.affiliate_code) {
      alert('Please login as affiliate to share products');
      return;
    }
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/product/${product.id}?ref=${user.affiliate_code}`;
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const getShareLink = () => {
    if (!user || !user.affiliate_code) return '';
    const baseUrl = window.location.origin;
    return `${baseUrl}/product/${product.id}?ref=${user.affiliate_code}`;
  };

  return (
    <>
      <div className="product-card">
        <Link to={`/product/${product.id}`} className="product-img-link">
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.title}
            className="product-img"
          />
        </Link>
        <h3>{product.title}</h3>
        <p className="product-price">₹ {(parseFloat(product.price) || 0).toFixed(2)}</p>

        {/* Affiliate Buttons */}
        {isAffiliate && (
          <div className="affiliate-buttons">
            <button 
              className="btn commission-btn" 
              onClick={() => setShowCommissionModal(true)}
              title="View Commission Details"
            >
              <i className="mdi mdi-cash-multiple"></i> Commission
            </button>
            <button 
              className={`btn share-btn-card ${linkCopied ? 'copied' : ''}`}
              onClick={copyShareLink}
              title="Copy Share Link"
            >
              <i className={`mdi ${linkCopied ? 'mdi-check' : 'mdi-share-variant'}`}></i> 
              {linkCopied ? 'Copied!' : 'Share'}
            </button>
          </div>
        )}

        <Link to={`/product/${product.id}`} className="btn details-btn">
          View Details
        </Link>
      </div>

      {/* Commission Modal */}
      {showCommissionModal && commission && (
        <div className="commission-modal-overlay" onClick={() => setShowCommissionModal(false)}>
          <div className="commission-modal-improved" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="modal-close-btn" onClick={() => setShowCommissionModal(false)}>
              <i className="mdi mdi-close"></i>
            </button>

            {/* Product Image Section */}
            <div className="modal-product-image-section">
              <img 
                src={`http://localhost:5000/uploads/${product.image}`} 
                alt={product.title}
                className="modal-product-img"
              />
            </div>

            {/* Content Section */}
            <div className="modal-content-section">
              {/* Product Title & Price */}
              <div className="modal-product-header">
                <h2 className="modal-product-title">{product.title}</h2>
                <p className="modal-product-price">₹{product.price}</p>
              </div>

              {/* Commission Info Box */}
              <div className="commission-info-box">
                <div className="commission-row-simple">
                  <div className="commission-item">
                    <span className="commission-label-text">Commission Rate</span>
                    <span className="commission-rate-badge">{commission.commission_rate}%</span>
                  </div>
                  <div className="commission-item highlight-commission">
                    <span className="commission-label-text">Your Commission</span>
                    <span className="commission-amount-big">₹{commission.commission_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="share-section-improved">
                <div className="share-title-section">
                  <i className="mdi mdi-share-variant share-icon"></i>
                  <h3 className="share-title-text">Share & Earn</h3>
                </div>
                
                <div className="share-link-wrapper">
                  <input 
                    type="text" 
                    readOnly 
                    value={getShareLink()} 
                    className="share-input-improved"
                  />
                  <button 
                    className={`share-copy-btn ${linkCopied ? 'copied-state' : ''}`} 
                    onClick={copyShareLink}
                  >
                    <i className={`mdi ${linkCopied ? 'mdi-check' : 'mdi-content-copy'}`}></i>
                    {linkCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <div className="share-info-list">
                  <div className="info-item">
                    <i className="mdi mdi-check-circle info-icon success"></i>
                    <span>Earn ₹{commission.commission_amount.toFixed(2)} per sale</span>
                  </div>
                  <div className="info-item">
                    <i className="mdi mdi-clock-outline info-icon warning"></i>
                    <span>Link valid for 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
