
/*
 * GET home page.
 */
  //import the mongo db. 
  var MongoClient = require('mongodb').MongoClient
  //import the format utility
  var format = require('util').format;

exports.index = function(req, res){
  
  res.render('index', { title: '2010-2011 Tuition Rates' });
};


exports.list = function (req, res) {
  
  MongoClient.connect('mongodb://127.0.0.1:27017/is217', function(err, db) {
    if(err) throw err;
    
    var collection = db.collection('data');
    
    //build a regular expression search query. 
    var query = {
      'name': new RegExp('^' + req.body.name, 'i')
    }
    
    //limit the display fields 
    var fields = {
      'id': 1,
      'name': 1
    }
    
    //set the options to sort by name. 
    var options = {
      'sort': 'name',
    }
   
    // Locate all the entries using find
    collection.find(query, fields, options).toArray(function(err, results) {
      
      res.json(JSON.stringify(results));
      
      //console.dir(results);
      // Let's close the db
      db.close();
    });
  })
}

//load the next set of results. 
exports.load = function (req, res) {

  MongoClient.connect('mongodb://127.0.0.1:27017/is217', function(err, db) {
    if(err) throw err;
    
    var collection = db.collection('data');
 
    var fields = {};
    var options = {}; 
   
    // Locate all the entries using find
    collection.find(req.body, fields, options).toArray(function(err, results) {
      
      res.json(JSON.stringify(results));
      
      //console.dir(results);
      // Let's close the db
      db.close();
    });
  })
}


