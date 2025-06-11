import { AddEvents, GetEvents } from "../controllers/events.js"
import express from "express"

const router = express.Router()

router.post("/add-event", AddEvents)
router.get("/get-events", GetEvents)

export default router;