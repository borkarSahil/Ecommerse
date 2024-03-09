import User from "../models/userModels.js";
import createToken from "../utils/createToken.js";
import { comparePassword, hashPassword } from "../utils/authHash.js";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;
    if (!username || !email || !password || !phone || !address) {
      return res.send({ message: "Please enter all fields." });
    }
    // console.log(username);

    const user = await User.findOne({ email });
    if (user) {
      return res.send({ message: "User already exists." });
    }

    const hashedPassword = await hashPassword(password);
    // console.log(hashedPassword);
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    await newUser.save();

    res.status(200).send({
      message: "User saved successfully.",
      newUser,
    });
  } catch (error) {
    console.log("Registration error: " + error);
    res.status(400).send({ message: "Registration error", error: error });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    // console.log(password);

    if (!existingUser) {
      return res.status(400).send({ message: "User Not found" });
    }

    const isPasswordValid = await comparePassword(
      password,
      existingUser.password
    );
    // console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).send({ message: "Password does not match" });
    }

    const token = await createToken(res, existingUser._id);

    return res.status(200).send({
      existingUser: {
        username: existingUser.username,
        email: existingUser.email,
        phone: existingUser.phone,
        address: existingUser.address,
        isAdmin: existingUser.isAdmin,
      },
      message: "Logged In",
      token,
    });
  } catch (error) {
    console.log("Login error: " + error);
    res.status(400).send({ message: "Login error", error: error });
  }
};

const test = (req, res) => {
  try {
    res.send("Protect")
    console.log("protected test");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

export { registerController, loginController, test };
