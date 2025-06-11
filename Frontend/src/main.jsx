import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Student_Home from "./Components/Student_Home/Student_Home";
import Admin_Dashboard from "./Components/Admin_Dashboard/Admin_Dashboard";
import Register_Student from "./Components/Register_Student/Register_Student";
import Register_Admin from "./Components/Register_Admin/Register_Admin";
import Login_Student from "./Components/Login_Student/Login_Student";
import Login_Admin from "./Components/Login_Admin/Login_Admin";
import Add_Books from "./Components/Add_Books/Add_Books";
import Browse_Events from "./Components/Browse_Books/Browse_Books.jsx"
import Issue_Book from "./Components/Issue_Book/Isssue_Book";
import Student_Detail_Students from "./Components/Student_Detail_Students.jsx/Student_Detail_Students";
import About from "./Components/About/About";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Student_Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/student/login" element={<Login_Student />} />
      <Route path="/admin/login" element={<Login_Admin />} />
      <Route path="/admin/dashboard" element={<Admin_Dashboard />} />
      <Route path="/student/register" element={<Register_Student />} />
      <Route path="/admin/register-admin" element={<Register_Admin />} />
      {/* <Route path="/admin/student-detail" element={<Student_Detail_Admin />} /> */}
      <Route
        path="/student/student-detail"
        element={<Student_Detail_Students />}
      />
      <Route path="/admin/add-book" element={<Add_Books />} />
      <Route path="/user/browse-books" element={<Browse_Events />} />
      <Route path="/admin/issue-book" element={<Issue_Book />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
);
