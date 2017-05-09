var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId= require('mongodb').ObjectID;
var router = function(nav) {
 
  colRouter.use(function(req, res, next) {
    if (!req.user) {
      res.redirect('/');
    }
    next();
  });
  colRouter.route('/')
    .get(function(req, res) {
      var url =
      'mongodb://localhost:27017/Colleges';
          mongodb.connect(url, function (err, db) {
            var collection = db.collection('colleges');
            collection.find({}).toArray(
              function(err,results){
                  res.render('colListView', {
                    nav: nav,
                    colleges: results
                  });
              })
          });
    });

  colRouter.route('/:id')
    .get(function(req, res) {
      var id = new objectId(req.params.id);
      var url =
      'mongodb://localhost:27017/Colleges';
          mongodb.connect(url, function (err, db) {
          var collection = db.collection('colleges');
            collection.findOne({_id: id},
              function(err,results){
                  res.render('colView', {
                    nav: nav,
                    colleges: results
                  });
              });
              
          })
      
     
    });

  return colRouter;
};


module.exports = router;