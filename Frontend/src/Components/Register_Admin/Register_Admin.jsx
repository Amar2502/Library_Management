import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register_Admin = () => {
  const navigate = useNavigate();

  // Move ALL state declarations to the top
  const [isadmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "admin",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/checkauth", { withCredentials: true })
      .then((res) => {
        setIsAdmin(true);
      })
      .catch((err) => {
        setIsAdmin(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && !isadmin) {
      navigate("/");
    }
  }, [loading, isadmin, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/admin/register", formData)
      .then((res) => {
        alert("Admin registered Successfully");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          role: "admin",
        });
      })
      .catch((err) => {
        alert("Error Occured, Check Credentials or Try Again Later");
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center pt-5">
      {/* Rest of your JSX remains exactly the same */}
      <div className="w-full max-w-3xl p-6 bg-zinc-100 rounded-lg shadow-lg space-y-6 mt-6 mb-12">
        <div className="p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Register New Admin
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-lg font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
            >
              Register Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register_Admin;