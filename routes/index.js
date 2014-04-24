
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
  // http://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
  // http://blog.ksetyadi.com/2011/10/nodejs-and-mongodb-a-beginners-approach/
/*
  var MongoClient = require('mongodb').MongoClient
  var format = require('util').format;
  
  MongoClient.connect('mongodb://127.0.0.1:27017/is217', function(err, db) {
    if(err) throw err;
  
    var collection = db.collection('data');
   
    collection.count(function(err, count) {
      console.log(format("count = %s", count));
    });

    // Locate all the entries using find
    collection.find().toArray(function(err, results) {
      
      
      console.dir(results);
      // Let's close the db
      db.close();
    });
   
  })
  
  */
  var mongo = require('mongodb'),
  Server = mongo.server,
  Db = mongo.Server; 
  
  var server = new Server('localhost', 27017, {auto_reconnect: true});
  var db = new Db('is217', server);
  
  var onErr = function(err, callback){
    db.close();
    callback(err);
  };
  
  
    console.log(results); 
    
    console.log(req.route.method);
    
    console.log(req.body);
    res.write("return"); 
    res.end(); 
}


