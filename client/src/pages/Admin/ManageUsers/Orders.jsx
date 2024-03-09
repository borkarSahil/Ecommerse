import React from "react";
import UserMenu from "./UserMenu";
import AdminMenu from "../AdminMenu";

const Orders = () => {
  return (
    <div>
    
    <AdminMenu />
      <div>
        <UserMenu />
      </div>

      <div>Orders</div>
    </div>
  );
};

export default Orders;
