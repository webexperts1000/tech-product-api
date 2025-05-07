const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { connectDB } = require("./db/connection");

// Routes
const userRoute = require("./routes/authRoute");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const wishRoute = require("./routes/wishRoute");
const cartRoute = require("./routes/cartRoute");
const paymentRoute = require("./routes/paymentRoute");
const orderRoute = require("./routes/orderRoute");

const app = express();
dotenv.config();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "https://tech-product-api.vercel.app/",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ extended: false }));

// Test route
app.get("/", (req, res) => {
  res.send("API Working!");
});

app.get("/user", (req, res) => {
  res.json({ message: "User Working!", user: [] });
});

// all routes
app.use("/api/auth/admin", authRoute);
app.use("/api/auth", userRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/wishlists", wishRoute);
app.use("/api/carts", cartRoute);
app.use("/api", paymentRoute);
app.use("/api/orders", orderRoute);

// Rfor vercel for serverless
module.exports = app;
