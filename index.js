var restify  = require('restify');
var mongodb  = require('mongodb').MongoClient;
var url      = "mongodb://localhost:27017/provisioning";

admins   = require('./admins');
machines = require('./machines');

var server  = restify.createServer();
server.use(restify.plugins.bodyParser());


server.post('/admins', admins.post);
 server.get('/admins', admins.get);
 server.get('/admins/:value', admins.getByValue);
 server.put('/admins', admins.put);
 server.del('/admins', admins.delete);

server.post('/machines', machines.post);
 server.get('/machines', machines.get);
 server.get('/machines/:value', machines.getByValue);
 server.put('/machines', machines.put);
 server.del('/machines', machines.delete);


server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});
