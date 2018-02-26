function MachinesController() {

  var that = this;
  var mongodb = require('mongodb').MongoClient;
  var url     = "mongodb://localhost:27017/provisioning";
  var sha256  = require('sha256');


  // CREATE NEW ITEM
  that.post = function(req,res,next) {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

    var machineRecord = req.body.machine;

    mongodb.connect(url, function(err,db) {
        if (err) {
            throw err;
        }
        else {
            db.collection("machines").save( machineRecord, function(err,result){
                if (err) {
                    throw err;
                    res.json({"status":"error"});
                    db.close();
                }
                else {
                    res.json({"status":"ok"});
                    console.log("Created Machine Record");
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
            db.collection("machines").find().toArray(function(err,result){
                if (err) {
                    throw err;
                    res.json({"status":"error"});
                    db.close();
                }
                else {
                    res.json(result);
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
          var query = {$text:{$search: value}};
          db.collection("machines").find(query).toArray(function(err,result){
            if (err) {
              throw err;
              res.json({"status":"error"});
              db.close();
            }
            else {
              res.json(result);
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

    var machineRecord = req.body.machine;

    mongodb.connect(url, function(err,db) {
        if (err) {
            throw err;
        }
        else {
            db.collection("machines").save( adminAccount, function(err,result){
                if (err) {
                    throw err;
                    res.json({"status":"error"});
                    db.close();
                }
                else {
                    res.json({"status":"ok"});
                    console.log("Machine Updated");
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

    var machineRecord = req.body.machine;

    mongodb.connect(url, function(err,db) {
        if (err) {
            throw err;
        }
        else {
            db.collection("machines").remove( machineRecord, function(err,result){
                if (err) {
                    throw err;
                    res.json({"status":"error"});
                    db.close();
                }
                else {
                    res.json({"status":"ok"});
                    console.log("Machine Record Removed");
                    db.close();
                }
            });
        }
    });
    next();
  };

};
module.exports = new MachinesController();
