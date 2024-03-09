import React from "react";
import AdminMenu from "../Admin/AdminMenu";
import { useAuth } from "../../Context/auth";

const Dashboard = () => {
    const [auth] = useAuth();
  return (
    <div>
      <div>
        <AdminMenu />
      </div>
      <div>
        <h1>Admin Name : {auth?.existingUser?.username}</h1>
        <h1>Admin Email : {auth?.existingUser?.email}</h1>
      </div>
      <div>Content</div>
    </div>
  );
};

export default Dashboard;
