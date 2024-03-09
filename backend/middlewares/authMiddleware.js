import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    console.log("NToken", token);
     console.log("Decoded token:", jwt.decode(token)); 
    const decoded = jwt.verify(
      // token.replace("Bearer ", ""),
      token,
      process.env.JWT_SECRET_KEY
    );
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Not authorized, token failed.", error });
  }
};

// If user is admin
const authorizeAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    // console.log(user);
    if (user && user.isAdmin === true) {
      next();
    } else {
      return res.status(401).send("Not admin.");
    }
  } catch (error) {
    console.log("Admin Error", error);
  }
};

export { authenticate, authorizeAdmin };
