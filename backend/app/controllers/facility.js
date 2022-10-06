const Facility = require("../models/facility");

exports.getAllFacilities = async (req, res) => {
  res.send(await Facility.getAllFacilities());
};

exports.getFacility = async (req, res) => {
  const name = req.params.name;
  const facility = await Facility.getFacilityByName(name);
  res.send(facility);
};

exports.addFacility = async (req, res) => {
  if (!req.body.name || !req.body.address || !req.body.parking) {
    res.status(400).send("Missing required fields");
  }

  try {
    const result = await Facility.addFacility(
      req.body.name,
      req.body.address,
      req.body.parking
    );
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.updateFacility = async (req, res) => {
  try {
    const result = await Facility.updateFacility(
      req.body.name,
      req.body.address,
      req.body.parking
    );
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
