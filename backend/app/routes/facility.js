const express = require("express");
const router = express.Router();

// import the controller
const facilityController = require("../controllers/facility");

// get all facilities
router.get("/", facilityController.getAllFacilities);

// get facility by name
router.get("/:name", facilityController.getFacility);

// add facility to database
router.post("/", facilityController.addFacility);

// update facility in database
router.put("/:name", facilityController.updateFacility);

module.exports = router;
