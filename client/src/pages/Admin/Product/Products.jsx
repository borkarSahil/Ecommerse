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
      Products :
      <div>
        {products?.map((p) => (
          <Link to={`/dashboard/products/${p._id}`}>
            <div className="m-5 border-2">
              <h2>{p.name}</h2>
              <h2>{p.description}</h2>
              <h2>{p.price}</h2>
              <h2>{p.quantity}</h2>
              <img
                src={`${BACKEND_URL}/api/products/get-photo/${p._id}`}
                alt={p.name}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
