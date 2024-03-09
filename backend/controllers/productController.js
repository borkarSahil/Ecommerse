import fs from "fs";
import Product from "../models/ProductModels.js";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (!name || !description || !price || !category || !quantity || !photo) {
      res.status(400).send({ message: "Provide all fields", error: error });
    }

    const products = new Product({ ...req.fields });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    return res.status(200).send({ message: "Success", products });
  } catch (error) {
    console.log("Creating Product error: " + error);
    res.status(400).send({ message: "Creating Product error", error: error });
  }
};

export const getProductController = async (req, res) => {
  try {
    const data = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    if (!data) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).send({
      message: "Product found successfully",
      data,
      total: data.length,
    });
  } catch (error) {
    console.log("Creating Product error: " + error);
    res.status(400).send({ message: "Creating Product error", error: error });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findOne({ _id: id })
      .populate("category")
      .select("-photo");
    if (!data) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).send({
      message: "Product found successfully",
      data,
    });
  } catch (error) {
    console.log("Creating Product error: " + error);
    res.status(400).send({ message: "Creating Product error", error: error });
  }
};

export const getPhotoByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const productPhoto = await Product.findById(id).select("photo");

    if (productPhoto && productPhoto.photo.data) {
      res.set("Content-type", productPhoto.photo.contentType);
      return res.status(200).send(productPhoto.photo.data);
    }
  } catch (error) {
    console.log("Creating Product error: " + error);
    res.status(400).send({ message: "Creating Product error", error: error });
  }
};

export const deleteByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await Product.findByIdAndDelete({ _id: id });

    if (deleteProduct) {
      return res
        .status(200)
        .send({ message: "Product deleted", deleteProduct });
    } else {
      return res.status(400).send({ message: "Product deleting error" });
    }
  } catch (error) {
    console.log("Creating Product error: " + error);
    res.status(400).send({ message: "Creating Product error", error: error });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (!name || !description || !price || !category || !quantity || !photo) {
      res.status(400).send({ message: "Provide all fields", error: error });
    }
    const { id } = req.params;
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (description) updatedFields.description = description;
    if (price) updatedFields.price = price;
    if (category) updatedFields.category = category;
    if (quantity) updatedFields.quantity = quantity;
    if (shipping) updatedFields.shipping = shipping;
    // console.log("id",id);
    const products = await Product.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    return res.status(200).send({ message: "Success", products });
  } catch (error) {
    console.log("Updating Product error: " + error);
    res.status(400).send({ message: "Updating Product error", error: error });
  }
};
