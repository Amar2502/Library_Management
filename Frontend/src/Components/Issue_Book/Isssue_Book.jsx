import React, { useState } from "react";
import axios from "axios";

const Issue_Book = () => {
  const [prn, setPRN] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [newBook, setNewBook] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/student/detail", { prn: prn })
      .then((res) => {
        setStudentDetails(res.data);
      })
      .catch((err) => {
        alert("Error Occurred, Try Again Later");
      });
  };

  const handleAddBook = (e) => {
    e.preventDefault(); // Prevent form submission
    axios
      .post("http://localhost:3000/student/add-book", {
        prn: prn,
        book_id: newBook,
      })
      .then((res) => {
        setStudentDetails(res.data); // Update student details with new data
        alert(`Book Issued to ${studentDetails.name}, please refresh`);
      })
      .catch((err) => {
        alert("Error Occurred, Try Again Later");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="issue-book max-w-3xl w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-8 text-blue-600">
          Issue Book
        </h2>

        <form onSubmit={handleSearch} className="mb-8 space-y-6">
          <div>
            <label
              htmlFor="prn"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter PRN Number:
            </label>
            <input
              type="text"
              id="prn"
              value={prn}
              onChange={(e) => setPRN(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Enter PRN"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search Student
          </button>
        </form>

        {studentDetails && (
          <div className="student-details">
            <h3 className="text-xl font-bold mb-6">Student Details</h3>
            <p className="text-lg mb-3">
              <strong>Name:</strong> {studentDetails.name}
            </p>
            <p className="text-lg mb-3">
              <strong>PRN:</strong> {studentDetails.prn}
            </p>
            <p className="text-lg mb-3">
              <strong>Branch:</strong> {studentDetails.branch}
            </p>
            <p className="text-lg mb-6">
              <strong>Year:</strong> {studentDetails.year}
            </p>

            <h4 className="text-lg font-semibold mb-4">Previously Issued Books</h4>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse mb-6">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-6 py-3 text-left border">Book Name</th>
                    <th className="px-6 py-3 text-left border">Book Id</th>
                    <th className="px-6 py-3 text-left border">Issue Date</th>
                    <th className="px-6 py-3 text-left border">Return Date</th>
                    <th className="px-6 py-3 text-left border">Fine</th>
                  </tr>
                </thead>
                <tbody>
                  {studentDetails.issuedBook && studentDetails.issuedBook.length > 0 ? (
                    studentDetails.issuedBook.map((book) => (
                      <tr key={book.id} className="bg-white hover:bg-gray-100">
                        <td className="px-6 py-3 border">{book.name}</td>
                        <td className="px-6 py-3 border">{book.book_id}</td>
                        <td className="px-6 py-3 border">
                          {new Date(book.issueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-3 border">
                          {new Date(book.returnDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-3 border">{book.fine}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-3 text-center border">
                        No Books Issued
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="add-book mb-6">
              <label
                htmlFor="newBook"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Add New Book:
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-x-3 sm:space-y-0">
                <input
                  type="text"
                  id="newBook"
                  value={newBook}
                  onChange={(e) => setNewBook(e.target.value)}
                  className="w-full sm:w-2/3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Book ID"
                />
                <button
                  onClick={handleAddBook}
                  className="w-full sm:w-auto bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Issue_Book;
