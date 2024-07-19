import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);
 

export default mongoose.model("Notification", notificationSchema);
