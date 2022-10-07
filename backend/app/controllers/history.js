const History = require("../models/history");

exports.getAll = async (req, res) => {
  try {
    const result = await History.getAll();
    console.log(result);
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.addHistory = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a History
  const history = {
    vin: req.body.vin,
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    trim: req.body.trim,
    facilityName: req.body.facilityName,
    facilityAddress: req.body.facilityAddress,
    parkingSpot: req.body.parkingSpot,
    ownerName: req.body.ownerName,
    ownerAddress: req.body.ownerAddress,
    ownerPhone: req.body.ownerPhone,
    checkInTime: req.body.checkInTime,
    checkOutTime: req.body.checkOutTime,
  };

  try {
    const result = await History.addHistory(history);
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
