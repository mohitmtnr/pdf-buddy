import express from "express";
import connectMongoDB from "./connect.js";
import cors from "cors";
import pdfRouter from "./routes/pdfRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";

dotenv.config();
connectMongoDB();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/pdf-buddy", pdfRouter);
app.use("/api/user", userRouter);
app.use("/uploads", express.static("./uploads")); //to view the pdf
app.use("/uploads", (req, res, next) => {
  const error = new Error("File does not exist!");

  // Check if the requested file exists in the "public" directory
  if (
    !req.url.startsWith("/public/") ||
    !fs.existsSync(path.join(__dirname, req.url))
  )
    return res.status(404).json({ success: false, message: error.message });
  else next();
});

app.listen(port, () => console.log(`listening at ${port}`));
