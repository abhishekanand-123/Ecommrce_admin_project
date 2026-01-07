-- Migration script to update coupons table and add coupon_usage tracking
-- Run this SQL script in your MySQL database (react_registration)

-- Step 1: Add discount_amount column to coupons table
-- If you get an error saying column already exists, that's fine - just continue
ALTER TABLE coupons ADD COLUMN discount_amount DECIMAL(10, 2) DEFAULT 0;

-- Step 2: Create coupon_usage table to track which users have used which coupons
CREATE TABLE IF NOT EXISTS coupon_usage (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  coupon_id INT NOT NULL,
  used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_coupon (user_id, coupon_id)
);

-- Step 3: Create indexes for faster lookups
-- If you get an error saying index already exists, that's fine - just continue
CREATE INDEX idx_coupon_usage_user ON coupon_usage(user_id);
CREATE INDEX idx_coupon_usage_coupon ON coupon_usage(coupon_id);

