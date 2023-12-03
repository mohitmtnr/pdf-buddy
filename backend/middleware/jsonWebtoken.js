import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const verifyAccountMiddleware = async (req, res, next) => {
  try {
    const JWT_VERIFICATION_SECRET = process.env.JWT_VERIFICATION_SECRET;
    const token = req.params.authToken;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Validate using a valid token!" });
    }

    const verifyToken = jwt.verify(token, JWT_VERIFICATION_SECRET);
    if (!verifyToken) {
      return res
        .status(401)
        .json({ success: false, message: "Token does not match!" });
    }

    const userId = verifyToken.user;
    const isValid = await User.findOne(userId);
    if (!isValid || token !== isValid.activationToken) {
      return res.status(400).json({ success: false, message: "Bad Request!" });
    }
    req.user = verifyToken.user;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// reset password validation
export const resetPasswordValidation = async (req, res, next) => {
  try {
    const JWT_RESET_PASSWORD_SECRET = process.env.JWT_RESET_PASSWORD_SECRET;
    const token = req.header("forgotPasswordToken");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Validate using a valid token!" });
    }

    const verifyToken = jwt.verify(token, JWT_RESET_PASSWORD_SECRET);
    if (!verifyToken) {
      return res
        .status(401)
        .json({ success: false, message: "Token does not match!" });
    }

    const userId = verifyToken.user;
    const isValid = await User.findOne(userId);
    if (!isValid || token !== isValid.forgotPasswordToken) {
      return res.status(400).json({ success: false, message: "Bad Request!" });
    }
    req.user = verifyToken.user;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const authenticate = (req, res, next) => {
  //get the user from jwt and add id to req object
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = req.header("authToken");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authenticate using a valid token!" });
    }

    const userData = jwt.verify(token, JWT_SECRET);

    if (!userData) {
      return res
        .status(400)
        .json({ success: false, message: "Token does not match!" });
    }
    req.user = userData.user;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default authenticate;
