import React from "react";
import { useAuth } from "../../Context/auth";


const Profile = () => {
  const [auth] = useAuth();
  const { username, email, address, phone } =
    auth?.existingUser || {};

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mt-10">
        <div className="bg-blue-900 text-white p-6">
          <h1 className="text-2xl font-bold">User Profile</h1>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <p className="text-gray-700">
              <strong>Username:</strong> {username}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {email}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {address}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {phone}
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Account Actions</h2>
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Edit Profile
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
