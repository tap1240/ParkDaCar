const History = require("../models/history");

exports.getAll = (req, res) => {
  History.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving history.",
      });
    else res.send(data);
  });
};

exports.getHistoryById = (req, res) => {
  History.getHistoryById(req.params.historyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found History with id ${req.params.historyId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving History with id " + req.params.historyId,
        });
      }
    } else res.send(data);
  });
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
