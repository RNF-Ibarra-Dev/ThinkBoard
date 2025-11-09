import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
// console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if(process.env.NODE_ENV !== "production"){
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); //parses JSON bodies: req.body
app.use(rateLimiter);

// custom middleware
// app.use((req, res, next)=>{
//   console.log(`req method is ${req.method} & URL is ${req.url}`);
//   next();
// })

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });

}

// connect database first before starting application
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT);
  });
});
