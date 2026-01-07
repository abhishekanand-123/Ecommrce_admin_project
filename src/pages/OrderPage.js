import React, { useEffect, useState } from "react";
import "./OrderPage.css";

function OrderPage() {
  const [order, setOrder] = useState(null);
  const userId = 1; // later replace with logged-in user

  useEffect(() => {
    fetch(`http://localhost:5000/orders/latest/${userId}`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(err => console.log(err));
  }, []);

  if (!order) return <h3>Loading your order...</h3>;

  return (
    <div className="order-page">
      <h2>🧾 Your Order</h2>

      <div className="order-box">
        <p><b>Transaction ID:</b> {order.transaction.transaction_id}</p>
        <p><b>Status:</b> {order.transaction.status}</p>
        <p><b>Total Paid:</b> ₹{order.transaction.amount}</p>
        <p><b>Email:</b> {order.transaction.email}</p>
      </div>

      <h3>📦 Ordered Products</h3>

      <table className="order-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {order.products.map((p) => (
            <tr key={p.product_id}>
              <td>{p.title}</td>
              <td>{p.quantity}</td>
              <td>₹{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => window.location.href="/"}>
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderPage;