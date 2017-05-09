var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function (nav) {

    adminRouter.route('/addColleges')
        .get(function (req, res) {
            var url =
                'mongodb://localhost:27017/Colleges';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('colleges');
                collection.insertMany(colleges,
                    function (err, results) {
                        res.send(results);
                        db.close();
                    }
                );

            });

            //res.send('inserting colleges');
        });

    return adminRouter;
};

module.exports = router;