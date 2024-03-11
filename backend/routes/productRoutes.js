import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getProductByIdController,
  getPhotoByIdController,
  deleteByIdController,
  updateProductController,
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

router.get("/get-products", getProductController);

router.get("/get-products/:id", getProductByIdController);

router.get("/get-photo/:id", getPhotoByIdController);

router.delete("/delete-product/:id", deleteByIdController);


router.put(
  "/update-product/:id",
  // authenticate,
  // authorizeAdmin,
  formidable(),
  updateProductController
);

export default router;
