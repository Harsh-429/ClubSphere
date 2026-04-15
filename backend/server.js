import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config({ path: "./.env" });   // force dotenv to read .env
console.log("Mongo URI:", process.env.MONGO_URI);
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
  res.send("Backend Running 🚀");
});

app.listen(5000,()=>{
  console.log("Server running on port 5000");
});