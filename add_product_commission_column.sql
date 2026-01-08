-- Migration script to add commission_percentage column to products table
-- Run this SQL script in your MySQL database (react_registration)

-- Add commission_percentage column to products table
-- This allows each product to have its own commission rate
ALTER TABLE products ADD COLUMN commission_percentage DECIMAL(5, 2) DEFAULT NULL;

-- Note: NULL means use global commission rates, otherwise use this product-specific rate

