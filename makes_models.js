function MakesModelsController() {

  var that = this;
  var mongodb = require('mongodb').MongoClient;
  var url     = "mongodb://localhost:27017/provisioning";
  var sha256  = require('sha256');



  // CREATE NEW ITEM
  that.post = function(req,res,next) {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

    var modelRecord = req.body.model;

    mongodb.connect(url, function(err,db) {
        if (err) {
            throw err;
        }
        else {
            db.collection("makes_models").save( modelRecord, function(err,result){
                if (err) {
                    throw err;
                    res.json({"status":"error"});
                    db.close();
                }
                else {
                    res.json({"status":"ok"});
                    console.log("Created Model Record");
                    db.close();
                }
            });
        }
    });
    next();
  };


  // RETREIVE ALL ITEMS
  that.get = function(req,res,next) {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');


    mongodb.connect(url, function(err,db) {
        if (err) {
            throw err;
        }
        else {
            db.collection("makes_models").find().toArray(function(err,result){
                if (err) {
                    throw err;
                    res.json({"status":"error"});
                    db.close();
                }
                else {
                    var results = {};
                        results.status = "SUCCESS";
                        results.data = result;
                    res.json(results);
                    db.close();
                }
            });
        }
    });
    next();
  };


  // RETREIVE ALL ITEMS MATCHING A PARAMETER
  that.getByValue = function(req,res,next) {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

    value = req.params.value;

    mongodb.connect(url, function(err,db) {
        if (err) {
            throw err;
        }
        else {
          var query = {"make":value};
          db.collection("makes_models").find(query).toArray(function(err,result){
            if (err) {
              throw err;
              res.json({"status":"error"});
              db.close();
            }
            else {
              var results = {};
              results.status = "SUCCESS";
              results.data = result;
              res.json(results);
              db.close();
            }
          });
        }
    });
    next();
  };



  // UPDATE ITEM MATCHING THIS _id
  that.put = function(req,res,next) {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

    var modelRecord = req.body.model;

    mongodb.connect(url, function(err,db) {
        if (err) {
            throw err;
        }
        else {
            db.collection("makes_models").save( modelRecord, function(err,result){
                if (err) {
                    throw err;
                    res.json({"status":"error"});
                    db.close();
                }
                else {
                    res.json({"status":"ok"});
                    console.log("Model Updated");
                    db.close();
                }
            });
        }
    });
    next();
  };


  // REMOVE ITEM MATCHING this _id
  that.delete = function(req,res,next) {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

    var modelRecord = {};
    modelRecord._id = req.params.value;

    mongodb.connect(url, function(err,db) {
        if (err) {
            throw err;
        }
        else {
            db.collection("makes_models").remove( modelRecord, function(err,result){
                if (err) {
                    throw err;
                    res.json({"status":"error"});
                    db.close();
                }
                else {
                    res.json({"status":"ok"});
                    console.log("Model Record Removed");
                    db.close();
                }
            });
        }
    });
    next();
  };



};
module.exports = new MakesModelsController();
