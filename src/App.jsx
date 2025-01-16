import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProductList from "./components/ProductList";
import AllProductList from "./components/AllProductList";
import Dashboard from "./components/dashboard";
import ProfilePage from "./components/Profile";
import AboutPage from "./About";
import ShopPage from "./Shop";
import LoginPage from "./Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/allproducts" element={<AllProductList />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
