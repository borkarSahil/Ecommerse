import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-white font-semibold text-xl">Admin Panel</div>
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              <Link
                to="/admin/create-categories"
                className="text-white hover:bg-cyan-500 hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Create Category
              </Link>
              <Link
                to="/admin/create-products"
                className="text-white hover:bg-cyan-500 hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Create Product
              </Link>
              <Link
                to="/admin/manage-users"
                className="text-white hover:bg-cyan-500 hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Manage Users
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-blue-700 text-white hover:text-yellow-300 hover:bg-blue-500 inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/admin/create-categories"
            className="text-white hover:bg-blue-500 hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
          >
            Create Category
          </Link>
          <Link
            to="/admin/create-products"
            className="text-white hover:bg-blue-500 hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
          >
            Create Product
          </Link>
          <Link
            to="/admin/manage-users"
            className="text-white hover:bg-blue-500 hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
          >
            Manage Users
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminMenu;
