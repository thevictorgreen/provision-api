var restify  = require('restify');

const corsMiddleware = require('restify-cors-middleware');
const cors = corsMiddleware({
  origins: ['*']
});

var mongodb  = require('mongodb').MongoClient;
var url      = "mongodb://localhost:27017/provisioning";

tripleA  = require('./triplea');
admins   = require('./admins');
machines = require('./machines');
makes    = require('./makes_models');
dell     = require('./dell');

var server  = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());


server.post('/triplea', tripleA.post);

server.post('/admins', admins.post);
 server.get('/admins', admins.get);
 server.get('/admins/:value', admins.getByValue);
 server.put('/admins', admins.put);
 server.del('/admins', admins.delete);

server.post('/machines', machines.post);
 server.get('/machines', machines.get);
 server.get('/machines/:value', machines.getByValue);
 server.put('/machines', machines.put);
 server.del('/machines/:value', machines.delete);

server.post('/makes', makes.post);
 server.get('/makes', makes.get);
 server.get('/makes/:value', makes.getByValue);
 server.put('/makes', makes.put);
 server.del('/makes/:value', makes.delete);

 server.get('/dell/:value', dell.getByValue);


server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});
