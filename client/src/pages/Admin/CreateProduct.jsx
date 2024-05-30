import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import { BACKEND_URL } from "../../helper/constants";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/category/get-category`
      );
      if (!data) {
        toast.error("No Category found");
      } else {
        setCategories(data?.data);
      }
    } catch (error) {
      console.log("Categories error", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const createProduct = async (e) => {
    console.log(
      "pdata : ",
      name,
      description,
      price,
      quantity,
      shipping,
      photo,
      category
    );
    e.preventDefault();
    console.log("category", category);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("shipping", shipping);
      formData.append("photo", photo);

      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      const { data } = await axios.post(
        `${BACKEND_URL}/api/products/create-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard");
      }
      console.log(data.message);
    } catch (error) {
      console.log("Create Product error", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <AdminMenu />
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Create Product</h1>
          <form onSubmit={createProduct}>
            <div className="mb-4">
              <Select
                placeholder="Select Category"
                showSearch
                onChange={(value) => setCategory(value)}
                className="w-full"
              >
                {categories?.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {photo ? photo.name : "Upload Image"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="hidden"
                />
              </label>
              <div className="border border-gray-300 rounded p-2 bg-gray-50">
                <div className="text-center">
                  {photo && (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product"
                      className="mx-auto h-48"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={price}
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={quantity}
                placeholder="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <Select
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="w-full"
                onChange={(value) => setShipping(value)}
              >
                <Option value="true">Yes</Option>
                <Option value="false">No</Option>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Product
            </Button>
          </form>
        </div>
        <div className="text-center mt-5">
          <Link to="/dashboard/products">
            <Button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              View Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
