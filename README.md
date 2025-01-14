# Library Management System

A full-stack library management system built with the **MERN** stack (MongoDB, Express, React, Node.js) and styled with **TailwindCSS**. This system is designed for **institutes and colleges** to manage their library resources, including book borrowing, returning, issuing, extending due dates, and fine calculation. The system also supports managing multiple users with different roles (e.g., admins, students).

## Features

- **Admin Dashboard**: A comprehensive admin dashboard to manage the library.
  - **Book Management**: Admins can add books in the library.
  - **User Management**: Admins can register new students, admins.
  - **Book Issue**: Admins can issue books to students and track due dates.
  - **Book Return**: Admins can mark books as returned.
  - **Fine Management**: Admins can calculate and manage fines for overdue books (currently under development).
  - **Book Extension**: Admins can extend the return dates for books.

- **Student Features**:
  - **Book Borrowing**: Students can view available books and borrow them.
  - **Book Return**: Students can return books they have borrowed.
  - **Account Management**: Students can update their profile and check their book status.

- **Authorization**: Role-based access control (RBAC) ensures only authorized users (admins) can perform critical actions like issuing books, adding users, etc.

## Known Issues & Improvements

1. **Fine Processing**:
   - The fine calculation mechanism is under development. I am working to fix the logic to ensure fines are correctly calculated based on overdue days.

2. **Extend Due Date**:
   - The ability for students to extend the return date for books is currently being developed.

3. **Authorization Issues**:
   - There are some minor authorization-related issues that need to be resolved. For example, the system may allow some users to access certain admin-only pages unintentionally. I am working on improving role-based access control (RBAC).

4. **Additional Features**:
   - Pending features include the ability to search for books by title or author, advanced filtering options, and user notifications for overdue books.

## Admin Page

The system has a dedicated **Admin Page** to manage the library and perform administrative tasks. However, the **admin login** is not directly accessible via the frontend.

### How to Log in as an Admin

To log in as an admin, go to `/admin/login` URL directly in the browser. There is **no dedicated login button** on the UI for admins. Once logged in, admins can:

- **Issue Books**: Admins can issue books to students.
- **Register Students**: Admins can register new students in the system.
- **Register Other Admins**: Admins can create other admins.
- **Return Books**: Admins can mark books as returned.

### Admin-Only Actions

These actions are **only available to admins**:
1. **Issuing Books**: Admins can issue books to students.
2. **Registering Admins**: Admins can create new admins.
3. **Registering Students**: Admins can register students in the library system.
4. **Returning Books**: Admins can return books on behalf of students.
5. **Fine Management**: Admins can manage and update fines for overdue books.

## Technology Stack

This project is built using the following technologies:

- **MERN Stack**:
  - **MongoDB**: NoSQL database for storing book, user, and transaction data.
  - **Express**: Web framework for Node.js to handle backend logic and API endpoints.
  - **React**: Frontend library for building the user interface.
  - **Node.js**: JavaScript runtime for the backend server.

- **TailwindCSS**: A utility-first CSS framework for styling the frontend.

## How to Run the System

### Step 1: Clone the Repository

First, clone the repository to your local machine:

```bash
git clone <repository_url>