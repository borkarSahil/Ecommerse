import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../helper/constants";
import { Button } from "../../components/ui/button";
import CategoryForm from "../../Compo/Category/CategoryForm";

import { Modal } from "antd";
import CategoryEdit from "./Category/CategoryEdit";
import CategoryDelete from "./Category/CategoryDelete";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isDelete, setIsDelete] = useState(false);

  const modalAct = (c) => {
    setIsModalOpen(true);
    setSelectedCategory(c);
    setIsDelete(false);
    // console.log("C",selectedCategory);
  };

  const modalDel = (c) => {
    setIsModalOpen(true);
    setSelectedCategory(c);
    setIsDelete(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/category/get-category`
      );
      if (!data) {
        toast.error("No Category found");
      } else {
        setCategory(data.data);
      }
    } catch (error) {
      console.log("Categories error", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div>
      <AdminMenu />
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="my-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Create Category</h2>
          <CategoryForm getAllCategory={getAllCategory} />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
              </tr>
            </thead>
            <tbody>
              {category?.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-left flex justify-between items-center">
                    <span>{item.name}</span>
                    <span className="space-x-2">
                      <Button onClick={() => modalAct(item)}>Edit</Button>
                      <Button onClick={() => modalDel(item)}>Delete</Button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {isDelete ? (
            <CategoryDelete
              selectedCategory={selectedCategory}
              getAllCategory={getAllCategory}
            />
          ) : (
            <CategoryEdit
              selectedCategory={selectedCategory}
              getAllCategory={getAllCategory}
              handleOk={handleOk}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CreateCategory;
