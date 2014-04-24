var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

/**
 * Record Schema
 */
var Record = new Schema({
  cid: Number,  
  name: String,
  tuition: Number,
  indist_on_campus: Number,
  instate_on_campus: Number,
  outstate_on_campus: Number,
  indist_off_campus: Number,
  instate_off_campus: Number,
  outstate_off_campus: Number,
  indis_off_campus_family: Number,
  instate_off_campus_family: Number,
  outstate_off_campus_family: Number
});

mongoose.model('Record', Record); 