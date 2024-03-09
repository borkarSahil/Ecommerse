import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useAuth } from "../../Context/auth";
import { BACKEND_URL } from "../../helper/constants";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${BACKEND_URL}/api/users/admin-auth`);
      console.log("Response",res);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loader />;
}
