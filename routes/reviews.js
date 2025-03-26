import express from "express";
import Review from "../models/Review.js";

const router = express.Router();


// GET all reviews for a service
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find(); // Adjust this for your database
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});


// POST a new review
router.post("/", async (req, res) => {
  const { serviceId, rating, comment, username, serviceUsed } = req.body;
  console.log("Received review:", req.body); // Debug log
  try {
    const newReview = new Review({
      serviceId,
      rating,
      comment,
      username: username || "Anonymous",
      serviceUsed: serviceUsed || "Unknown Service",
    });

    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;
