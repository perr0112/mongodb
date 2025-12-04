import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: new mongoose.Types.ObjectId(),
    username: {
      type: String,
      required: true,
      index: { unique: true },
    },
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    isAdmin: { type: Boolean, default: false },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    createdAt: { type: Date, default: Date.now() },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
