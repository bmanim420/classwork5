var http = require('http');
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  var server = http.Server(app);
  var mongo = require('mongodb');
  var db, uri = "mongodb://"+process.env.IP+":27017";
  const mongoose = require('mongoose');
  mongoose.connect("mongodb://localhost:27017/TechSupport");
  
  
  mongoose.connection.on('error', function(){
    console.log('Could not connect to mongodb');
  });
  
  var userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: "Name is required"
    },
      email: String,
      issue: String
  });
  var User  = mongoose.model('User', userSchema);
  
  mongo.MongoClient.connect(uri,
          {useNewUrlParser:true},
          function(err, client){
            if(err){
              console.log('Could not connect to MongoDB');
            }else{
              db = client.db('TechSupport');
            }
          });
 
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
  
  app.get('/show_user', function(req, res){
  
    User.find({},function(err,data){
      
      if(err)throw err;
      res.render('user',{users:data})
      console.log(data);
    });
  });
  
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });
  
  