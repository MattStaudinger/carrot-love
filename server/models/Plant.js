const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The plant name is required'],
    minlength: 1
  },
  watering_interval: {
    type: Number,
  },
  starting_day: {
    type: Date,
  },
  description: {
    type: String,
  },
  note: {
    type: String,
  },
  picture_url: {
    type: String,
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;