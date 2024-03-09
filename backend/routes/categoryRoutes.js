import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  getOneCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post(
  "/create-category",
  // authenticate,
  // authorizeAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  // authenticate,
  // authorizeAdmin,
  updateCategoryController
);

router.get('/get-category', getAllCategoryController);

router.get("/get-one-category/:id", getOneCategoryController);

router.delete(
  "/delete-category/:id",
  // authenticate,
  // authorizeAdmin,
  deleteCategoryController
);

export default router;
