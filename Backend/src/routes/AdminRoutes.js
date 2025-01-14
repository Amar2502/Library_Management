import {RegisterAdmin, LoginAdmin, checkAdmin} from "../controllers/Admins.js"
import express from "express"
import { adminauthmiddleware } from "../middlewares/auth.js"

const router = express.Router()

router.post("/register", RegisterAdmin)
router.post("/login", LoginAdmin)
router.get("/checkauth", adminauthmiddleware, checkAdmin)

export default router;