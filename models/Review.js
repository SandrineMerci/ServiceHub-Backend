import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  serviceId: { type: String, required: false },
  username: { type: String, default: "Anonymous" },
  serviceUsed: { type: String, default: "Unknown Service" },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


const Review = mongoose.model("Review", ReviewSchema);

export default Review;
