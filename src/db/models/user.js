import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  fullname: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
