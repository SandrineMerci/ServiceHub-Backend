import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }, // Store ObjectId
    serviceNumber: { type: Number, required: true }, // Store simple number
    serviceTitle: { type: String, required: true }, // Store title of the service
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "pending" }, // Pending, Confirmed, Canceled
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);

