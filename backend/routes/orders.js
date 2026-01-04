console.log("✅ ORDERS ROUTES FILE LOADED");

const express = require("express");
const router = express.Router();
const db = require("../db");

// PLACE ORDER
router.post("/", (req, res) => {
  const { product_name, quantity, buyer_name, address } = req.body;

  if (!product_name || !quantity || !buyer_name || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    INSERT INTO orders (product_name, quantity, buyer_name, address)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [product_name, quantity, buyer_name, address], function (err) {
    if (err) {
      res.status(500).json({ error: "Failed to place order" });
    } else {
      res.json({
        message: "Order placed successfully",
        orderId: this.lastID,
      });
    }
  });
});

// TRACK ORDER STATUS
router.get("/:id", (req, res) => {
  const orderId = req.params.id;

  const query = "SELECT * FROM orders WHERE id = ?";

  db.get(query, [orderId], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch order" });
    } else if (!row) {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.json(row);
    }
  });
});

// ADMIN: VIEW ALL ORDERS
router.get("/admin/all", (req, res) => {
  const query = "SELECT * FROM orders";

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch orders" });
    } else {
      res.json(rows);
    }
  });
});

// ADMIN: UPDATE ORDER STATUS
router.put("/admin/:id", (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const query = "UPDATE orders SET status = ? WHERE id = ?";

  db.run(query, [status, orderId], function (err) {
    if (err) {
      res.status(500).json({ error: "Failed to update status" });
    } else {
      res.json({ message: "Order status updated" });
    }
  });
});

module.exports = router;
