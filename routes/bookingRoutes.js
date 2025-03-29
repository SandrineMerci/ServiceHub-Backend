import express from "express";
import Booking from "../models/Booking.js";
import Service from "../models/Service.js"; 
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Book a service
router.post("/", async (req, res) => {
  try {
    const { serviceId, name, email, phone, date, description } = req.body;

    // Find the service by ObjectId
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Create a new booking
    const booking = new Booking({
      serviceId: service._id, // Store as ObjectId
      serviceNumber: service.id, // Store as a simple number
      serviceTitle: service.title, // Store service title
      name,
      email,
      phone,
      date,
      description,
    });

    await booking.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL, // Your email
      subject: "New Booking Received!",
      html: `
        <h2>New Booking Details</h2>
        <p><strong>Service ID:</strong> ${serviceId}</p>
        <p><strong>Service Name:</strong> ${service.title}</p>
        <p><strong> Customer Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Booking Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to admin!");

    res.status(201).json({ message: "Booking successful!", booking });

  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ error: "Server error." });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find(); // Ensure 'Booking' model exists
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// PUT /api/bookings/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
