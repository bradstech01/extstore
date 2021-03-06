//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
const ExtensionsSchema = new Schema({
 author: String,
 description: String,
 name: String,
 version: String,
 live: Boolean,
});

//export our module to use in server.js
module.exports = mongoose.model('Extension', ExtensionsSchema);
