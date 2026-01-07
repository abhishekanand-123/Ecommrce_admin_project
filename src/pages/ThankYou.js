
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ThankYou.css";

function ThankYou() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // Get user_id from localStorage
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        alert('User not found. Please login again.');
        window.location.href = '/login';
        return;
      }

      // 1️⃣ Save transaction (this also clears the cart on server)
      const saveRes = await fetch("http://localhost:5000/save-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, user_id: userId }),
      });

      if (!saveRes.ok) {
        const errorData = await saveRes.json();
        alert('Error saving transaction: ' + (errorData.error || 'Unknown error'));
        return;
      }

      const saveData = await saveRes.json();

      // 2️⃣ Fetch full transaction details
      const detailsRes = await fetch(
        `http://localhost:5000/transaction-details/${saveData.transaction_id}`
      );

      const details = await detailsRes.json();
      setData(details);

      // 3️⃣ Dispatch event to refresh cart on other pages
      window.dispatchEvent(new Event('cartUpdated'));
    }

    if (sessionId) {
      fetchData();
    }
  }, [sessionId]);

  if (!data) return <h3>Loading payment details...</h3>;

  return (
    <div className="thankyou-box">
      <h1>🎉 Thank You!</h1>

      <p><b>Transaction:</b> {data.transaction.transaction_id}</p>
      <p><b>Status:</b> {data.transaction.status}</p>
      <p><b>Total Paid:</b> ₹{data.transaction.amount}</p>
      <p><b>Email:</b> {data.transaction.email}</p>

      <h3>Purchased Products</h3>
      <ul>
        {data.products.map((p) => (
          <li key={p.product_id}>
            {p.title} × {p.quantity} — ₹{p.price}
          </li>
        ))}
      </ul>

      <button onClick={() => (window.location.href = "/")}>
        Continue Shopping
      </button>
    </div>
  );
}

export default ThankYou;
