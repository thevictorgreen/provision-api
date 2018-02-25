var restify = require('restify');
var mongodb = require('mongodb').MongoClient;
var url     = "mongodb://localhost:27017/provisioning";

var server = restify.createServer();
server.get('/machines', machinesFunction);
server.get('/machines/:value', searchMachines);

function machinesFunction(req, res, next) {

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
                   db.close();
               }
               else {
                   res.json(result);
                   console.log(result);
                   db.close();
               }
           });
       }
   });
   next();
}



function searchMachines(req, res, next) {

   res.setHeader('Content-Type', 'application/json');
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

   host = req.params.value;
   
   mongodb.connect(url, function(err,db) {

       if (err) {
           throw err;
       }
       else {
           var query = {$text:{$search: host}};
           db.collection("machines").find(query).toArray(function(err,result){
               if (err) {
                   throw err;
                   db.close();
	       }
               else {
                   res.json(result);
                   console.log(result);
                   db.close();
               }
           });
       }
   });
   next();
}


server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});
