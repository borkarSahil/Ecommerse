import React, { useEffect, useState } from "react";
import Loader from "../../Compo/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import { BACKEND_URL } from "../../helper/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Context
  const [auth, setAuth] = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        toast.error("Enter all fields");
      }

      const res = await axios.post(`${BACKEND_URL}/api/users/login`, {
        email,
        password,
      });

      console.log(res);

      if (res && res.status === 200) {
        toast.success("Login successful");

        // Set token and user to context
        setAuth({
          ...auth,
          user: res.data.existingUser,
          token: res.data.token,
        });
        // Save token and user to local storage
        localStorage.setItem("auth", JSON.stringify(res.data));        

        navigate("/");
      } else {
        console.log("Login error: ", res.data.message);
      }
    } catch (error) {
      console.log("Login error: " + error);
      toast.error("User Not Found");
    }
  };

   

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full py-2 px-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full py-2 px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              <p>
                New User :<Link to="/signup">SignUp</Link>
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
