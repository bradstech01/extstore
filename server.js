'use strict'
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Extension = require('./model/extensions');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3001;
const url = process.env.MONGOLAB_URI;

//MongoDB configuration
mongoose.connect(url);

//Configures the API to use bodyParser to look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing (damnit Chrome), we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 //and remove cacheing so we get the most recent data
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});


//… removed for brevity
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

//adding the /extensions route to our /api router
router.route('/extensions')

//retrieve all extensions from the database
.get(function(req, res) {
  //looks at our Extension Schema
  Extension.find(function(err, extensions) {
  if (err)
  res.send(err);
  //responds with a json object of our database extensions.
  res.json(extensions)
  });
})

//post new extension to the database
.post(function(req, res) {
  var extension = new Extension();
  //body parser lets us use the req.body
  extension.author = req.body.author;
  extension.description = req.body.description;
  extension.name = req.body.name;
  extension.version = req.body.version;

  extension.save(function(err) {
    if (err)
    res.send(err);
    res.json({ message: 'Extension successfully added!' });
    });
 });

//Adding a route to a specific extension based on the database ID
router.route('/extensions/:extension_id')
//The put method gives us the chance to update our extension based on
//the ID passed to the route
.put(function(req, res) {
  Extension.findById(req.params.extension_id, function(err, extension) {
    if (err)
    res.send(err);
    //setting the new author and description to whatever was changed. If
    //nothing was changed we will not alter the field.
    (req.body.author) ? extension.author = req.body.author : null;
    (req.body.description) ? extension.description = req.body.description : null;
    (req.body.name) ? extension.name = req.body.name : null;
    (req.body.version) ? extension.version = req.body.version : null;

    //save changes
    extension.save(function(err) {
      if (err)
      res.send(err);
      res.json({ message: 'Extension has been updated' });
    });
  });
})
//delete method for removing a extension from our database
.delete(function(req, res) {
  //selects the extension by its ID, then removes it.
  Extension.remove({ _id: req.params.extension_id }, function(err, extension) {
  if (err)
  res.send(err);
  res.json({ message: 'Extension has been deleted' })
  })
});

//Use our router configuration when we call /api
app.use('/api', router);

app.listen(port, () => console.log(`Listening on port ${port}`));