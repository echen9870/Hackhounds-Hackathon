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

//Get order by search query
router.get("/findOrderByQuery", async (req, res) => {
  const orderedDateString = req.query.ordered;
  const arrivalDateString = req.query.arrival;

  let ordered = null;
  let arrival = null;

  // Convert ordered date string to Date object if it's not empty
  if (orderedDateString !== "") {
    const orderedDate = new Date(orderedDateString);
    const year = orderedDate.getFullYear();
    const month = orderedDate.getMonth();
    const day = orderedDate.getDate();
    ordered = {
      $gte: new Date(year, month, day + 1), // Start of the day
      $lt: new Date(year, month, day + 2), // Start of the next day
    };
  }

  // Convert arrival date string to Date object if it's not empty
  if (arrivalDateString !== "") {
    const arrivalDate = new Date(arrivalDateString);
    const year = arrivalDate.getFullYear();
    const month = arrivalDate.getMonth();
    const day = arrivalDate.getDate();
    arrival = {
      $gte: new Date(year, month, day + 1), // Start of the day
      $lt: new Date(year, month, day + 2), // Start of the next day
    };
  }

  // Construct the query object
  const query = {
    orderType: req.query.orderType ? req.query.orderType : null,
    ordered: ordered,
    arrival: arrival,
    product: req.query.product,
    quantity: req.query.quantity,
    price: req.query.price,
  };

  // Remove null values and empty strings from the query object
  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(([_, value]) => value !== null && value !== "")
  );

  console.log(filteredQuery);
  try {
    // Query the database based on the filtered search criteria
    const orders = await Order.find(filteredQuery);

    // Send the response with the matching orders
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//GET all orders that are after targetDate
router.get("/findStatsDate/:date", async (req, res) => {
  console.log(req.params.date);
  const targetDate = new Date(req.params.date);
  try {
    const aggregatedData = await Order.aggregate([
      //Filter orders that have arrived on or before targetDate
      {
        $match: {
          arrival: { $lte: targetDate },
        },
      },
      //Group order by incoming and outgoing
      {
        $group: {
          _id: { Product: "$product" },
          totalQuantity: {
            $sum: {
              $cond: [
                { $eq: ["$orderType", "in"] },
                "$quantity",
                { $subtract: [0, "$quantity"] } // Subtract quantity for outgoing orders
              ]
            },
          },
          totalProfit: {
            $sum: {
              $cond: [
                { $eq: ["$orderType", "out"] },
                { $multiply: ["$price", "$quantity"] },
                { $multiply: ["$price", "$quantity", -1] }, // Outgoing orders contribute to negative profit
              ],
            },
          },
        },
      },
    ]);
    console.log(aggregatedData);
    res.status(200).json(aggregatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//GET all orders that are after targetDate
router.get("/findOrderAfterDate/:date", async (req, res) => {
  const targetDate = new Date(req.params.date);
  try {
    //Aggregated Pipeline for incoming orders
    const aggregatedData = await Order.aggregate([
      //Filter orders that have arrived on or before targetDate
      {
        $match: {
          arrival: { $gte: targetDate },
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
router.post("/postOrder", async (req, res) => {
  const order = new Order({
    orderType: req.body.orderType,
    ordered: new Date(req.body.ordered),
    arrival: new Date(req.body.arrival),
    product: req.body.product,
    price: req.body.price,
    quantity: req.body.quantity,
  });

  try {
    //Saves the data
    const newOrder = await order.save();
    res.status(201).json(newOrder);

    //Clears the cache from this date onwards
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//PUT into an existing order
router.put("/putOrder", async (req, res) => {
  console.log(req.body);
  const order = new Order({
    orderId: req.body.orderType,
    orderType: req.body.orderType,
    ordered: req.body.ordered,
    arrival: req.body.arrival,
    product: req.body.product,
    price: req.body.price,
    quantity: req.body.quantity,
  });

  try {
    // Find the existing order by ID
    const existingOrder = await Order.findById(order.orderId);
    // If order doesn't exist
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    existingOrder.orderType = req.body.orderType;
    existingOrder.ordered = req.body.ordered;
    existingOrder.arrival = req.body.arrival;
    existingOrder.product = req.body.product;
    existingOrder.price = req.body.price;
    existingOrder.quantity = req.body.quantity;

    // Save the updated order
    const updatedOrder = await existingOrder.save();
    res.status(200).json(updatedOrder);

    //Clears the cache from this date onwards
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Del an existing order by ID

router.delete("/delOrder/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Find the order by ID and delete it
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
