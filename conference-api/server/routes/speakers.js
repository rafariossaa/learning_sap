//Libro Packt Publishing: Learning Single-page Web Application Development

var express = require('express');
var router = express.Router();

//Import Speakers Model
var Speaker = require('../models/speaker');


// Default message when access the API folder through the browser
router.get('/', function(req, res) {
	// Give some Hello there message
	//res.json({ message: 'Hello SPA, the API is working!' });
  Speaker.find(function(err, speakers) {
    if(err)
        res.send(err);

    res.json(speakers);
  });

});


// GET specific user by id.
router.get('/:speaker_id', function (req, res) {
     Speaker.findById(req.params.speaker_id, function(err, speaker) {
       if(err)
         res.send(err);

       res.json(speaker);
     });
});

// PUT users
router.post('/', function(req, res) {
  // create a new instance of the speaker model
  var speaker = new Speaker();

  // set the speakers properties (comes from the request)
  speaker.name        = req.body.name;
  speaker.company     = req.body.company;
  speaker.title       = req.body.title;
  speaker.description = req.body.description;
  speaker.picture     = req.body.picture;
  speaker.schedule    = req.body.schedule;

  // save the data received
  speaker.save(function (err) {
    if (err)
       res.send(err);

    // give some success message
    res.json({ message: 'speaker successfully created!'});
  });
});


// UPDATE specific user by id.
router.put('/:speaker_id', function(req,res) {
  Speaker.findById(req.params.speaker_id, function(err,speaker) {
    if (err)
       res.send(err);

    //set the speaker properties (comes from the request)
    speaker.name = req.body.name;
    speaker.company = req.body.company;
    speaker.title = req.body.title;
    speaker.description = req.body.description;
    speaker.picture = req.body.picture;
    speaker.schedule = req.body.schedule;

    // save th date received
    speaker.save(function (err) {
      if(err)
        res.send(err);

      //five some sucess message
      res.json({ message: 'speaker successfully updated!'});
   });
 });
});

// DELETE specific users by id
router.delete('/:speaker_id', function(req, req) {
  Speaker.remove({ _id: req.params.speaker_id }, function(err, speaker) {
      if(err)
        res.send(err);

      //five some success message
      res.json({message: 'speaker successfully deleted!!'});
  });
});

// Exports all the routes to router variables
module.exports = router;
