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
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg overflow-hidden mt-10">
          <form onSubmit={updateProduct} className="p-6">
            <h2 className="text-2xl font-bold mb-5">Update Product</h2>
            <Select
              placeholder="Select Category"
              showSearch
              value={category}
              onChange={setCategory}
              className="w-full mb-5"
            >
              {categories.map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
            <div className="mb-5">
              <label className="block text-gray-700">Upload Image</label>
              <div className="flex items-center mt-2">
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="hidden"
                  id="upload-photo"
                />
                <label
                  htmlFor="upload-photo"
                  className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded"
                >
                  {photo ? photo.name : "Choose File"}
                </label>
              </div>
              <div className="mt-5">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product"
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <img
                    src={`${BACKEND_URL}/api/products/get-photo/${product._id}`}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                )}
              </div>
            </div>
            <div className="mb-5">
              <input
                type="text"
                className="w-full border-2 p-2 rounded"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <input
                type="text"
                className="w-full border-2 p-2 rounded"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <input
                type="text"
                className="w-full border-2 p-2 rounded"
                value={price}
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <input
                type="text"
                className="w-full border-2 p-2 rounded"
                value={quantity}
                placeholder="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <Select
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="w-full"
                value={shipping}
                onChange={(value) => setShipping(value)}
              >
                <Option value="true">Yes</Option>
                <Option value="false">No</Option>
              </Select>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="mr-2">
                Update Product
              </Button>
              <Link to="/dashboard/products">
                <Button variant="secondary">Cancel</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
