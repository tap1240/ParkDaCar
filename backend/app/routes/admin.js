const express = require("express");
const router = express.Router();

// import the controller
const adminController = require("../controllers/admin");

// get home page
router.get("/", adminController.getHome);

module.exports = router;
