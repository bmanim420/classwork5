var http = require('http');
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  var server = http.Server(app);
  var mongo = require('mongodb');
  //for local
  //var db, uri = "mongodb://localhost:27817";
  //for c9
  var db, uri = "mongodb://"+process.env.IP+":27017";
  const mongoose = require('mongoose');
  mongoose.connect("mongodb://localhost:27017/node-cw8");
  
  
  mongoose.connection.on('error', function(){
    console.log('Could not connect to mongodb');
  });
  
  var userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: "Name is required"
    },
      email: String
  });
  var User  = mongoose.model('User', userSchema);
  
  mongo.MongoClient.connect(uri,
          {useNewUrlParser:true},
          function(err, client){
            if(err){
              console.log('Could not connect to MongoDB');
            }else{
              db = client.db('node-cw8');
            }
          });
  /*
  var save = function(form_data){
    db.createCollection('users', function(err, collection){});
    var collection = db.collection('users');
    collection.save(form_data);
  }
  */
  app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
  });
  
  app.post('/submit_user', function(req, res){
    console.log(req.body);
    var new_user = new User(req.body);
    new_user.save(function(err, data){
      if(err){
        return res.status(400)
        .json({message:"Couldn't save user"})
      }
      res.status(200).json(data);
    });
    //save(req.body);
    
  });
  
  app.get('/about', function(req, res){
    res.sendFile(__dirname+'/about.html');
  });
  
  app.get('/form', function(req, res){
    res.sendFile(__dirname+'/form.html');
  });
  
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });
  
  