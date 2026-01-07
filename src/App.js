import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Website Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";

// Ecommerce Pages
import ProductList from "./components/ProductList";
import ProductDetail from "./pages/ProductDetail";
import LoginUser from "./pages/Login_user";
import RegisterUser from "./pages/Register_user";
import CartPage from "./pages/CartPage";
import ViewProducts from "./pages/ViewProducts";
import OrderPage from "./pages/OrderPage";

// Admin
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Buttons from "./admin/pages/ui-features/Buttons";
import Dropdowns from "./admin/pages/ui-features/Dropdowns";
import Typography from "./admin/pages/ui-features/Typography";
import FormElements from "./admin/pages/forms/FormElements";
import ChartJs from "./admin/pages/charts/ChartJs";
import BasicTables from "./admin/pages/tables/BasicTables";
import FontAwesome from "./admin/pages/icons/FontAwesome";
import AdminLogin from "./admin/pages/samples/Login";
import AdminRegister from "./admin/pages/samples/Register";
import AdminForgotPassword from "./admin/pages/samples/ForgotPassword";
import ProductManagement from "./admin/pages/products/ProductManagement";
import CouponManagement from "./admin/pages/coupons/CouponManagement";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Auth Routes (Standalone - No Sidebar) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

        {/* Admin Routes (With Layout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="coupons" element={<CouponManagement />} />
          <Route path="buttons" element={<Buttons />} />
          <Route path="dropdowns" element={<Dropdowns />} />
          <Route path="typography" element={<Typography />} />
          <Route path="form-elements" element={<FormElements />} />
          <Route path="charts" element={<ChartJs />} />
          <Route path="tables" element={<BasicTables />} />
          <Route path="icons" element={<FontAwesome />} />
        </Route>

        {/* Website Routes */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="services" element={<Services />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="login" element={<LoginUser />} />
                  <Route path="register" element={<RegisterUser />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="thank-you" element={<ThankYou />} />
                  <Route path="products" element={<ProductList />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="view-products" element={<ViewProducts />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="orders" element={<OrderPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
