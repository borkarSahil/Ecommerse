import fs from "fs";
import Product from "../models/ProductModels.js";
import { response } from "express";

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

    return res
      .status(200)
      .send({ message: "Success", products, success: true });
  } catch (error) {
    console.log("Creating Product error: " + error + error.message);
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
      success: true,
    });
  } catch (error) {
    console.log("Creating Product error: " + error);
    res.status(400).send({
      message: "Creating Product error",
      error: error,
      success: false,
    });
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
      success: true,
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
      return res
        .status(400)
        .send({ message: "Product deleting error", success: true });
    }
  } catch (error) {
    console.log("Creating Product error: " + error);
    res
      .status(400)
      .send({
        message: "Creating Product error",
        error: error,
        success: false,
      });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    const { id } = req.params;

    const products = await Product.findById(id);
    console.log("P : ", products);

    products.name = name;
    products.description = description;
    products.price = price;
    products.category = category; // Assuming category is just an ID
    products.quantity = quantity;
    products.shipping = shipping === "true"; // Convert string to boolean

    console.log("product : ", products.name);
    console.log("Id in backend: " + id);
    console.log(
      "Updating Product backend: " +
        name +
        " " +
        description +
        " " +
        price +
        " " +
        category +
        " " +
        quantity +
        " " +
        shipping
    );

    if (!products) {
      return res.status(404).send({ message: "Product not found" });
    }
    // console.log("here 1");

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    // console.log("here 2");

    await products.save();
    console.log("pproduct", products);
    return res
      .status(200)
      .send({ message: "Success", products, success: true });
  } catch (error) {
    console.log("Updating Product error: " + error);
    return res.status(400).send({
      message: "Updating Product error",
      error: error,
      success: false,
    });
  }
};

export const getProductByFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await Product.find(args);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Filter Product error: " + error);
    return res.status(400).send({
      message: "Filter Product error",
      error: error,
      success: false,
    });
  }
};

export const productCountController = async(req, res) => { 
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total
    });

  } catch (error) {
    console.log("Product Count error: " + error);
    return res.status(400).send({
      message: "Product Count error",
      error: error,
      success: false,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

      res.status(400).send({
        message: "Product List successfull",
        products,
        success: true,
      });
  } catch (error) {
    console.log("Product List error: " + error);
    return res.status(400).send({
      message: "Product List error",
      error: error,
      success: false,
    });
  }
};


export const searchController = async (req, res) => { 
  try {
    const { keyword } = req.params;
    const result = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");

    res.json(result);

  } catch (error) {
    console.log("searchController error: " + error);
    return res.status(400).send({
      message: "SearchController error",
      error: error,
      success: false,
    });
  }
}