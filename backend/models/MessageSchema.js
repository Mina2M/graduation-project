import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    email: {
        type: String,
        required: true,
      },
    subject: {
        type: String,
        required: true,
      },
    messageText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
 
// execute before any query string
messageSchema.pre(/^find/, function(next){
  this.populate({
    path: 'user',
    select: 'name email photo'
  });

  next();
})


export default mongoose.model("Message", messageSchema);
