import multer from "multer";
const MAX_FILE_SIZE = 5 * 1024 * 1024; //5MB

const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, "./uploads");
  },
  filename: function (req, file, callBack) {
    const filterFileName = file.originalname
      .split(" ") //return array  of all the strings separated by space.
      .map((str) => "_".concat(str.trim())) // return array after trimming the spaces.
      .reduce((prev, curr) => prev.concat(curr)); //reduce the array to once complete string.

    const uniqueSuffix = `${Date.now()}${filterFileName}`;

    callBack(null, uniqueSuffix);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, callBack) => {
    if (file.mimetype != "application/pdf") {
      return callBack(new Error("Only PDF files are allowed!"), false);
    }
    callBack(null, true);
  },
});

// Error handling middleware for Multer
export const handleMulterError = (err, req, res, next) => {
  if (err) {
    // MulterError occurred, handle it and send a custom error message
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size exceeds the limit (5MB)",
      });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
  // If no error, continue to the next middleware
  next();
};
