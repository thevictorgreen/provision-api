function AdminsController() {

  var that = this;
  var mongodb = require('mongodb').MongoClient;
  var url     = "mongodb://localhost:27017/provisioning";
  var sha256  = require('sha256');


  // CREATE NEW ITEM
  that.post = function(req,res,next) {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

    var adminAccount = req.body.auth;
    adminAccount.password = sha256(req.body.auth.password);

    mongodb.connect(url, function(err,db) {
        if (err) {
            throw err;
        }
        else {
            db.collection("authorized_admins").save( adminAccount, function(err,result){
                if (err) {
                    throw err;
                    res.json({"status":"error"});
                    db.close();
                }
                else {
                    res.json({"status":"ok"});
                    console.log("Created Admin Account");
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
            db.collection("authorized_admins").find().toArray(function(err,result){
                if (err) {
                    throw err;
                    res.json({"status":"error"});
                    db.close();
                }
                else {
                    res.json(result);
                    //console.log(result);
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
          db.collection("authorized_admins").find(query).toArray(function(err,result){
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

    var adminAccount = req.body.auth;
    adminAccount.password = sha256(req.body.auth.password);

    mongodb.connect(url, function(err,db) {
        if (err) {
            throw err;
        }
        else {
            db.collection("authorized_admins").save( adminAccount, function(err,result){
                if (err) {
                    throw err;
                    res.json({"status":"error"});
                    db.close();
                }
                else {
                    res.json({"status":"ok"});
                    console.log("Admin Account Updated");
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

    var adminAccount = req.body.auth;
    adminAccount.password = sha256(req.body.auth.password);

    mongodb.connect(url, function(err,db) {
        if (err) {
            throw err;
        }
        else {
            db.collection("authorized_admins").remove( adminAccount, function(err,result){
                if (err) {
                    throw err;
                    res.json({"status":"error"});
                    db.close();
                }
                else {
                    res.json({"status":"ok"});
                    console.log("Admin Account Removed");
                    db.close();
                }
            });
        }
    });
    next();
  };

};
module.exports = new AdminsController();
