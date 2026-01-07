import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ⬇ Add Stripe imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// ⬇ Your Stripe Publishable Key
const stripePromise = loadStripe("pk_test_51OmV8ISCq30aaaQjE3SoQsQ5heolFCZaWYYNDJcbPxsFpGIBPbGfaiYKdJiFeRpO2762fOrpZ0lBVJXN3koCda21001EN999ds");  

const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <Elements stripe={stripePromise}>
//       <App />
//     </Elements>
//   </React.StrictMode>
// );

root.render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
);
reportWebVitals();
