const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const query = "SELECT * FROM products";

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch products" });
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
