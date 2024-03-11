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
    <form onSubmit={handleEdit}>
      <label>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter new category name"
          required
        />
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CategoryEdit;
