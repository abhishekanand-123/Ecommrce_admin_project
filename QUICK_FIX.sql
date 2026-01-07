-- QUICK FIX: Run this SQL in phpMyAdmin to add the missing column
-- Copy and paste this into the SQL tab in phpMyAdmin

ALTER TABLE coupons ADD COLUMN discount_amount DECIMAL(10, 2) DEFAULT 0;

