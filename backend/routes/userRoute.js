import express from "express";
import {
  resetPasswordValidation,
  verifyAccountMiddleware,
} from "../middleware/jsonWebtoken.js";
import Validator from "../middleware/userValidation.js";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  verifyAccount,
} from "../controller/userController.js";
const router = express.Router();

router.post("/signup", Validator("signup"), signup);
router.post("/login", Validator("login"), login);
router.get("/verify/:authToken", verifyAccountMiddleware, verifyAccount);
router.post("/forgotPassword", Validator("forgot"), forgotPassword);
router.put(
  "/resetPassword",
  resetPasswordValidation,
  Validator("reset"),
  resetPassword
);

export default router;
