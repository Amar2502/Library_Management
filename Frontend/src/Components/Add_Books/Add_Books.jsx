import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add_Book = () => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    book_id: "",
    inshelf: 0, // Default to 0 (not in shelf)
    issued: 0, // Default to 0 (not issued)
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/checkauth", { withCredentials: true })
      .then((res) => {
        setIsAdmin(true); // User is an admin
      })
      .catch((err) => {
        console.error(
          "Authorization error:",
          err.response?.data || err.message
        );
        setIsAdmin(false); // User is not authorized
      })
      .finally(() => {
        setLoading(false); // Stop loading after check
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    // Show an alert and redirect unauthorized users
    setTimeout(() => {
      navigate("/");
    }, 0);
    return null; // Prevent rendering of dashboard content
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "inshelf" || name === "issued" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/book/add-book", formData, {
        withCredentials: true,
      })
      .then((res) => {
        alert("Book Added Successfully");
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        alert("Try Again Later");
      });
  };

  return (
    <div className="h-screen w-screen">
      <div className="max-w-md m-auto mt-12 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add a New Book
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Book Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Book ID
            </label>
            <input
              type="text"
              name="book_id"
              value={formData.book_id}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Number of books inshelf
            </label>
            <input
              type="number"
              name="inshelf"
              value={formData.inshelf}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Number of books issued
            </label>
            <input
              type="number"
              name="issued"
              value={formData.issued}
              onChange={handleChange}
              min="0"
              max="0"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_Book;
