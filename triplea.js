function TripleAController() {

  var that = this;
  var mongodb = require('mongodb').MongoClient;
  var url     = "mongodb://localhost:27017/provisioning";
  var sha256  = require('sha256');


  // CREATE NEW ITEM
  that.post = function(req,res,next) {

    res.setHeader('Content-Type', 'application/json');

    var adminAccount = req.body.auth;
    var username = adminAccount.username;
    adminAccount.password = sha256(req.body.auth.password);

    mongodb.connect(url, function(err,db) {
        if (err) {
            throw err;
        }
        else {
            var query = {$text:{$search: username}};
            db.collection("authorized_admins").find(query).toArray(function(err,result){
              if (err) {
                throw err;
                console.log( {"status":"ERROR"} );
                res.json({"status":"error"});
                db.close();
              }
              else {
                //res.json(result);
                if ( adminAccount.password === result[0].password) {
                  console.log( {"status":"YOU MADE IT"} );
                  res.json({"status":"SUCCESS"});
                }
                else {
                  //console.log(adminAccount.password + ":" + result[0].password);
                  console.log( {"status":"BAD USERNAME PASSWORD COMBO"} );
                  res.json({"status":"ERROR"});
                }
                db.close();
              }
            });
          }
    });
    next();
  };

};
module.exports = new TripleAController();
