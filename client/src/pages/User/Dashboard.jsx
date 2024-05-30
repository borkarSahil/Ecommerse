import React from "react";
import AdminMenu from "../Admin/AdminMenu";
import { useAuth } from "../../Context/auth";

const Dashboard = () => {
    const [auth] = useAuth();
  return (
    <div>
      <AdminMenu />
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Admin Details</h2>
              <p className="text-gray-700">
                <strong>Name:</strong> {auth?.existingUser?.username}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {auth?.existingUser?.email}
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                  <h3 className="text-lg font-bold">Manage Categories</h3>
                  <p>Perform CRUD operations on categories.</p>
                </div>
                <div className="p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                  <h3 className="text-lg font-bold">Manage Products</h3>
                  <p>Perform CRUD operations on products.</p>
                </div>
                <div className="p-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                  <h3 className="text-lg font-bold">Manage Users</h3>
                  <p>Perform CRUD operations on users.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
