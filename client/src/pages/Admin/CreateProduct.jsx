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
      CreateProduct
      <div>
        <div className="m-1 w-72 mt-10 ">
          <Select
            placeholder="Select Category"
            showSearch
            onChange={(value) => {
              setCategory(value);
            }}
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
            {photo && (
              <div className="text-center h-72">
                <img src={URL.createObjectURL(photo)} alt="Product" />
              </div>
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
            >
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
          </div>
        </div>

        <div>
          <Button onClick={createProduct}>Create Product</Button>
        </div>
      </div>
      <div className="m-5 content-center justify-center text-center">
        <Link to="/dashboard/products">
          <Button>Products</Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateProduct;