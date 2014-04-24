
/*
 * GET home page.
 */

//var utilities = require("../lib/utils");

/*
//get the mongoose object. 
var mongoose = require('mongoose'); //mongo db api.

//connec to the database
mongoose.connect('mongodb://localhost/');

//require the record model 
require('../models/record');

//get the data collection
var data = mongoose.model('Record'); 
*/


exports.index = function(req, res){
  
  res.render('index', { title: '2010-2011 Tuition Rates' });
};


exports.list = function (req, res) {
  
  var MongoClient = require('mongodb').MongoClient
  var format = require('util').format;

  MongoClient.connect('mongodb://127.0.0.1:27017/is217', function(err, db) {
    if(err) throw err;
    
    var collection = db.collection('data');
    
    var fields = {
      'id': 1,
      'name': 1
    }
    
    var options = {
      'sort': 'name',
      'limit': 50,
      'skip': 50
    }
   
    // Locate all the entries using find
    collection.find({}, fields, options).toArray(function(err, results) {
      
      res.json(JSON.stringify(results));
      
      console.dir(results);
      // Let's close the db
      db.close();
    });
  
  })
  
}

//load the next set of results. 
exports.next = function (req, res) {
  
}


