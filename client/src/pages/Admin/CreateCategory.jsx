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
      <div>
        <AdminMenu />
      </div>

      <div>CreateCategory</div>
      <CategoryForm getAllCategory={getAllCategory} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {category?.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>
                <Button onClick={() => modalAct(item)}>Edit</Button>
              </td>
              <td>
                <Button onClick={() => modalDel(item)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
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
