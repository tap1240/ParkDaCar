const express = require("express");
const router = express.Router();

// import the controller
const vehicleController = require("../controllers/vehicle");

// get home page
router.get("/", vehicleController.getHome);

// get vehicle data by VIN
router.get("/:vin", vehicleController.getVehicle);

// add vehicle to database
router.post("/", vehicleController.addVehicle);

module.exports = router;
