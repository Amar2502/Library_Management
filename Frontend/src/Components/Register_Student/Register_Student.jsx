import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register_Student = () => {
  const navigate = useNavigate();

  // Move ALL state declarations to the top
  const [isadmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    prn: "",
    branch: "",
    role: "student",
    password: "",
    year: "",
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
      .post("http://localhost:3000/student/register", formData)
      .then((res) => {
        alert("Student Registered Successfully");
        setFormData({
          name: "",
          prn: "",
          branch: "",
          role: "student",
          password: "",
          year: "",
        });
      })
      .catch((err) => {
        alert("Error Occured, Check Credentials or Try Again Later");
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center pt-6">
      {/* Register Student Form */}
      <div className="w-full max-w-3xl p-6 bg-zinc-100 rounded-lg shadow-lg space-y-6 mt-6 mb-12">
        <div className="p-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Register New Student
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

          {/* PRN Field */}
          <div className="flex flex-col">
            <label htmlFor="prn" className="text-lg font-semibold text-gray-700">
              PRN (Personal Registration Number)
            </label>
            <input
              type="text"
              id="prn"
              name="prn"
              value={formData.prn}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Branch Field (Dropdown) */}
          <div className="flex flex-col">
            <label htmlFor="branch" className="text-lg font-semibold text-gray-700">
              Branch
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Branch</option>
              <option value="CSE">Computer Science Engineering</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics and Communication Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="EEE">Electrical and Electronics Engineering</option>
            </select>
          </div>

          {/* Year Field */}
          <div className="flex flex-col">
            <label htmlFor="year" className="text-lg font-semibold text-gray-700">
              Year
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
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
              Register Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register_Student;