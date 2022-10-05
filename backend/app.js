const express = require("express");
const cors = require("cors");
const app = express();

// middleware to parse the body of the request into a JSON object
app.use(express.json());

// middleware to allow cross-origin requests
app.use(cors());

// import routes
const adminRoute = require("./app/routes/admin");

app.use("/", adminRoute);

// listen on port 8080
const port = 8080;

// start the server
app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
