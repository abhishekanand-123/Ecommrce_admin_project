
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Stripe = require("stripe");

// ================== STRIPE SECRET KEY ==================

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --------------------------------------------
// MYSQL DATABASE CONNECTION
// --------------------------------------------
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_registration",
});

db.connect((err) => {
  if (err) {
    console.error("DB Connection Failed:", err);
    return;
  }
  console.log("MySQL Connected");
});

// --------------------------------------------
// MULTER FILE UPLOAD SETUP
// --------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// --------------------------------------------
// 1️⃣ TESTIMONIALS API
// --------------------------------------------
app.get("/testimonials", (req, res) => {
  db.query("SELECT * FROM testimonials", (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json(result);
  });
});

// --------------------------------------------
// 2️⃣ PRODUCTS API
// --------------------------------------------

// Get all products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json(result);
  });
});

// Get product details
app.get("/products/:id", (req, res) => {
  db.query("SELECT * FROM products WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json(result[0]);
  });
});
// payment
// app.get("/payment-details/:session_id", async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.retrieve(
//       req.params.session_id,
//       { expand: ["payment_intent", "customer"] }
//     );

//     res.json({
//       transaction_id: session.payment_intent?.id,
//       amount: session.amount_total / 100,
//       currency: session.currency,
//       email: session.customer_details?.email,
//       name: session.customer_details?.name,
//       address: session.customer_details?.address,
//       status: session.payment_status,
//     });

//   } catch (err) {
//     console.error("Fetch payment error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// });


app.post("/save-transaction", async (req, res) => {
  const { session_id, user_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(
      session_id,
      { expand: ["payment_intent", "customer"] }
    );

    const transaction_id = session.payment_intent.id;
    const amount = session.amount_total / 100;
    const currency = session.currency;
    const email = session.customer_details?.email;
    const status = session.payment_status;


    //this is abhi coide

    // 1️⃣ Save transaction
    db.query(
      `INSERT INTO transactions (user_id, transaction_id, amount, currency, email, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, transaction_id, amount, currency, email, status]
    );

    // 2️⃣ Move cart → order_items
    db.query(
      "INSERT INTO order_items (order_id, product_id, quantity) SELECT ?, product_id, qty FROM carts WHERE user_id=?",
      [transaction_id, user_id]
    );

    // 3️⃣ Clear cart
    db.query("DELETE FROM carts WHERE user_id=?", [user_id]);

    res.json({ success: true, transaction_id });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/transaction-details/:transaction_id", (req, res) => {
  const { transaction_id } = req.params;

  // 1️⃣ Fetch transaction
  db.query(
    "SELECT * FROM transactions WHERE transaction_id = ? LIMIT 1",
    [transaction_id],
    (err, transactionResult) => {
      if (err) return res.status(500).json({ error: err.message });
      if (transactionResult.length === 0)
        return res.status(404).json({ message: "Transaction not found" });

      const transaction = transactionResult[0];

      // 2️⃣ Fetch ordered products
      db.query(
        `
        SELECT 
          oi.product_id,
          oi.quantity,
          p.title,
          p.price
        FROM order_items oi
        JOIN products p ON p.id = oi.product_id
        WHERE oi.order_id = ?
        `,
        [transaction.transaction_id],
        (err2, products) => {
          if (err2) return res.status(500).json({ error: err2.message });

          // 3️⃣ Send ALL data
          res.json({
            transaction,
            products,
          });
        }
      );
    }
  );
});


// Add new product
app.post("/products", upload.single("image"), (req, res) => {
  const { title, price, description } = req.body;
  const image = req.file ? req.file.filename : null;

  db.query(
    "INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)",
    [title, price, description, image],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB Error" });
      res.json({ message: "Product Added", productId: result.insertId });
    }
  );
});

// Update product
app.put("/products/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { title, price, description } = req.body;
  const image = req.file ? req.file.filename : null;

  let query, params;
  if (image) {
    query = "UPDATE products SET title = ?, price = ?, description = ?, image = ? WHERE id = ?";
    params = [title, price, description, image, id];
  } else {
    query = "UPDATE products SET title = ?, price = ?, description = ? WHERE id = ?";
    params = [title, price, description, id];
  }

  db.query(query, params, (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json({ message: "Product Updated" });
  });
});

// Delete product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json({ message: "Product Deleted" });
  });
});

// --------------------------------------------
// COUPON MANAGEMENT
// --------------------------------------------

// Get all coupons
app.get("/coupons", (req, res) => {
  db.query("SELECT * FROM coupons ORDER BY created_at DESC", (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json(result);
  });
});

// Add new coupon
app.post("/coupons", (req, res) => {
  const { code, discount_amount, min_amount, expiry_date, is_active } = req.body;

  // Check if coupon code already exists
  db.query("SELECT * FROM coupons WHERE code = ?", [code.toUpperCase()], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    
    if (result.length > 0) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    db.query(
      "INSERT INTO coupons (code, discount_amount, min_amount, expiry_date, is_active) VALUES (?, ?, ?, ?, ?)",
      [code.toUpperCase(), discount_amount || 0, min_amount || 0, expiry_date || null, is_active ? 1 : 0],
      (err, result) => {
        if (err) return res.status(500).json({ message: "DB Error" });
        res.json({ message: "Coupon Added", couponId: result.insertId });
      }
    );
  });
});

// Update coupon
app.put("/coupons/:id", (req, res) => {
  const { id } = req.params;
  const { code, discount_amount, min_amount, expiry_date, is_active } = req.body;

  // Validate required fields
  if (!code) {
    return res.status(400).json({ message: "Coupon code is required" });
  }

  // Handle empty expiry_date string
  const expiryDateValue = (expiry_date && expiry_date.trim() !== '') ? expiry_date : null;

  db.query(
    "UPDATE coupons SET code = ?, discount_amount = ?, min_amount = ?, expiry_date = ?, is_active = ? WHERE id = ?",
    [code.toUpperCase(), discount_amount || 0, min_amount || 0, expiryDateValue, is_active ? 1 : 0, id],
    (err, result) => {
      if (err) {
        console.error("Update coupon error:", err);
        return res.status(500).json({ message: "DB Error: " + err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Coupon not found" });
      }
      res.json({ message: "Coupon Updated" });
    }
  );
});

// Toggle coupon status
app.put("/coupons/:id/toggle", (req, res) => {
  const { id } = req.params;
  db.query("UPDATE coupons SET is_active = NOT is_active WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json({ message: "Coupon status toggled" });
  });
});

// Delete coupon
app.delete("/coupons/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM coupons WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json({ message: "Coupon Deleted" });
  });
});

// Validate coupon (for checkout)
app.post("/coupons/validate", (req, res) => {
  const { code, amount, user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // First, check if coupon exists and is valid
  db.query(
    "SELECT * FROM coupons WHERE code = ? AND is_active = 1 AND (expiry_date IS NULL OR expiry_date >= CURDATE())",
    [code.toUpperCase()],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB Error" });
      
      if (result.length === 0) {
        return res.status(400).json({ message: "Invalid or expired coupon" });
      }

      const coupon = result[0];
      
      // Check minimum order amount
      if (amount < coupon.min_amount) {
        return res.status(400).json({ message: `Minimum order amount is ₹${coupon.min_amount}` });
      }

      // Check if user has already used this coupon
      db.query(
        "SELECT * FROM coupon_usage WHERE user_id = ? AND coupon_id = ?",
        [user_id, coupon.id],
        (err2, usageResult) => {
          if (err2) return res.status(500).json({ message: "DB Error" });

          if (usageResult.length > 0) {
            return res.status(400).json({ message: "Coupon already used" });
          }

          // Use fixed rupee discount amount
          const discount = Number(coupon.discount_amount) || 0;

          // Record coupon usage
          db.query(
            "INSERT INTO coupon_usage (user_id, coupon_id) VALUES (?, ?)",
            [user_id, coupon.id],
            (err3) => {
              if (err3) {
                console.error("Error recording coupon usage:", err3);
                // Continue even if recording fails, but log the error
              }

              res.json({
                valid: true,
                discount: discount,
                message: `Coupon applied! You save ₹${discount}`
              });
            }
          );
        }
      );
    }
  );
});

// --------------------------------------------
// 3️⃣ ADMIN REGISTRATION & LOGIN
// --------------------------------------------

// Check if admin exists (for showing register or login)
app.get("/admin/check", (req, res) => {
  db.query("SELECT COUNT(*) as count FROM admins", (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ adminExists: result[0].count > 0 });
  });
});

// Register new admin (ONE TIME ONLY)
app.post("/admin/register", (req, res) => {
  const { username, email, country, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required" });
  }

  // Check if ANY admin already exists (one-time registration)
  db.query("SELECT COUNT(*) as count FROM admins", (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result[0].count > 0) {
      return res.status(400).json({ message: "Admin already registered. Only one admin allowed." });
    }

    // Insert new admin
    db.query(
      "INSERT INTO admins (username, email, country, password) VALUES (?, ?, ?, ?)",
      [username, email, country || '', password],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Registration failed" });
        res.json({ message: "Admin registration successful", adminId: result.insertId });
      }
    );
  });
});

// Login admin
app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.query(
    "SELECT * FROM admins WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const admin = result[0];
      res.json({
        message: "Login successful",
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email
        }
      });
    }
  );
});

// Forgot Password - Generate reset token and send email
app.post("/admin/forgot-password", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  db.query("SELECT * FROM admins WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.length === 0) {
      return res.status(404).json({ message: "Admin with this email not found" });
    }

    // Generate a simple reset token (6 digit code)
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save token to database
    db.query(
      "UPDATE admins SET reset_token = ?, token_expiry = ? WHERE email = ?",
      [resetToken, tokenExpiry, email],
      (err) => {
        if (err) return res.status(500).json({ message: "Failed to generate reset token" });

        // In production, send email here using nodemailer
        // For now, we'll return the token (for testing)
        console.log(`Password Reset Code for ${email}: ${resetToken}`);
        
        res.json({ 
          message: "Password reset code sent to your email",
          // Remove this in production - only for testing
          resetCode: resetToken 
        });
      }
    );
  });
});

// Reset Password with token
app.post("/admin/reset-password", (req, res) => {
  const { email, resetCode, newPassword } = req.body;

  if (!email || !resetCode || !newPassword) {
    return res.status(400).json({ message: "Email, reset code, and new password are required" });
  }

  db.query(
    "SELECT * FROM admins WHERE email = ? AND reset_token = ? AND token_expiry > NOW()",
    [email, resetCode],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (result.length === 0) {
        return res.status(400).json({ message: "Invalid or expired reset code" });
      }

      // Update password and clear token
      db.query(
        "UPDATE admins SET password = ?, reset_token = NULL, token_expiry = NULL WHERE email = ?",
        [newPassword, email],
        (err) => {
          if (err) return res.status(500).json({ message: "Failed to reset password" });
          res.json({ message: "Password reset successful. Please login with your new password." });
        }
      );
    }
  );
});

// --------------------------------------------
// 4️⃣ USER REGISTRATION & LOGIN
// --------------------------------------------

// Register new user
app.post("/register", (req, res) => {
  const { username, email, country, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required" });
  }

  // Check if user already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Insert new user
    db.query(
      "INSERT INTO users (username, email, country, password) VALUES (?, ?, ?, ?)",
      [username, email, country || '', password],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Registration failed" });
        res.json({ message: "Registration successful", userId: result.insertId });
      }
    );
  });
});

// Login user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = result[0];
      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          country: user.country
        }
      });
    }
  );
});

// --------------------------------------------
// 4️⃣ CART SYSTEM
// --------------------------------------------

// Add to cart
app.post("/cart/add", (req, res) => {
  const { user_id, product_id, qty } = req.body;

  if (!user_id || !product_id || !qty)
    return res.status(400).json({ message: "user_id, product_id, qty required" });

  db.query("SELECT * FROM carts WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err, result) => {
    if (err) return res.status(500).json({ error: "DB error" });

    if (result.length > 0) {
      db.query("UPDATE carts SET qty = qty + ? WHERE user_id = ? AND product_id = ?", [qty, user_id, product_id], () => {
        res.json({ message: "Cart updated successfully" });
      });
    } else {
      db.query("INSERT INTO carts (user_id, product_id, qty) VALUES (?, ?, ?)", [user_id, product_id, qty], () => {
        res.json({ message: "Added to cart" });
      });
    }
  });
});

// Get cart
app.get("/cart/:user_id", (req, res) => {
  db.query(
    `SELECT c.id AS cart_id, c.qty,
            p.id AS product_id, p.title, p.price, p.image
     FROM carts c JOIN products p ON c.product_id = p.id 
     WHERE c.user_id = ?`,
    [req.params.user_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json(result);
    }
  );
});

// Remove from cart
app.delete("/cart/remove/:id", (req, res) => {
  db.query("DELETE FROM carts WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json({ message: "Item removed from cart" });
  });
});

// Update cart qty
app.post("/cart/update", (req, res) => {
  const { cart_id, qty } = req.body;
  db.query("UPDATE carts SET qty = ? WHERE id = ?", [qty, cart_id], () => {
    res.json({ message: "Quantity updated" });
  });
});

// --------------------------------------------------------------------
// ⚡ STRIPE CHECKOUT - CREATE SESSION API
// --------------------------------------------------------------------
// app.post("/create-checkout-session", async (req, res) => {
//   const { amount } = req.body;

//   if (!amount) return res.status(400).json({ error: "Amount is required" });

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: { name: "Order Payment" },
//             unit_amount: amount * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: "http://localhost:3000/thank-you",
//       cancel_url: "http://localhost:3000/checkout",
//     });

//     return res.json({ url: session.url });  // <<-- Only this will fix issue

//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });






// sahi code hai

// app.post("/create-checkout-session", async (req, res) => {
//   const { amount } = req.body;

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     billing_address_collection: "required",  

//     customer_creation: "always",
//     customer_email: "guest@example.com",     
    
//     metadata: {
//       name: "Guest User",                   
//       address: "India Default Address"
//     },

//     line_items: [{
//       price_data: {
//         currency: "inr",
//         product_data: { name: "Checkout Payment" },
//         unit_amount: amount * 100,
//       },
//       quantity: 1,
//     }],

//     mode: "payment",
//     success_url: "http://localhost:3000/thank-you",
//     cancel_url: "http://localhost:3000/checkout"
//   });

//   res.json({ url: session.url });
// });

// old_backup
// app.post("/create-checkout-session", async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],

//       billing_address_collection: "required",

//       customer_creation: "always",
//       customer_email: "guest@example.com",

//       metadata: {
//         name: "Guest User",
//         address: "India Default Address"
//       },

//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: { name: "Checkout Payment" },
//             unit_amount: Math.round(amount * 100),
//           },
//           quantity: 1,
//         },
//       ],

//       mode: "payment",

//       // 🔥 VERY IMPORTANT CHANGE
//       success_url: "http://localhost:3000/thank-you?session_id={CHECKOUT_SESSION_ID}",
//       cancel_url: "http://localhost:3000/checkout",
//     });

//     res.json({ url: session.url });
//   } catch (err) {
//     console.error("Stripe error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

app.post("/create-checkout-session", async (req, res) => {
  const { amount, user_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer_creation: "always",

      line_items: [{
        price_data: {
          currency: "inr",
          product_data: { name: "Order Payment" },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],

      mode: "payment",

      success_url: `http://localhost:3000/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/checkout",
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// --------------------------------------------
// START SERVER
// --------------------------------------------
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
