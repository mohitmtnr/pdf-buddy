import Pdf from "../model/pdfModel.js";
import { unlinkSync, readFileSync } from "fs";
import pdfLib from "pdf-lib";

// upload pdf
export const postPdf = async (req, res) => {
  try {
    const { filename } = req.file;
    const userId = req.user._id;
    if (!filename) {
      return res.status(400).json({ success: false, message: "Bad Request!" });
    }

    const countFile = await Pdf.find({ user_id: userId });
    if (countFile.length >= 5) {
      const filePath = `./uploads/${filename}`;
      unlinkSync(filePath);
      return res.status(400).json({
        success: false,
        message:
          "File limits reached! Please remove a file to add a new files!",
      });
    }

    const savePdfPath = await Pdf.create({
      user_id: userId,
      file_name: filename,
    });

    if (savePdfPath) {
      return res.status(200).json({
        success: true,
        message: "File Successfully Uploaded!",
        file: filename,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//fetch pdf
export const getPdf = async (req, res) => {
  try {
    const userId = req.user._id;
    const getPdfData = await Pdf.find({ user_id: userId })
      .select(" -__v")
      .sort({ _id: 1 });
    if (getPdfData) {
      return res.status(200).json({
        success: true,
        message: "Data Fetched Successfully!",
        data: getPdfData,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something Went Wrong!" });
  }
};

// manipulate pdf
export const putPdf = async (req, res) => {
  try {
    let { pages, file } = req.body;

    if (!Array.isArray(pages))
      return res.status(400).json({ success: false, message: "Bad Request!" });

    pages = pages.map((page) => parseInt(page) - 1);

    pages.forEach((element) => {
      if (!Number.isInteger(element))
        throw new Error("Please use proper format!");
    });
    const filePath = `uploads/${file}`;
    const pdfBuffer = readFileSync(filePath);
    const originalPdf = await pdfLib.PDFDocument.load(pdfBuffer);
    const totalPages = originalPdf.getPageCount();
    const newPdf = await pdfLib.PDFDocument.create();
    for (const pageNumber of pages) {
      if (pageNumber >= totalPages || pageNumber < 0) {
        throw new Error("Please enter correct page numbers!");
      }
      const [extractPage] = await newPdf.copyPages(originalPdf, [pageNumber]);
      newPdf.addPage(extractPage);
    }
    const uint8 = await newPdf.save();
    const newPdfBuffer = Buffer.from(uint8);
    res.setHeader("Content-Type", "application/pdf");
    return res.status(200).send(newPdfBuffer);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// delete pdf
export const deletePdf = async (req, res) => {
  try {
    const userId = req.user._id;
    const pdfId = req.params.pdfId;
    let findAndDeletePdf = await Pdf.findOneAndDelete({
      _id: pdfId,
      user_id: userId,
    });

    if (!findAndDeletePdf) {
      throw new Error("Something Went Wrong!");
    }

    const filePath = `./uploads/${findAndDeletePdf.file_name}`;
    unlinkSync(filePath);
    return res
      .status(200)
      .json({ success: true, message: "File Successfully Removed!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
