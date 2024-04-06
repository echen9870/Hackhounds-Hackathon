const express = require("express");
const Order = require("../models/orderModel.ts");

const router = express.Router();

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific order by ID
router.get("/findOrderID/:id", async (req, res) => {
  console.log(req.params.id);
  const orderId = req.params.id;
  try {
    const order = await Order.findOne({ _id: orderId });
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//GET all orders that are after targetDate
router.get("/findOrderAfterDate/:date", async (req, res) => {
  try {
    const targetDate = new Date(req.params.date);
    //Aggregated pipeline for incoming orders
    const aggregatedData = await Order.aggregate([
      
      //Filter orders that have arrived on or before targetDate
      {
        $match: {
          arrival: { $lte: req.params.date }
      }
      },
      //Group order by incoming and outgoing
      {
        $group: {
          _id: "$orderType",
          total: { $sum: "$price" },
        },
      },
    ]);

    res.status(200).json(aggregatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new order
router.post("/", async (req, res) => {
  const order = new Order({
    orderType: req.body.orderType,
    ordered: req.body.ordered,
    arrival: req.body.arrival,
    product: req.body.product,
    price: req.body.price,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
