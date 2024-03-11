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
    <div>
      <div>{selectedCategory.name}</div>
      <div>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default CategoryDelete;
