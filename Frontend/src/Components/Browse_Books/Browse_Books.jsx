import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Browse_Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/book/get-events") // Endpoint still points to 'book'
      .then((res) => {
        setEvents(res.data.Events); // 'books' is the key returned by the API
        setLoading(false);
      })
      .catch((err) => {
        alert("Failed to load events. Try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
        Browse Events
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-600">No events available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {event.name}
              </h2>
              <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full mb-2">
                {event.tag}
              </span>
              <p className="text-sm text-gray-600 mb-3">{event.description}</p>

              <div className="text-sm text-gray-700">
                <p>
                  <strong>Coordinator:</strong> {event.coordinatorName}
                </p>
                <p>
                  <strong>Phone:</strong> {event.coordinatorPhone}
                </p>
                <p>
                  <strong>Mode:</strong> {event.mode}
                </p>
                {event.mode === "Offline" && (
                  <p>
                    <strong>Venue:</strong> {event.venue}
                  </p>
                )}
                <p>
                  <strong>Date & Time:</strong>{" "}
                  {new Date(event.dateTime).toLocaleString()}
                </p>
              </div>
              <Link to="/student/register">
              <button
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
              >
                Register Here
              </button></Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse_Events;
