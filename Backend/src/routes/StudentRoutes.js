import {RegisterStudent, LoginStudent, StudentDetail, AddBook, checkStudent, ReturnBook} from "../controllers/Students.js"
import express from "express"
import { studentauthmiddleware } from "../middlewares/auth.js"

const router = express.Router()

router.post("/register", RegisterStudent)
router.post("/login", LoginStudent)
router.post("/detail", StudentDetail)
router.post("/add-book", AddBook)
router.post("/return-book", ReturnBook)
router.get("/checkauth", studentauthmiddleware, checkStudent)

export default router;