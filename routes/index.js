
/*
 * GET home page.
 */
//load the database connection
var utilities = require("../lib/utils.js");

//get the mongoose object. 
var mongoose = require('mongoose'); //mongo db api. 

exports.index = function(req, res){
  
  res.render('index', { title: '2010-2011 Tuition Rates' });
};

exports.load = function (req, res) {
    var conn = utilities.utils.getDBConn();
    
    conn.use('data'); 
    
    
    
    console.log(req.route.method);
    
    console.log(req.body);
    res.write("return"); 
    res.end(); 
}


