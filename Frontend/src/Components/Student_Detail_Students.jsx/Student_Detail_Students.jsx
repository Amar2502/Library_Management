import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Student_Detail_Students = () => {
  const location = useLocation();
  const prn = location.state?.prn;
  const [student, setStudent] = useState(null);
  const [bookDetails, setBookDetails] = useState([]);

  

  useEffect(() => {
    // Ensure prn is available before making the API call
    if (prn) {
      axios
        .post("http://localhost:3000/student/detail", { prn })
        .then((res) => {
          setStudent(res.data);
          setBookDetails(res.data.issuedBook || []);
        })
        .catch(() => {
          alert("Error Occurred");
          setStudent(null); // Clear student data on error
        });
    }
  }, [prn]); // Re-run the effect when `prn` changes

  const handleExtendReturnDate = (bookId) => {
    // Ensure only the targeted book is updated
    const updatedBooks = bookDetails.map((book) =>
      book.id === bookId
        ? {
            ...book,
            returnDate: new Date(
              new Date(book.returnDate).setDate(
                new Date(book.returnDate).getDate() + 15
              )
            ).toLocaleDateString(),
          }
        : book
    );
    setBookDetails(updatedBooks); // Update state only with modified return date for the clicked book
  };

  // Guard clause for when student data hasn't been loaded yet
  if (!student) {
    return <div>Loading student details...</div>;
  }

  return (
    <div className="p-8 space-y-6 font-sans bg-white">
      <h1 className="text-3xl font-semibold text-center">Student Details</h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="space-y-2">
          <p>
            <strong className="font-bold">Name:</strong> {student.name}
          </p>
          <p>
            <strong className="font-bold">PRN:</strong> {student.prn}
          </p>
          <p>
            <strong className="font-bold">Branch:</strong> {student.branch}
          </p>
          <p>
            <strong className="font-bold">Year:</strong> {student.year}
          </p>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Books Issued</h3>
        {bookDetails.length > 0 ? (
          <ul className="space-y-4">
            {bookDetails.map((book) => (
              <li key={book.id} className="p-4 border rounded-lg shadow-sm">
                <div className="space-y-2">
                  <p>
                    <strong className="font-bold">Book Name:</strong> {book.name}
                  </p>
                  <p>
                    <strong className="font-bold">Issued On:</strong>{" "}
                    {new Date(book.issueDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong className="font-bold">Return Date:</strong>{" "}
                    {new Date(book.returnDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleExtendReturnDate(book.id)}
                  className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
                >
                  Extend Return Date by 15 Days
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books issued.</p>
        )}
      </div>
    </div>
  );
};

export default Student_Detail_Students;
