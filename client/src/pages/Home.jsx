import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { BACKEND_URL } from "../helper/constants";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/category/get-category`
        );
        setCategories(data?.data);
      } catch (error) {
        console.log("Error fetching categories", error);
        toast.error("Error fetching categories");
        console.log("h");
      }
    };
    getCategories();

    const getAllProducts = async (req, res) => {
      try {
        // setLoading(true);
        const { data } = await axios.get(
          `${BACKEND_URL}/api/products/get-products`
        );
        // setLoading(false);

        setProducts(data.data);
        console.log("Data", products);
      } catch (error) {
        console.log("Fetching products error", error);
        toast.error(error);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white p-10 text-center rounded-lg mb-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to ElectroShop</h1>
        <p className="text-lg">Your one-stop shop for the latest electronics</p>
        <Link to="/shop">
          <button className="mt-6 bg-white text-blue-900 font-semibold py-2 px-4 rounded-lg">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Categories Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category._id}`}
              className="block bg-blue-900 text-white p-4 rounded-lg text-center"
            >
              <span className="text-lg font-semibold">{category.name}</span>
            </Link>
          ))}
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <img
                  // className="w-full h-48 object-cover my-4"
                  src={`${BACKEND_URL}/api/products/get-photo/${product._id}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-4">${product.price}</p>
                <Link to={`/product/${product._id}`}>
                  <button className="bg-blue-900 text-white py-2 px-4 rounded-lg w-full">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
