import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [userRole, setUserRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [studentprn, setStudentPRN] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if the user is an admin
        await axios.get("http://localhost:3000/admin/checkauth", {
          withCredentials: true,
        });
        setUserRole("admin");
      } catch {
        try {
          // Check if the user is a student
          const res = await axios.get("http://localhost:3000/student/checkauth", {
            withCredentials: true,
          });
          setUserRole("student");
          setStudentPRN(res.data.prn);
        } catch {
          setUserRole(null); // Neither admin nor student
        }
      }
    };
  
    checkAuth(); // Call the async function
  }, []);

  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Library Management</h1>

        {/* Hamburger Icon */}
        <button
          className="lg:hidden block text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`fixed inset-0 bg-blue-600 text-white transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 lg:static lg:translate-x-0 lg:flex lg:items-center lg:gap-4`}
        >
          {/* Close Button for Mobile Menu */}
          <button
            className="absolute top-4 right-4 lg:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col items-center justify-center h-full lg:flex-row lg:gap-4 lg:h-auto">
            {userRole === "admin" ? (
              <Link
                to="/admin/dashboard"
                className="block lg:inline-block px-4 py-2 hover:text-blue-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            ) : userRole === "student" ? (
              <Link
                to="/student/student-detail"
                className="block lg:inline-block px-4 py-2 hover:text-blue-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            ) : (
              <Link
                to="/"
                className="block lg:inline-block px-4 py-2 hover:text-blue-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            )}
            <Link
              to="/about"
              className="block lg:inline-block px-4 py-2 hover:text-blue-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About the Developer
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
