import { AddBooks, GetBooks } from "../controllers/books.js"
import express from "express"

const router = express.Router()

router.post("/add-book", AddBooks)
router.get("/get-books", GetBooks)

export default router;