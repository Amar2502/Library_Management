import express from "express"
import AdminRoutes from "./routes/AdminRoutes.js"
import StudentRoutes from "./routes/StudentRoutes.js"
import EventRoutes from "./routes/EventRoutes.js"
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express()

app.use(
    cors({
      origin: "http://localhost:5173", // Your frontend URL
      credentials: true,
    })
  );

app.use(express.json())
app.use(cookieParser());

app.use("/admin", AdminRoutes)
app.use("/student", StudentRoutes)
app.use("/book", EventRoutes)

export default app;