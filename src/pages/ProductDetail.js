import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

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

        <button className="add-btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>

    </div>
  );
}

export default ProductDetail;
