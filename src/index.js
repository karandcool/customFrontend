import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import "./index.css";

import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Register, Checkout, PageNotFound, Customise, Orders } from "./pages"
import Categories from './pages/Categories';
import { CategoryItems } from './components';
import Auth from './components/Auth';
import ScrollToTop from './components/scrollTop';
import OrderCompleted from './pages/orderCompleted';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/category/:id" element={<CategoryItems />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Auth><Checkout /></Auth>} />
        <Route path="/orders" element={<Auth><Orders /></Auth>} />
        <Route path="/order-completed/:id" element={<Auth><OrderCompleted /></Auth>} />

        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
        <Route path="/design-customise/" element={<Customise />} />

      </Routes>
    </Provider>
  </BrowserRouter>
);