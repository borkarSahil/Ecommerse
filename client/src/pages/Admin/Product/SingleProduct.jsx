import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../../helper/constants";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";

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
      <div className="m-2">
        <img
          src={`${BACKEND_URL}/api/products/get-photo/${product._id}`}
          alt={product.name}
        />
        <h3>Name : {product.name}</h3>
        <h3>Description : {product.description}</h3>
        <h3>Price : {product.price}</h3>

        <h3>Quantity : {product.quantity}</h3>
        <h3>Shipping : {product.shipping ? "true" : "false"}</h3>
      </div>

      <div className="justify-center text-center">
        <Link to={`/dashboard/products/update/${product._id}`}>
          <Button className="m-4">Edit</Button>
        </Link>

        <Button onClick={deleteProduct} className="m-4" variant="destructive">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default SingleProduct;
