import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentDetailAdmin() {
  const [searchQuery, setSearchQuery] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [returnLoading, setReturnLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/checkauth", { withCredentials: true })
      .then(() => setIsAdmin(true))
      .catch(() => setIsAdmin(false))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/");
    }
  }, [loading, isAdmin, navigate]);

  const handleSearch = () => {
    setSearchLoading(true);
    setError(null);

    axios
      .post("http://localhost:3000/student/detail", { prn: searchQuery })
      .then((res) => {
        setStudent(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Student not found or an error occurred. Please try again.");
        setStudent(null);
      })
      .finally(() => setSearchLoading(false));
  };

  const handleReturnBook = (bookId) => {
    setReturnLoading(true);
    axios
      .post("http://localhost:3000/student/return-book", {
        prn: student.prn,
        book_id: bookId,
      })
      .then(() => {
        setStudent((prevState) => ({
          ...prevState,
          issuedBook: prevState.issuedBook.filter(
            (book) => book.book_id !== bookId
          ),
        }));
      })
      .catch((err) => {
        console.error("Error returning book:", err);
        setError("Failed to return book.");
      })
      .finally(() => setReturnLoading(false));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Search Student Details
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter student PRN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md shadow hover:bg-blue-700 transition"
            onClick={handleSearch}
            disabled={searchLoading}
          >
            {searchLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-center my-4">
            <p className="bg-red-100 p-3 rounded-md border border-red-400">
              {error}
            </p>
          </div>
        )}

        {student && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Student Details
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Name:</strong> {student.name}
              </p>
              <p className="text-gray-700">
                <strong>PRN:</strong> {student.prn}
              </p>
              <p className="text-gray-700">
                <strong>Branch:</strong> {student.branch}
              </p>
              <p className="text-gray-700">
                <strong>Year:</strong> {student.year}
              </p>
            </div>

            {student.issuedBook && student.issuedBook.length > 0 ? (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  Issued Books
                </h3>
                <table className="w-full border-collapse border border-gray-300 text-center">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 border">Book Name</th>
                      <th className="px-4 py-2 border">Book Id</th>
                      <th className="px-4 py-2 border">Issue Date</th>
                      <th className="px-4 py-2 border">Return Date</th>
                      <th className="px-4 py-2 border">Fine</th>
                      <th className="px-4 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.issuedBook.map((book, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border">{book.name}</td>
                        <td className="px-4 py-2 border">{book.book_id}</td>
                        <td className="px-4 py-2 border">
                          {new Date(book.issueDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 border">
                          {new Date(book.returnDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 border">{book.fine || "0"}</td>
                        <td className="px-4 py-2 border">
                          <button
                            onClick={() => handleReturnBook(book.book_id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                            disabled={returnLoading}
                          >
                            {returnLoading ? "Returning..." : "Return Book"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-700 mt-4 text-center">
                No books issued to this student.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDetailAdmin;
