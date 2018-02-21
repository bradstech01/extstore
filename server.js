'use strict'
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Extension = require('./model/extensions');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
//
//  MONGODB API
//

const app = express();
const router = express.Router();
const port = process.env.PORT || 3001;
const url = process.env.MONGOLAB_URI;

//MongoDB configuration
mongoose.connect(url);

//Configures the API to use bodyParser to look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//EXTENSION DELIVERY
//This section of code deals with delivering the extension files
app.use(express.static(path.join(__dirname,"public")));

app.get('/db/:type/:id', function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept,Access-Control-Request-Method, Access-Control-Request-Headers');
  //and remove cacheing so we get the most recent data
  res.setHeader('Cache-Control', 'no-cache');

  //set mime-types and filepath request based on type of file we want to get

  if (req.params.type === 'crx') {
    res.setHeader('Content-Type', 'application/x-chrome-extension');
    res.setHeader('Content-Disposition', 'inline; filename: dist.crx');
    res.download(__dirname + "/public/database/" + req.params.id +'/dist.crx');
  }
  else if (req.params.type === 'xpi') {
    res.setHeader('Content-Type', 'application/x-xpinstall');
    res.setHeader('Content-Disposition', 'inline; filename: dist.xpi');
    res.download(__dirname + "/public/database/" + req.params.id +'/dist.xpi','dist.xpi');
  }
});

//EXTENSIONS api
//This section of code deals with actually making requests to the MongoDB server
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //and remove cacheing so we get the most recent data
  res.setHeader('Cache-Control', 'no-cache');
  next();
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
  extension.live = req.body.live;

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
    (req.body.author) ? extension.author = req.body.author : null;
    (req.body.description) ? extension.description = req.body.description : null;
    (req.body.name) ? extension.name = req.body.name : null;
    (req.body.version) ? extension.version = req.body.version : null;
    (req.body.live) ? extension.live = req.body.live : null;

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
