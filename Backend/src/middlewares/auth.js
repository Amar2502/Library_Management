// go to next based on your role
import config from "../config/config.js";
import jwt from "jsonwebtoken";

export const adminauthmiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(403).json({ message: "Access forbidden" });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const studentauthmiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(403).json({ message: "Access forbidden" });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    if (decoded.role !== "student") {
      return res.status(403).json({ message: "Students only" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
