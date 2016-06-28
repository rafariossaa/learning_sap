//Libro Packt Publishing: Learning Single-page Web Application Development


//Import he Modules installed to our server
var express     = require('express');
var bodyParser  = require('body-parser');

// Start the Express web framework
var app  = express();

// configure app
app.use(bodyParser());

// where the application wil run
var port  = process.env.PORT || 8000;

// import Mongoose
var mongoose   = require('mongoose');

// connect to our database
// you can use your own mongoDB installation at: mongodb://127.0.0.1/databasename
mongoose.connect('mongodb://localhost:27017/conference_new');

//Start the Node Server
app.listen(port);
console.log('Magic happens on port ' + port);


var Speaker = require('./server/models/speaker');

// Defining the Route for our API
// Start the Router
var router = express.Router();


// A simple middleware to use for all Routes and Requests
router.use(function(req, res, next) {
	// Give some message on the console
	console.log('An action was performed by the server.');

	//Is very important using the next() function, without this the Route stops here.
	next();
});


// Default message when access the API folder through the browser
router.get('/', function(req, res) {
	// Give some Hello there message
	res.json({ message: 'Hello SPA, the API is working!' });
});

// When accessing the speakers Routes
router.route('/speakers')
  // create a speaker whe the methos passed is POST
  .post(function( req, res) {
     var speaker = new Speaker();

     // set the speaker properties (comes form the request)
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
  })
  // get all the speakers when a methos passed is GET
  .get(function (req, res) {
    Speaker.find(function(err, speakers) {
      if (err)
        res.send(err);

      res.json(speakers);
    });
  });


router.route('/speakers/:speaker_id')
  //get the speaker by id
  .get(function(req, res) {
     Speaker.findById(req.params.speaker_id, function(err, speaker) {
       if(err)
         res.send(err);
         res.json(speaker);
     });
  })
  //update the speaker by id
  .put(function(req, res) {
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
  })
  //delete the speaker by id
  .delete(function(req,res) {
    Speaker.remove({
      _id: req.params.speaker_id}, function (err, speaker) {
         if (err)
            res.send(err);

         //give some success message
         res.json({message: 'speaker successfully deleted!'}); 
      });
  });

// register the route
app.use('/api', router);
