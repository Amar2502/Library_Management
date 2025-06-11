import {RegisterStudent, LoginStudent, StudentDetail, checkStudent} from "../controllers/Students.js"
import express from "express"
import { studentauthmiddleware } from "../middlewares/auth.js"

const router = express.Router()

router.post("/register", RegisterStudent)
router.post("/login", LoginStudent)
router.post("/detail", StudentDetail)
router.get("/checkauth", studentauthmiddleware, checkStudent)

export default router;