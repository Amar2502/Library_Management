import React from "react";
import { Link } from "react-router-dom";

const Student_Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Welcome to the Library
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Explore a vast collection of books, manage your library account, and stay connected with your reading journey. Your gateway to knowledge awaits!
        </p>
        <div className="flex justify-center gap-6">
          <Link to="/user/browse-books">
          <button className="bg-blue-600 text-white py-3 px-6 rounded-md shadow hover:bg-blue-700 transition">
            Browse Books
          </button>
          </Link>
          <Link to="/student/login">
          <button className="bg-green-600 text-white py-3 px-6 rounded-md shadow hover:bg-green-700 transition">
            See Your Account
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Student_Home;
