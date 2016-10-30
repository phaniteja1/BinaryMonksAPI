var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// allow cross origin requests
app.use(function(req, res, next){
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
});

// var dailyjs = require('./routes/feed/dailyjs');
// var aListApart = require('./routes/feed/a-list-apart');

// // returns all channels list
// var channels = require('./routes/channels/allchannels');

// returns users data (all users and user by id)
var users = require('./routes/users/allusers');

// // daily JS feed
// app.get('/dailyjs', dailyjs.findAll);

// // A List Apart feed
// app.get('/feeditems', aListApart.findAll);

// // get all channels list
// app.get('/channels', channels.findAll);

/**
 * Users
 */

// get all users
app.get('/users', users.findAll);

// get user by id
app.get('/users/:id', users.findById);

// delete user by id of course
app.patch('/users/:id', users.patch);

var router      =   express.Router();

app.set('port', (process.env.PORT || 3003));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.

// router.route("/files")
//     .get(function(req,res){
//       var response = {};
//       mongoOp.find({},function(err,data){
//       // Mongo command to fetch all data from collection.
//           if(err) {
//               response = {"error" : true,"message" : "Error fetching data"};
//           } else {
//               response = {"error" : false,"message" : data};
//           }
//           res.json(response);
//       });
//     })
//     .post(function(req,res){

//         var db = new mongoOp();
//         var response = {};

//         db.filename = req.body.filename;
//         db.filecontents =  req.body.filecontents;

//         db.save(function(err){
//         // save() will run insert() command of MongoDB.
//         // it will add new data in collection.
//             if(err) {
//                 response = {"error" : true,"message" : "Error adding data"};
//             } else {
//                 response = {"error" : false,"message" : "Data added : " + req.body};
//             }
//             res.json(response);
//         });
//     });

//     router.route("/file/:id")
//     .get(function(req,res){
//         var response = {};
//         mongoOp.findById(req.params.id,function(err,data){
//         // This will run Mongo Query to fetch data based on ID.
//             if(err) {
//                 response = {"error" : true,"message" : "Error fetching data"};
//             } else {
//                 response = {"error" : false,"message" : data};
//             }
//             res.json(response);
//         });
//     })
