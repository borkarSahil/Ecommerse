import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "../../../components/ui/button";
import { BACKEND_URL } from "../../../helper/constants";

const CategoryEdit = ({ selectedCategory, getAllCategory, handleOk }) => {
  const [newCategoryName, setNewCategoryName] = useState(selectedCategory.name);
  // console.log(selectedCategory.name);

  useEffect(() => {
    setNewCategoryName(selectedCategory.name);
  }, [selectedCategory]);


  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        toast.error("Token not found. Please log in again.");
      }

      const id = selectedCategory._id;
      const { data } = await axios.put(
        `${BACKEND_URL}/api/category/update-category/${id}`,
        { name: newCategoryName }
      );

      if (data.success) {
        handleOk();
        getAllCategory();
        toast.success("Category Updated successfully");
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Update error", error);
    }
  };

  return (
    <form
      onSubmit={handleEdit}
      className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="categoryName">
          New Category Name
        </label>
        <input
          id="categoryName"
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter new category name"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CategoryEdit;
