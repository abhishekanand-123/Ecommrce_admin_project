import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-img-link">
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.title}
          className="product-img"
        />
      </Link>
      <h3>{product.title}</h3>
      <p>₹ {(parseFloat(product.price) || 0).toFixed(2)}</p>

      <Link to={`/product/${product.id}`} className="btn details-btn">
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;
