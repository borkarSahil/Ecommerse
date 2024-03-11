import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";

import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../../helper/constants";
import AdminMenu from "../AdminMenu";
import { Button } from "../../../components/ui/button";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  console.log("_id: " + id);
  const [product, setProduct] = useState("");

  //    States
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");

  const getProductById = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/products/get-products/${id}`
      );
      //   console.log("Data ", data.data);
      if (data.success) {
        setProduct(data.data);

        // Set Initial value of states
        setName(data.data?.name);
        consofrole.log("Names", name);
        setPrice(data.data?.price);
        setDescription(data.data?.description);
        setQuantity(data.data?.quantity);
        setShipping(data.data?.shipping);
        setCategory(data.data?.category._id);
      }
      console.log("Product C", category);
    } catch (error) {
      toast.error(error.message);
      console.log("Single Product Error: " + error);
    }
  };

  useEffect(() => {
    getProductById();
    console.log(product.name);
  }, []);

  const [categories, setCategories] = useState([]);
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      console.log(
        "product data : ",
        name,
        description,
        price,
        quantity,
        shipping,
        photo,
        category
      );
      //   e.preventDefault();
      console.log("category", category);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("shipping", shipping);
      photo && formData.append("photo", photo);

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      console.log(`${BACKEND_URL}/api/products/update-product/${id}`);

      const { data } = await axios.put(
        `${BACKEND_URL}/api/products/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("DATA", data);

      if (data.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Update Product error", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <AdminMenu />
      updateProduct
      <div>
        <div className="m-1 w-72 mt-10 ">
          <Select
            placeholder="Select Category"
            showSearch
            onChange={(value) => {
              setCategory(value);
            }}
            value={category}
          >
            {categories?.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>

          <div className="m-10 border-2 border-slate-900 border-spacing-3 bg-sky-100 p-2 rounded">
            <label>
              {photo ? photo.name : "Upload Image"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>

          <div className="m-5">
            {photo ? (
              <div className="text-center h-72">
                <img src={URL.createObjectURL(photo)} alt="Product" />
              </div>
            ) : (
              <img
                src={`${BACKEND_URL}/api/products/get-photo/${product._id}`}
                alt={product.name}
              />
            )}
          </div>

          <div className="m-2 ">
            <input
              type="text"
              className="border-2"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="m-2 ">
            <input
              type="text"
              className="border-2"
              value={description}
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="m-2 ">
            <input
              type="text"
              className="border-2"
              value={price}
              placeholder="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="m-2 ">
            <input
              type="text"
              className="border-2"
              value={quantity}
              placeholder="quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="m-2 ">
            <Select
              placeholder="Select Shipping "
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setShipping(value);
              }}
              value={shipping ? "Yes" : "No"}
            >
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
          </div>
        </div>

        <div>
          <Button onClick={updateProduct}>Update Product</Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
