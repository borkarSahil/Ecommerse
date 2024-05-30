import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../../helper/constants";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import AdminMenu from "../AdminMenu";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const navigate = useNavigate();

  const getProductById = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/products/get-products/${id}`
      );
    //   console.log("Data ",data.data);
      if (data.success) {
        setProduct(data.data);
      } 
    //   console.log("Product ",product);
    } catch (error) {
      toast.error(error.message);
      console.log("Single Product Error: " + error);
    }
  };

  const deleteProduct = async (req, res) => { 
    try {
        const { data } = await axios.delete(
          `${BACKEND_URL}/api/products/delete-product/${id}`
        );

        if (data?.success) {
          toast.success("Delete Product Successfully");
        }
        navigate("/dashboard/products");
    } catch (error) {
        toast.error(error.message);
        console.log("Delete Product Error: " + error);
    }
  }

  useEffect(() => {
    getProductById();
  }, []);
  return (
    <div>
      <AdminMenu />
       <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-lg w-full">
        <img
          src={`${BACKEND_URL}/api/products/get-photo/${product._id}`}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
          <p className="text-gray-700 mb-2">Description: {product.description}</p>
          <p className="text-gray-900 font-semibold mb-2">Price: ${product.price}</p>
          <p className="text-gray-600 mb-2">Quantity: {product.quantity}</p>
          <p className="text-gray-600 mb-2">Shipping: {product.shipping ? "Yes" : "No"}</p>
        </div>
        <div className="p-6 flex justify-between">
          <Link to={`/dashboard/products/update/${product._id}`}>
            <Button className="mr-2">Edit</Button>
          </Link>
          <Button onClick={deleteProduct} variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SingleProduct;
