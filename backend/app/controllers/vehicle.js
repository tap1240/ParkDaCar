const Vehicle = require("../models/vehicle");

exports.getHome = (req, res) => {
  res.send("Vehicle Home");
};

exports.getVehicle = async (req, res) => {
  const vin = req.params.vin;
  try {
    const vehicle = await Vehicle.getVehicleByVin(vin);
    res.send(vehicle);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.addVehicle = async (req, res) => {
  const vin = req.body.vin;

  if (!vin) {
    res.status(400).send("Missing VIN");
    return;
  }

  try {
    const result = await Vehicle.addVehicle(vin);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};
