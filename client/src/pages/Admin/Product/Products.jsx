import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import axios from "axios";
import { BACKEND_URL } from "../../../helper/constants";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/products/get-products`
      );
      //   console.log("data", data.data);
      if (data.success) {
        setProducts(data.data);
        // console.log("products", products[0].name);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.log("Fetching products error", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      <AdminMenu />
      <div className="min-h-screen bg-gray-100 p-5">
        <h1 className="text-2xl font-bold my-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((p) => (
            <Link to={`/dashboard/products/${p._id}`} key={p._id}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={`${BACKEND_URL}/api/products/get-photo/${p._id}`}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{p.name}</h2>
                  <p className="text-gray-700 mb-2">{p.description}</p>
                  <p className="text-gray-900 font-semibold">${p.price}</p>
                  <p className="text-gray-600">Quantity: {p.quantity}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
