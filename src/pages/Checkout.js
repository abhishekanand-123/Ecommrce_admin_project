// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom"; // <-- added
// import "./Checkout.css"; // optional CSS

// function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const totalAmount = location.state?.totalAmount || 0; // <-- get total

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     address: "",
//     phone: "",
//   });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Send data to backend (store order)
//     await fetch("http://localhost:5000/order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...form,
//         totalAmount: totalAmount,
//       }),
//     });

//     alert("Order placed successfully!");

//     // Clear Cart from backend
//     await fetch(`http://localhost:5000/cart/clear/1`, {
//       method: "DELETE",
//     });

//     navigate("/thank-you", { state: { totalAmount } });
//   };

//   return (
//     <div className="checkout-container">
//       <h2>Checkout</h2>

//       <h3 className="total-box">Total Payable: ₹{totalAmount}</h3> {/* <-- Added */}

//       <form onSubmit={handleSubmit} className="checkout-form">
//         <input
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="phone"
//           placeholder="Phone Number"
//           value={form.phone}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="address"
//           placeholder="Address"
//           value={form.address}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit" className="place-order-btn">
//           Place Order
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Checkout;



// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import "./Checkout.css";

// function Checkout() {
//   const location = useLocation();
//   const totalAmount = location.state?.totalAmount || 0;

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     address: "",
//     phone: "",
//   });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleStripePayment = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/create-checkout-session", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: totalAmount })
//       });

//       const data = await response.json();
//       console.log("Stripe URL =>", data.url);

//       window.location.href = data.url;
//     } catch (error) {
//       console.log("Payment Error:", error);
//     }
//   };





//   return (
//     <div className="checkout-container">
//       <h2>Checkout</h2>
//       <h3>Total Payable: ₹{totalAmount}</h3>

//       <form className="checkout-form">
//         <input name="name" placeholder="Full Name" onChange={handleChange} required />
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//         <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
//         <textarea name="address" placeholder="Address" onChange={handleChange} required />

//         <button type="button"
//           className="place-order-btn"
//           style={{ background:"black", color:"white", marginTop:"15px" }}
//           onClick={handleStripePayment}>
//           Pay Now with Stripe
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Checkout;



import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const totalAmount = Number(location.state?.totalAmount) || 0;
  const userId = localStorage.getItem('user_id');

  // Coupon states
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [couponError, setCouponError] = useState('');

  // Final amount after discount - ensure both are numbers
  const finalAmount = Number(totalAmount) - Number(discount);

  useEffect(() => {
    // Check if user is logged in
    if (!userId) {
      alert('Please login to proceed with checkout');
      localStorage.setItem('redirectAfterLogin', '/cart');
      navigate('/login');
    }
  }, [userId, navigate]);

  // Apply coupon
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setCouponError('');
    setCouponMessage('');

    try {
      const response = await fetch('http://localhost:5000/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, amount: Number(totalAmount), user_id: userId })
      });

      const data = await response.json();

      if (response.ok) {
        setDiscount(Number(data.discount) || 0);
        setCouponApplied(true);
        setCouponMessage(data.message);
        setCouponError('');
      } else {
        setCouponError(data.message);
        setDiscount(0);
        setCouponApplied(false);
      }
    } catch (error) {
      setCouponError('Failed to validate coupon');
    }
  };

  // Remove coupon
  const removeCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setCouponApplied(false);
    setCouponMessage('');
    setCouponError('');
  };

  const handleStripePayment = async () => {
    if (!userId) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: Number(finalAmount), user_id: userId }),
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // ✅ redirect to Stripe
      } else {
        alert("Stripe session failed");
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      
      {/* Order Summary */}
      <div className="order-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₹{Number(totalAmount).toFixed(2)}</span>
        </div>

        {/* Coupon Section */}
        <div className="coupon-section">
          <h4>Have a coupon?</h4>
          {!couponApplied ? (
            <div className="coupon-input-group">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="coupon-input"
              />
              <button onClick={applyCoupon} className="apply-btn">
                Apply
              </button>
            </div>
          ) : (
            <div className="coupon-applied">
              <span className="coupon-tag">
                🎉 {couponCode} applied!
                <button onClick={removeCoupon} className="remove-coupon">×</button>
              </span>
            </div>
          )}
          {couponError && <p className="coupon-error">{couponError}</p>}
          {couponMessage && <p className="coupon-success">{couponMessage}</p>}
        </div>

        {/* Discount Row */}
        {Number(discount) > 0 && (
          <div className="summary-row discount-row">
            <span>Discount:</span>
            <span className="discount-amount">- ₹{Number(discount).toFixed(2)}</span>
          </div>
        )}

        {/* Total */}
        <div className="summary-row total-row">
          <span>Total Payable:</span>
          <span className="total-amount">₹{Number(finalAmount).toFixed(2)}</span>
        </div>
      </div>

      <button
        className="place-order-btn"
        onClick={handleStripePayment}
      >
        Pay ₹{Number(finalAmount).toFixed(2)} with Stripe
      </button>
    </div>
  );
}

export default Checkout;
