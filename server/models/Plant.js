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
    type: String, default: 'https://res.cloudinary.com/dzfricfvq/image/upload/v1544114014/CarrotLove/flower-puns.jpg'
  },
  lastWateringDate: {
    type: [{date: Number,
            isWatered: String}],
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;