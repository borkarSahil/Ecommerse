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
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <label className="block mb-4">
        <span className="text-gray-700">Name:</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Category"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </label>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
