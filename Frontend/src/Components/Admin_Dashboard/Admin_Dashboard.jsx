import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin_Dashboard = () => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/checkauth", { withCredentials: true })
      .then((res) => {
        setIsAdmin(true); // User is an admin
      })
      .catch((err) => {
        console.error("Authorization error:", err.response?.data || err.message);
        setIsAdmin(false); // User is not authorized
      })
      .finally(() => {
        setLoading(false); // Stop loading after check
      });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    // Show an alert and redirect unauthorized users
    setTimeout(() => {
      navigate("/");
    }, 0);
    return null; // Prevent rendering of dashboard content
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-12">
      {/* Admin Dashboard Content */}
      <div className="w-full max-w-4xl p-6 bg-zinc-50 rounded-lg shadow-lg space-y-6 mt-6">
        <div className="w-full p-6 mb-12">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Admin Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Browse Books */}
          <div className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600">
            <Link to="/user/browse-books" className="block text-lg font-semibold">
              Browse Events
            </Link>
          </div>

          {/* Register an Admin */}
          <div className="bg-yellow-500 text-white p-4 rounded-lg text-center hover:bg-yellow-600">
            <Link to="/admin/register-admin" className="block text-lg font-semibold">
              Register Admin
            </Link>
          </div>

          {/* Add New Books */}
          <div className="bg-indigo-500 text-white p-4 rounded-lg text-center hover:bg-indigo-600">
            <Link to="/admin/add-book" className="block text-lg font-semibold">
              Add New Event
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Dashboard;
