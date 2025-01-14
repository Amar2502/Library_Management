import Admin from "../models/Admins.model.js";
import jwt from "jsonwebtoken";
import hashpass from "../utils/hashpass.js";
import bcrypt from "bcrypt";
import config from "../config/config.js";

export const RegisterAdmin = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await hashpass(password);

    const newAdmin = new Admin({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await newAdmin.save(); // Corrected this line
    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const LoginAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const admin = await Admin.findOne({ name });
  if (!admin) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const ismatch = await bcrypt.compare(password, admin.password);
  if (ismatch == false || email != admin.email) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const token = jwt.sign(
    { email: admin.email, role: admin.role },
    config.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 3600000, // 1 hour in milliseconds
  });

  return res.status(200).json({
    message: "Admin Logged In successfully",
    token: token,
  });
};

export const checkAdmin = async (req, res) => {
  return res.status(200).json({
    message: "User is Admin",
  });
};
