import Category from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        message: "Name is required",
      });
    }

    const existCategory = await Category.findOne({ name });
    if (existCategory) {
      return res.status(400).send({
        message: "Category already exists",
      });
    }

    const newCategory = await new Category({ name }).save();

    return res.status(200).send({
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    console.log("Category error: " + error);
    return res.status(500).send({
      error: error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({
        message: "Name is required",
      });
    }

    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      {
        new: true,
      }
    );
    return res.status(200).send({
      message: "Category Updated successfully",
      category,
    });
  } catch (error) {
    console.log("Update Category error: " + error);
    return res.status(500).send({
      error: error,
    });
  }
};

export const getAllCategoryController = async (req, res) => {
  try {
    const data = await Category.find({});
    if (!data) {
      return res.status(400).send({
        message: "Category Not Found",
      });
    }

    return res.status(200).send({
      message: "Categories Found",
      data,
    });
  } catch (error) {
    console.log("Getting Category error: " + error);
    return res.status(500).send({
      error: error,
    });
  }
};

export const getOneCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const data = await Category.findOne({ _id: id });
    // console.log(data);
    if (!data) {
      return res.status(400).send({
        message: "Category Not Found",
      });
    }

    return res.status(200).send({
      message: "Category Found",
      data,
    });
  } catch (error) {
    console.log("Getting Category error: " + error);
    return res.status(500).send({
      error: error,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    //    console.log(id);
    const data = await Category.findByIdAndDelete({ _id: id });
    //    console.log(data);
    if (!data) {
      return res.status(400).send({
        message: "Category Not Found",
      });
    }

    return res.status(200).send({
      message: "Category Deleted",
      data,
    });
  } catch (error) {
    console.log("Deleting Category error: " + error);
    return res.status(500).send({
      error: error,
    });
  }
};
