var http = require('http');
  var express = require('express');
  var app = express();
  var server = http.Server(app);
  
  
  app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
  })
  
  app.get('/about', function(req, res){
    res.sendFile(__dirname+'/about.html');
  });
  
  app.get('/form', function(req, res){
    res.sendFile(__dirname+'/form.html');
  });
  
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });
  
  