var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var BSON = require('bson').BSONPure;

var MongoClient = require('mongodb').MongoClient;
// var URL = 'mongodb://localhost:27017/users';
var URL = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost:27017/users';

exports.findAll = function(req, res) {
        MongoClient.connect(URL, function(err, db) {
                if (err) return;
                db.collection('allusers', function(err, collection) {
                        collection.find().toArray(function(err, items) {
                                res.send(items);
                                db.close();
                        });
                });
        });
};

exports.findById = function(req, res) {
        var id = req.params.id;
        console.log('Retrieving details for user with id: ' +id);
        MongoClient.connect(URL, function(err, db) {
                if (err) return;
                db.collection('allusers', function(err, collection) {
                        collection.findOne({'_id': new ObjectId(id)}, function(err, item) {
                                res.send(item);
                                db.close();
                        });
                });
        });
};

exports.patch = function(req, res) {
        var patchData = req.body;
        var id = req.params.id;
        console.log('Replacing users channels with data: ' +patchData);
        MongoClient.connect(URL, function(err, db) {
                if (err) return;
                db.collection('allusers', function(err, collection) {
                        collection.update({'_id': new ObjectId(id)}, {$set: {'channels': patchData.channels}}, function(err, item) {
                                res.send((!err) ? patchData : {msg:'error'});
                                db.close();
                        });
                });
        });
};