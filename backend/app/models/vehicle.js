const mongoose = require("mongoose");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const url = "https://vpic.nhtsa.dot.gov/api/";

// create vehicle schema
const vehicleSchema = new mongoose.Schema({
  vin: {
    type: String,
    // required: true,
  },
  year: {
    type: String,
    // required: true,
  },
  make: {
    type: String,
    // required: true,
  },
  model: {
    type: String,
    // required: true,
  },
  trim: {
    type: String,
    // required: true,
  },
});

// add static method to vehicle schema
vehicleSchema.statics.getVehicleByVin = getVehicleByVin;

// create vehicle model
const Vehicle = mongoose.model("Vehicle", vehicleSchema);

/* 
params:
  vin: (string) vehicle identification number
returns:
  (object) vehicle data
  { vin: (string), year: (string), make: (string), model: (string), trim: (string) }
*/
async function getVehicleByVin(vin) {
  const response = await fetch(
    `${url}vehicles/decodevinvalues/${vin}?format=json`
  );
  const data = await response.json();

  // results is an array of objects, Results[0] contains the vehicle data
  const results = data.Results[0];

  // create vehicle object with desired data
  const vehicle = {
    vin: vin,
    year: results.ModelYear,
    make: results.Make,
    model: results.Model,
    trim: results.Trim,
  };

  return vehicle;
}

(module.exports = Vehicle), { getVehicleByVin };
