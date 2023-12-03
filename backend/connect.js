import mongoose from "mongoose";

const connectMongoDB = () => {
  const URI = process.env.MONGODB_URI;
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Successfully!"))
    .catch((error) => console.log(error));
};

export default connectMongoDB;
