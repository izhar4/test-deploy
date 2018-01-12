const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;


/*var server = app.listen(8081,function(){
  console.log("server listening at 8081");
  console.log("number of cpu ", numCPUs)
});
*/
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}else {
    var express = require('express');
    var app = express();
    var path = require('path');
    var mongoose = require('mongoose');
    var router = require('./routes/router');
    var bodyParser = require("body-parser");

    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());



    app.use(express.static(path.join(__dirname, '/public')));

     app.use('/',router);
     app.listen(8081);

    console.log(`Worker ${process.pid} started`);
}









