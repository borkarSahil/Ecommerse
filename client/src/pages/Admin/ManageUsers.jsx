import React from "react";
import AdminMenu from "./AdminMenu";
import UserMenu from "./ManageUsers/UserMenu";

const ManageUsers = () => {
  return (
    <div>
      <AdminMenu />
      <UserMenu />
      ManageUsers
    </div>
  );
};

export default ManageUsers;
