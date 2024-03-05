import express from "express";
import {
  createUser,
  loginUser,
  logOutUser,
  getAllUsers,
  getCurrentUser,
  updateCurrentUserProfile,
  deleteUser,
  getUserById,
  updateUserById,
} from "../controllers/userControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Sign Up / In / Log Out
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logOutUser);

// Profile
router
  .route("/profile")
  .get(authenticate, getCurrentUser)
  .put(authenticate, updateCurrentUserProfile);

//   Delete
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUser)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById)

export default router;
