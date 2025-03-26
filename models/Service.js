import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  priceRange: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
});

// Prevent overwriting the model
const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

export default Service;
