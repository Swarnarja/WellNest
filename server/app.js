const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./model/User");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

mongoose.connect("mongodb+srv://mehreen:mehreen1@cluster.fl9apou.mongodb.net/wellnest?appName=Cluster")
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log("MongoDB error:", err.message));

app.post("/register", async (req, res) => {
  try {
    const user = new User({ username: req.body.username, password: req.body.password });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || user.password !== req.body.password) {
    return res.status(400).json({ error: "Invalid username or password" });
  }
  res.json({ success: true, username: user.username });
});

app.listen(5000, () => console.log("Server running on port 5000"));