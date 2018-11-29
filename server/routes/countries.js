const express = require('express');
const Plant = require('../models/Plant')

const router = express.Router();


router.use((req, res, next) => {
  console.log('DEBUG routes/countries');
  next()
})

// Route to get all countries
router.get('/', (req, res, next) => {
  Plant.find()
    .then(countries => {
      res.json(countries);
    })
    .catch(err => next(err))
});

// Route to add a country
router.post('/', (req, res, next) => {
  let { name, capitals, area, description } = req.body
  Plant.create({ name, capitals, area, description })
    .then(plant => {
      res.json({
        success: true,
        plant
      });
    })
    .catch(err => next(err))
});

module.exports = router;
