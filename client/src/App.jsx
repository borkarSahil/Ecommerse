import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { Route, Routes } from "react-router-dom";

// Routes
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

import Home from "./pages/Home.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Layout from "./Compo/Layout/Layout.jsx";
import Profile from "./pages/User/Profile.jsx";
import Dashboard from "./pages/User/Dashboard.jsx";
import AdminRoute from "./Compo/Routes/AdminRoute.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import ManageUsers from "./pages/Admin/ManageUsers.jsx";
import UserProfile from "./pages/Admin/ManageUsers/UserProfile.jsx";
import Orders from "./pages/Admin/ManageUsers/Orders.jsx";
import Products from "./pages/Admin/Product/Products.jsx";
import SingleProduct from "./pages/Admin/Product/SingleProduct.jsx";
import UpdateProduct from "./pages/Admin/Product/UpdateProduct.jsx";
import Search from "./pages/Search.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop/Shop.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        {/*  SHOP */}
        <Route path="/shop" element={<Shop />} />


        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {/*
        <Route path="/dashboard" element={<Private />}>
          <Route path="" element={<Dashboard />} />
        </Route>
*/}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Products Route */}
        <Route path="/dashboard/products" element={<Products />} />
        <Route path="/dashboard/products/:id" element={<SingleProduct />} />
        <Route
          path="/dashboard/products/update/:id"
          element={<UpdateProduct />}
        />

        {/* Admin Routes */}
        <Route path="/admin/create-categories" element={<CreateCategory />} />
        <Route path="/admin/create-products" element={<CreateProduct />} />

        {/* Manage Users Routes */}
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/dashboard/user/profile" element={<UserProfile />} />
        <Route path="/dashboard/user/orders" element={<Orders />} />

        {/*Search*/}
        <Route path="/search" element={<Search />} />

        {/*Product Details*/}
        <Route path="/product-details/:slug" element={<ProductDetails />} />

        {/*Cart*/}
        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;

// Remove concurrently
