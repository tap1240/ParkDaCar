const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// middleware to parse the body of the request into a JSON object
app.use(express.json());

// middleware to allow cross-origin requests
app.use(cors());

// import routes
const adminRoute = require("./app/routes/admin");
const vehicleRoutes = require("./app/routes/vehicle");

// use routes
app.use("/", adminRoute);
app.use("/vehicle", vehicleRoutes);

// listen on port 8080
const port = 8080;

// connect to the database in the cloud
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database: " + err);
  });

// start the server
app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
