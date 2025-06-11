import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add_Event = () => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    tag: "Technical",
    description: "",
    coordinatorName: "",
    coordinatorPhone: "",
    mode: "Offline",
    venue: "",
    dateTime: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/checkauth", { withCredentials: true })
      .then(() => setIsAdmin(true))
      .catch(() => setIsAdmin(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    setTimeout(() => {
      navigate("/");
    }, 0);
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/book/add-event", formData, {
        withCredentials: true,
      })
      .then(() => {
        alert("Event added successfully!");
        navigate("/admin/dashboard");
      })
      .catch(() => {
        alert("Try again later");
      });
  };

  return (
    <div className="h-screen w-screen overflow-y-auto">
      <div className="max-w-2xl m-auto mt-12 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
          Add New Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-4 py-2 rounded-md"
            />
          </div>

          {/* Tag */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Tag
            </label>
            <select
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className="mt-1 w-full border px-4 py-2 rounded-md"
              required
            >
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Literature">Literature</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-4 py-2 rounded-md"
            />
          </div>

          {/* Coordinator Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Coordinator Name
            </label>
            <input
              type="text"
              name="coordinatorName"
              value={formData.coordinatorName}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-4 py-2 rounded-md"
            />
          </div>

          {/* Coordinator Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Coordinator Phone
            </label>
            <input
              type="text"
              name="coordinatorPhone"
              value={formData.coordinatorPhone}
              onChange={handleChange}
              maxLength="10"
              required
              className="mt-1 w-full border px-4 py-2 rounded-md"
            />
          </div>

          {/* Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mode
            </label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="mt-1 w-full border px-4 py-2 rounded-md"
              required
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Venue (required if Offline)
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="mt-1 w-full border px-4 py-2 rounded-md"
            />
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date and Time
            </label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-4 py-2 rounded-md"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_Event;
