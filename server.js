import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/auth.js";
import Service from "./models/Service.js";  
import reviewsRoutes from "./routes/reviews.js";
import User from "./models/User.js";
import Booking from "./models/Booking.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("ServiceHubMarketplace API"));
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewsRoutes);



const db_user = process.env.DB_USER;
const db_name = process.env.DB_NAME;
const db_pass = process.env.DB_PASS;
const dbUri = `mongodb+srv://${db_user}:${db_pass}@cluster0.jdtdy.mongodb.net/${db_name}`;

mongoose.set("strictQuery", false);
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.get("/api/services", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const services = await Service.find(filter);
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Error fetching services" });
  }
});
  // Get services by category
  app.get("/api/services/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const services = await Service.find({ category });
      res.json(services);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });

  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await Review.find(); // For MongoDB
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });
  
  app.get("/api/users", async (req, res) => {
    try {
      const reviews = await User.find(); // For MongoDB
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const reviews = await Booking.find(); // For MongoDB
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
