import React, { useEffect, useState, useCallback } from "react";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  
  // Get user ID from localStorage
  const userId = localStorage.getItem('user_id');

  // Get Cart Items
  const loadCart = useCallback(async () => {
    if (!userId) {
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/cart/${userId}`);
      const data = await res.json();
      // Make sure data is an array before setting
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setItems([]);
    }
  }, [userId]);

  useEffect(() => {
    // Check if user is logged in
    if (!userId) {
      alert('Please login to view your cart');
      localStorage.setItem('redirectAfterLogin', '/cart');
      navigate('/login');
      return;
    }
    loadCart();
  }, [userId, navigate, loadCart]);

  // Listen for cart update events (e.g., after payment)
  useEffect(() => {
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    // Also refresh when page becomes visible (user returns from payment)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && userId) {
        loadCart();
      }
    });

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [loadCart, userId]);

  // Update Quantity
  const updateQty = async (cart_id, currentQty, type) => {
    let newQty = type === "inc" ? currentQty + 1 : currentQty - 1;
    if (newQty < 1 || newQty > 5) return;

    await fetch("http://localhost:5000/cart/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart_id, qty: newQty }),
    });

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.cart_id === cart_id ? { ...item, qty: newQty } : item
      )
    );
  };

  // Remove Item
  const removeItem = async (cart_id) => {
    await fetch(`http://localhost:5000/cart/remove/${cart_id}`, {
      method: "DELETE",
    });

    setItems(prevItems => prevItems.filter((item) => item.cart_id !== cart_id));
  };

  // Total Price Calculation
  const totalAmount = Array.isArray(items) 
    ? items.reduce((sum, item) => sum + item.price * item.qty, 0)
    : 0;

  // Checkout Page Navigation
  const handleCheckout = () => {
    navigate("/checkout", { state: { totalAmount } });
  };

  // View Cart Products Page
  const handleViewProducts = () => {
    navigate("/view-products", { state: { items, totalAmount } });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.cart_id}>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.title}
                    className="cart-img"
                  />
                </td>

                <td>{item.title}</td>

                <td>
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.cart_id, item.qty, "dec")}
                    disabled={item.qty <= 1}
                  >
                    -
                  </button>

                  <span className="qty">{item.qty}</span>

                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.cart_id, item.qty, "inc")}
                    disabled={item.qty >= 5}
                  >
                    +
                  </button>
                </td>

                <td>₹{item.price}</td>
                <td>₹{item.price * item.qty}</td>

                <td>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.cart_id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Grand Total + Buttons */}
      <div className="checkout-box">
        <h3 className="total-box">Grand Total: ₹{totalAmount}</h3>

        {items.length > 0 && (
          <>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            <button className="view-products-btn" onClick={handleViewProducts}>
              View Products
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
