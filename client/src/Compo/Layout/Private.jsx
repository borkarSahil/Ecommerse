import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import { BACKEND_URL } from "../../helper/constants";
import { Outlet, useNavigate } from "react-router";
import Loader from "../Loader/Loader";
import Login from "../../pages/Auth/Login";

const Private = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  // console.log(auth?.token);
  useEffect(() => {
    const authCheck = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${auth?.token}`, // Include token in the request headers
          },
        };

        const res = await axios.get(
          `${BACKEND_URL}/api/users/userauth`,
          config
        );
        console.log("res", res);
        if (res.data.ok) {
          setOk(true);
          navigate("/dashboard");
        } else {
          setOk(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking authorization:", error);
        navigate("/login"); // Redirect to login page if error occur
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <Loader />;
};

export default Private;
