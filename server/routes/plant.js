const express = require('express');
const Plant = require('../models/Plant')
const router = express.Router();
const uploadCloud = require('../configs/cloudinary')


router.use((req, res, next) => {
  console.log('DEBUG routes/plant');
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

// Route to get a specific plant of the user
router.get('/:id', (req, res, next) => {
  Plant.findById(req.params.id)
  .then(plant => {
    res.json(plant);
  })
  .catch(err => next(err))
})

// Route to delete a specific plant of the user

router.delete('/:id', (req, res, next) => {
  Plant.findByIdAndDelete(req.params.id)
  .then(plant => {
    res.json(plant);
  })
  .catch(err => next(err))
})

// Route to add a Plant
router.post('/', (req, res, next) => {
  let user = req.user._id
  let { name, watering_interval, starting_day, description, note, picture_url, lastWateringDate } = req.body
  console.log("Type Server: ", typeof(starting_day));

  Plant.create({ 
    name: name, 
    watering_interval: watering_interval, 
    starting_day: starting_day, 
    description: description, 
    note: note, 
    picture_url: picture_url, 
    lastWateringDate: lastWateringDate,
    _owner: user  })
    .then(plant => {

      res.json({
        success: true,
        plant
      });
    })
    .catch(err => next(err))
});


// Route to get a specific plant of the user
router.get('/:id', (req, res, next) => {
  Plant.findById(req.params.id)
  .then(plant => {
    res.json(plant);
  })
  .catch(err => next(err))
})

// Route to edit a specific plant of the user
  router.put('/:id', (req, res, next) => {
   

    let user = req.user._id
    let { name, watering_interval, starting_day, description, note, picture_url, lastWateringDate } = req.body
    console.log("Server",req.params.id )
    Plant.findByIdAndUpdate(req.params.id, { 
      name: name, 
      watering_interval: watering_interval, 
      starting_day: starting_day, 
      description: description, 
      note: note, 
      picture_url: picture_url,
      lastWateringDate: lastWateringDate,
      _owner: user  })
      .then(plant => {
        res.json({
          success: true,
          plant
        });
      })
      .catch(err => next(err))
  });

// Route to upload a new picture
router.post('/picture/:id', uploadCloud.single('picture'), (req, res, next) => {
  let id = req.params.id
  console.log('server-post:', req.file.url)

  Plant.findByIdAndUpdate(id, { picture_url: req.file.url })
    .then(() => {
      res.json({
        success: true,
        picture_url: req.file.url
      })
    })
    .catch (error => {
    return  next(err)
    }) 
});

module.exports = router;
