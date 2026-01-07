import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [commission, setCommission] = useState(null);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Check user status and fetch product
  useEffect(() => {
    // Check for referral code in URL
    const refCode = searchParams.get('ref');
    if (refCode) {
      // Set cookie for referral tracking (1 day = 24 hours)
      const expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + (1 * 24 * 60 * 60 * 1000)); // 1 day expiry
      document.cookie = `referral_code=${refCode}; expires=${expiryDate.toUTCString()}; path=/`;
    }

    // Check if user is logged in and is affiliate
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      if (userObj.is_affiliate === 1) {
        setIsAffiliate(true);
      } else {
        setIsAffiliate(false);
      }
    } else {
      setUser(null);
      setIsAffiliate(false);
    }

    // Fetch product
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id, searchParams]);

  // Fetch commission when product and affiliate status are ready
  useEffect(() => {
    if (product && isAffiliate && user) {
      fetchCommission(product.id);
    }
  }, [product, isAffiliate, user]);

  // Re-check user status when localStorage changes (for login/logout)
  useEffect(() => {
    const checkUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const userObj = JSON.parse(userData);
        setUser(userObj);
        if (userObj.is_affiliate === 1) {
          setIsAffiliate(true);
        } else {
          setIsAffiliate(false);
        }
      } else {
        setUser(null);
        setIsAffiliate(false);
      }
    };

    window.addEventListener('userLogin', checkUser);
    return () => window.removeEventListener('userLogin', checkUser);
  }, []);

  const fetchCommission = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${productId}/commission`);
      const data = await res.json();
      setCommission(data);
    } catch (error) {
      console.error('Error fetching commission:', error);
    }
  };

  if (!product) return <h2>Loading...</h2>;

  const addToCart = async () => {
    // Check if user is logged in
    const userId = localStorage.getItem('user_id');
    
    if (!userId) {
      // Save product info to add to cart after login
      localStorage.setItem('pendingCartProduct', JSON.stringify({
        product_id: product.id,
        product_title: product.title
      }));
      alert('Please login first to add items to cart');
      navigate('/login');
      return;
    }

    const res = await fetch("http://localhost:5000/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        product_id: product.id,
        qty: 1,
      }),
    });

    const data = await res.json();
    alert(data.message);

    // redirect to cart
    navigate("/cart");
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
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const getShareLink = () => {
    if (!user || !user.affiliate_code) return '';
    const baseUrl = window.location.origin;
    return `${baseUrl}/product/${product.id}?ref=${user.affiliate_code}`;
  };

  return (
    <div className="product-detail-container">

      <div className="left">
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.title}
          className="detail-image"
        />
      </div>

      <div className="right">
        <h2>{product.title}</h2>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>

        {/* Affiliate Commission Info */}
        {isAffiliate && commission && (
          <div className="affiliate-info">
            <h3 className="affiliate-title">
              <i className="mdi mdi-account-star"></i> Affiliate Earnings
            </h3>
            <div className="commission-display">
              <div className="commission-amount">
                <span className="commission-label">Your Commission:</span>
                <span className="commission-value">₹{commission.commission_amount.toFixed(2)}</span>
              </div>
              <div className="commission-rate">
                <span>Commission Rate: {commission.commission_rate}%</span>
                <span>Product Price: ₹{product.price}</span>
              </div>
            </div>
            
            <div className="share-section">
              <h4 className="share-title">
                <i className="mdi mdi-link-variant"></i> Share This Product
              </h4>
              <div className="share-link-box">
                <input 
                  type="text" 
                  readOnly 
                  value={getShareLink()} 
                  className="share-link-input"
                  id="shareLinkInput"
                />
                <button className={`copy-link-btn ${linkCopied ? 'copied' : ''}`} onClick={copyShareLink}>
                  <i className={`mdi ${linkCopied ? 'mdi-check' : 'mdi-content-copy'}`}></i> 
                  {linkCopied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
              <p className="share-note">
                Share this link with your friends. When they purchase, you'll earn ₹{commission.commission_amount.toFixed(2)} commission!
              </p>
              <p className="share-expiry-note">
                ⏰ <strong>Note:</strong> Referral links expire after 1 day (24 hours)
              </p>
            </div>
          </div>
        )}

        <button className="add-btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>

    </div>
  );
}

export default ProductDetail;
