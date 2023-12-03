import mongoose, { Model } from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    default: "unknown",
  },
  email: {
    type: String,
    default: "unknown.@gmail.com",
  },
  password: {
    type: String,
    default: Math.random() * 1_000_000_000,
  },
  forgotPasswordToken: {
    type: String,
    default: "none",
  },
  activationToken: {
    type: String,
    default: "none",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = model("user", UserSchema);
export default User;
