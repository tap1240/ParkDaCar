const express = require("express");
const router = express.Router();

// import the controller
const historyController = require("../controllers/history");

// get home page
router.get("/", historyController.getAll);

// add history to database
router.post("/", historyController.addHistory);

module.exports = router;
