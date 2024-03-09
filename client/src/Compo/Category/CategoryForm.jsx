import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../helper/constants";

const CategoryForm = ({ getAllCategory }) => {
  const [name, setName] = useState("");

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const token = JSON.parse(localStorage.getItem("auth")).token;
  //     //   console.log(token);
  //       if (!token) {
  //         // Handle case where token is not found in local storage
  //         toast.error("Token not found. Please log in again.");
  //         return;
  //       }

  //       const config = {
  //         headers: {
  //           "Content-type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };
  //       const { data } = await axios.post(
  //         `${BACKEND_URL}/api/category/create-category`,
  //         { name },
  //         config
  //       );
  //       console.log("data", data);

  //       if (data.success) {
  //         toast.success("Category created successfully");
  //       }
  //     } catch (error) {

  //       console.log("Categories creation error", error);
  //       toast.error(error.message);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      // Check if token is available
      // console.log("Token", token);
      if (!token) {
        // Handle case where token is not found in local storage
        toast.error("Token not found. Please log in again.");
        return;
      }

      // Define config only if token is available
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${BACKEND_URL}/api/category/create-category`,
        { name },
        config
      );
      console.log("data", data);

      if (data.success) {
        toast("Category created successfully");
        getAllCategory();
      } else {
        // Handle other response messages or errors
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Categories creation error", error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Category"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CategoryForm;
