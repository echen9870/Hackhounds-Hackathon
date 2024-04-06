const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://echen9870:Eriktion12.@cluster0.jfz7sn5.mongodb.net/orders?retryWrites=true&w=majority&appName=Cluster0"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
const orderRouter = require("./routes/orderRoutes.ts");
app.use("/orders", orderRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
