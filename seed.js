
import express from "express";
import mongoose from "mongoose"; 

import dotenv from "dotenv";
dotenv.config();
const db_user = process.env.DB_USER;
const db_name = process.env.DB_NAME;
const db_pass = process.env.DB_PASS;
const dbUri = `mongodb+srv://${db_user}:${db_pass}@cluster0.jdtdy.mongodb.net/${db_name}`;

mongoose.set("strictQuery", false);
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

  const Service = mongoose.model("Service", new mongoose.Schema({
    id: Number,
    title: String,
    priceRange: String,  
    location: String,
    category: String,
  }));
  
    const services = [
        { id: 1, title: "Car Repair", priceRange: "50-150", location: "Rwanda", category: "repairing" },
        { id: 2, title: "Phone Repair", priceRange: "30-80", location: "Rwanda", category: "repairing" },
        { id: 3, title: "Home Wiring", priceRange: "100-300", location: "Rwanda", category: "electrical" },
        { id: 4, title: "Appliance Repair", priceRange: "40-120", location: "Rwanda", category: "electrical" },
        { id: 5, title: "Home Cleaning", priceRange: "80-200", location: "Rwanda", category: "cleaning" },
        { id: 6, title: "Carpet Cleaning", priceRange: "60-150", location: "Rwanda", category: "cleaning" },
        { id: 7, title: "Math Tutoring", priceRange: "25-70", location: "Rwanda", category: "education" },
        { id: 8, title: "English Tutoring", priceRange: "20-60", location: "Rwanda", category: "education" },
        { id: 9, title: "Personal Chef", priceRange: "120-500", location: "Rwanda", category: "cooking" },
        { id: 10, title: "Meal Prep", priceRange: "70-200", location: "Rwanda", category: "cooking" },
      ];
      

Service.insertMany(services)
  .then(() => {
    console.log("Sample data inserted!");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
