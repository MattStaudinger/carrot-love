const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The plant name is required'],
    minlength: 1
  },
  watering_interval: {
    type: Number,
    //required: [true, 'The watering interval is required'],
  },
  starting_day: {
    type: Number,
  //  required: [true, 'The starting-day is required'],
  },
  description: {
    type: String,
  },
  note: {
    type: String,
  },
  picture_url: {
    type: String, default: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/76407001-87db-4853-8df3-85fc98ca7584/dc90vh4-5a135524-aa53-42cc-b4e5-02ca3deb43d8.png'
  },
  
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;