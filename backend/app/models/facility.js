const mongoose = require("mongoose");

// create facility schema
const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  parking: {
    type: Object,
    required: true,
  },
});

// create facility model
const Facility = mongoose.model("Facilities", facilitySchema);

// get facility by name
Facility.getFacilityByName = async (name) => {
  const facility = await Facility.findOne({ name: name });
  return facility;
};

Facility.addFacility = async (name, address, numParkingSpots) => {
  // make sure facility doesn't already exist: name and address must be unique
  const notUnique = await Facility.findOne({ name: name, address: address });
  if (notUnique) {
    throw new Error("Facility already exists");
  }

  // make sure numParkingSpots is an integer
  if (!Number.isInteger(numParkingSpots)) {
    throw new Error("Number of parking spots must be an integer");
  }

  // create object to store parking spots, each parking spot is an object with fields: id, occupied
  const parking = [];
  for (let i = 1; i <= numParkingSpots; i++) {
    parking.push({ id: i, occupied: false });
  }

  const facility = new Facility({
    name,
    address,
    parking,
  });
  await facility.save();
  return facility;
};

Facility.getAllFacilities = async () => {
  const facilities = await Facility.find();
  return facilities;
};

module.exports = Facility;
