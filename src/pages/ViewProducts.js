import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewProducts.css";

function ViewProducts() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = location.state?.items || [];
  const totalAmount = location.state?.totalAmount || 0;

  return (
    <div className="view-products-container">
      <h2>Products in Your Cart</h2>

      <div className="products-list">
        {items.map((item) => (
          <div key={item.cart_id} className="product-card">
            <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title} />
            
            <h3>{item.title}</h3>
            <p><b>Price:</b> ₹{item.price}</p>
            <p><b>Quantity:</b> {item.qty}</p>
            <p><b>Total:</b> ₹{item.price * item.qty}</p>
          </div>
        ))}
      </div>

      <h3 className="total-display">Grand Total: ₹{totalAmount}</h3>

      <button className="back-btn" onClick={() => navigate("/cart")}>
        ⬅ Back to Cart
      </button>
    </div>
  );
}

export default ViewProducts;
