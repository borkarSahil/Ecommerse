import User from "../models/userModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(`${username} ${email} ${password}`);

  if (!username || !email || !password) {
    throw new Error("Missing fields");
  }

  // Check if the user/email exits
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("User already exists");
  }

  //   Hashed Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //Create a new user
  const newUser = await User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();

    // Create a token for the new user
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Missing fields");
    }

    // Check if the user/email exits
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(400).send("User doesnt exists");
    } else {
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (isPasswordValid) {
        createToken(res, existingUser._id);

        res.status(201).json({
          _id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
          isAdmin: existingUser.isAdmin,
          // token: existingUser.token
        });
      }
    }
  } catch (error) {
    res.status(400);
    throw new Error("Login error: " + error.message);
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logout successful",
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  // Finds every user in the database
  const users = await User.find({});

  res.send(users);
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404).send({ message: "Profile not found" });
  }
});

// const updateCurrentUser = asyncHandler(async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     const { username, email, password } = req.body;
//     // console.log(username);
//     if (user) {
//       // console.log(user);
//       // If user changes username update it else do nothing
//       user.username = req.body.username || user.username;
//       user.email = req.body.email || user.email;

//       console.log(req.body.email);

//       if (req.body.password) {
//         user.password = req.body.password;
//       }

//       const updatedUser = await user.save();

//       res.json({
//         _id: updatedUser._id,
//         username: updatedUser.username,
//         email: updatedUser.email,
//         isAdmin: updatedUser.isAdmin,
//       });
//     } else {
//       res.status(404).send({ message: "User not found" });
//     }
//   } catch (error) {
//     console.log("Profile update error", error);
//   }
// });

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    // console.log(req.body.username);
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const deleteUser = await User.findById(req.params.id);
  // console.log(deleteUser);

  if (deleteUser) {
    if (deleteUser.isAdmin) {
      res.status(400).send({ message: "Cannot delete Admin" });
    }

    await User.deleteOne({ _id: deleteUser._id });
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { username, email } = req.body;

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      isAdmin: updatedUser.isAdmin,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

export {
  createUser,
  loginUser,
  logOutUser,
  getAllUsers,
  getCurrentUser,
  updateCurrentUserProfile,
  deleteUser,
  getUserById,
  updateUserById,
};
