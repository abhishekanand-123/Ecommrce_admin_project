-- Quick fix: Add discount_amount column to coupons table
-- Run this in your MySQL database (react_registration database

-- Add the discount_amount column
ALTER TABLE coupons ADD COLUMN discount_amount DECIMAL(10, 2) DEFAULT 0;

-- Optional: Copy existing discount_percent values to discount_amount if you have any
-- (This assumes you want to migrate old percentage-based discounts to fixed amounts)
-- UPDATE coupons SET discount_amount = (discount_percent * 100) WHERE discount_percent > 0;

-- If you want to keep both columns for now, that's fine
-- If you want to remove discount_percent later, you can run:
-- ALTER TABLE coupons DROP COLUMN discount_percent;
-- ALTER TABLE coupons DROP COLUMN max_discount;

