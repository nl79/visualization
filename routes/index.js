
/*
 * GET home page.
 */
//load the database connection
require("../lib/utils.js"); 

exports.index = function(req, res){
  
  res.render('index', { title: '2010-2011 Tuition Rates' });
};

exports.load = function (req, res) {
  console.log('loading'); 
}
