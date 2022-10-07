const express = require("express");
const router = express.Router();

// import the controller
const historyController = require("../controllers/history");

// get home page
router.get("/", historyController.getAll);

// get history data by _id
router.get("/:id", historyController.getHistoryById);

// add history to database
router.post("/", historyController.addHistory);

module.exports = router;
