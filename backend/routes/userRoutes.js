import express from "express";
import {
  registerController,
  loginController,
  test,
} from "../controllers/userControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Sign Up / In / Log Out
router.post("/register", registerController);
router.post("/login", loginController);

router.get("/test",authenticate,authorizeAdmin, test);

// Dashboard
router.get("/admin-auth", authenticate,authorizeAdmin, (req, res) => {
 res.status(200).send({ok: true});
});

// Profile


//   Delete



export default router;
