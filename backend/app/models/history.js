const mongoose = require("mongoose");

// create a schema for the history
const historySchema = new mongoose.Schema({
  vin: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },

  model: {
    type: String,
    required: true,
  },
  trim: {
    type: String,
    required: true,
  },
  facilityName: {
    type: String,
    required: true,
  },
  facilityAddress: {
    type: String,
    required: true,
  },
  parkingSpot: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerAddress: {
    type: String,
    required: true,
  },
  ownerPhone: {
    type: String,
    required: true,
  },
  checkInTime: {
    type: String,
    required: true,
  },
  checkOutTime: {
    type: String,
    required: true,
  },
});

// create a model for the history
const History = mongoose.model("History", historySchema);

// get history by _id
History.getHistoryById = async (_id) => {
  const history = await History.findById(_id);
  return history;
};

// get all history
History.getAllHistory = async () => {
  const history = await History.find();
  return history;
};

// add history
History.addHistory = async (history) => {
  const newHistory = new History(history);
  const result = await newHistory.save();
  return result;
};

History.print = async () => {
  console.log("Hello World");
  return "Hello World";
};

module.exports = History;
