const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sensorRoutes = require('./route/sensorRoute');
const userRoutes = require('./route/userRoute');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    credentials: true,
  })
);

// Routes
app.use("/data", sensorRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(
    "mongodb+srv://hynoras:Quang23022002@cluster0.hxredev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.log(err);
    console.error("Could not connect to MongoDB...");
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
