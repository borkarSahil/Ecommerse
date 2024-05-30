import React from "react";
import { Button } from "../../../components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "../../../helper/constants";
import { toast } from "react-toastify";

const CategoryDelete = ({ selectedCategory, getAllCategory }) => {
  const handleDelete = async (e) => {
    // e.preventDefault();
    const id = selectedCategory._id;
    console.log(id);
    try {
      const { data } = await axios.delete(
        `${BACKEND_URL}/api/category/delete-category/${id}`
      );
      console.log(data);
      if (data.success) {
        getAllCategory();
        toast.success("Category Deleted successfully");
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Categories error", error);
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Delete Category</h2>
      <p className="mb-4">
        Are you sure you want to delete the category:{" "}
        <span className="font-bold">{selectedCategory.name}</span>?
      </p>
      <div className="flex justify-end">
        <Button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CategoryDelete;
