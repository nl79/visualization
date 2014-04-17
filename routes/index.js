
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.load = function(req, res) {
  //import the csv data into the mongo db.
  var csv = require('csv');
  //records array
  var records = new Array();
  
  //require fs
  var fs = require('fs');
  
  //require the mongo
  var MongoClient = require('mongodb').MongoClient;
  
  //build the records array. 
  csv(records)
   .from.stream(fs.createReadStream('./misc/tuition_rates.csv'), { columns: true })
   .on('record', function (row, index) {
    records.push(row);
    console.log(row);
    }).on('end', function (count) {
    
   // Connect to the db
      MongoClient.connect("mongodb://localhost:27017/is217", function (err, db) {
        //create a collection
        var collection = db.collection('data')
        collection.insert(records, function (err, doc) {
           console.log(doc);
      });
   });
   console.log('Number of lines: ' + count);
});
  
  
  
  res.render('index', { title: "Import Successful"}); 
}; 