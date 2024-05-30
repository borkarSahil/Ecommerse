import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getProductByIdController,
  getPhotoByIdController,
  deleteByIdController,
  updateProductController,
  getProductByFilter,
  productListController,
  productCountController,
  searchController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  // authenticate,
  // authorizeAdmin,
  formidable(),
  createProductController
);

router.get("/get-products", getProductController);

// router.get("/get-products", getProductController);

router.get("/get-products/:id", getProductByIdController);

router.get("/get-photo/:id", getPhotoByIdController);

router.delete("/delete-product/:id", deleteByIdController);

router.post("/filter", getProductByFilter);

router.get("/product-count", productCountController);

router.get('/product-list/:page', productListController);

router.get('/search/:keyword', searchController);

router.put(
  "/update-product/:id",
  // authenticate,
  // authorizeAdmin,
  formidable(),
  updateProductController
);

export default router;
