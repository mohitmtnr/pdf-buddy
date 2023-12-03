import express from "express";
import { upload, handleMulterError } from "../middleware/multer.js";
import authenticate from "../middleware/jsonWebtoken.js";
import {
  postPdf,
  getPdf,
  putPdf,
  deletePdf,
} from "../controller/pdfController.js";

const router = express.Router();

//router to upload pdf
router.post(
  "/",
  upload.single("myPdf"),
  handleMulterError,
  authenticate,
  postPdf
);

// router to fetch pdf
router.get("/", authenticate, getPdf);

// router to manipulate pdf
router.put("/", authenticate, putPdf);

//router to delete pdf
router.delete("/:pdfId", authenticate, deletePdf);

//export router
export default router;
