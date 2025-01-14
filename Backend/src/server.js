import connectDB from "./config/db.js"
import config from "./config/config.js"
import app from "./app.js"

connectDB();

app.get("/", (req,res)=>{
    res.send("Server is Running");
})

app.listen(config.PORT, ()=>{
    console.log("Server is Running on Port : ", config.PORT);
})