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
 
// execute before any query string
// notificationSchema.pre(/^find/, function(next){
//   this.populate({
//     path: 'user',
//     select: 'name email photo'
//   });

//   next();
// })


export default mongoose.model("Notification", notificationSchema);
