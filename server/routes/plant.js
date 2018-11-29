const express = require('express');
const Plant = require('../models/Plant')

const router = express.Router();


router.use((req, res, next) => {
  console.log('DEBUG routes/countries');
  next()
})

// Route to get all plants of the user
router.get('/collection', (req, res, next) => {
  Plant.find({_owner: req.user._id})
    .then(plant => {
      res.json(plant);
    })
    .catch(err => next(err))
});

// Route to add a Plant
router.post('/', (req, res, next) => {
  let user = req.user._id
  let { name, watering_interval, starting_day, description, note, picture_url } = req.body
  Plant.create({ 
    name: name, 
    watering_interval: watering_interval, 
    starting_day: starting_day, 
    description: description, 
    note: note, 
    picture_url: picture_url, 
    _owner: user  })
    .then(plant => {
      res.json({
        success: true,
        plant
      });
    })
    .catch(err => next(err))
});

module.exports = router;
