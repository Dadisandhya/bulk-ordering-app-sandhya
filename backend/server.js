console.log("✅ EXPRESS SERVER FILE LOADED");

const express = require("express");
const cors = require("cors");
const db = require("./db");

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");   // ✅ REQUIRED

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);                  // ✅ REQUIRED

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/test", (req, res) => {
  res.send("Test route working");
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
