import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    ticketPrice: { type: String, required: true },
    appointmentDate: {
      type: String,
      required: true,
    },
    // ticketPrice: { type: Number, required: true },
    // appointmentDate: {
    //   type: Date,
    //   required: true,
    // },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

bookingSchema.pre(/^find/, function(next){
  this.populate({
    path: 'user',
    select: 'name email photo'
  });

  next();
})
bookingSchema.pre(/^find/, function(next){
  this.populate({
    path: 'doctor',
    select: 'name email'
  });

  next();
})

export default mongoose.model("Booking", bookingSchema);
