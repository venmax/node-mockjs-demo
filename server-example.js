var applicationRoot = __dirname.replace(/\\/g,"/"),
    ipAddress = process.env.OPENSHIFT_NODEJS_IP || 'localhost', //or your ip address
    port = process.env.OPENSHIFT_NODEJS_PORT || 3000, //port to use
    mockRoot = applicationRoot + '/json', //mockjs json file dir to load
    apiRoot = '/api'; //target root

/* Create Express application */
var express = require("express");
var logger = require('morgan');
var errorHandler = require('express-error-handler');
var mockjs = require('express-mockjs');

var app = express();

/* Configure a simple logger and an error handler. */
app.use(logger("default"));
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

/* Use mockjs in json folder */
app.use(apiRoot, mockjs(mockRoot));

/* Start the API mock server. */
console.log('Application root directory: [' + applicationRoot +']');
app.listen(port,ipAddress,function(){
  console.log('Mock Api Server listening: [http://' + ipAddress + ':' + port + ']');
});