var mongo = require('mongodb');

var BSON = require('bson').BSONPure;

var MongoClient = require('mongodb').MongoClient;
var URL = 'mongodb://localhost:27017/channels';

exports.findAll = function(req, res) {
        MongoClient.connect(URL, function(err, db) {
                if (err) return;
                db.collection('allchannels', function(err, collection) {
                        collection.find().toArray(function(err, items) {
                                res.send(items);
                                db.close();
                        });
                });
        });
};
