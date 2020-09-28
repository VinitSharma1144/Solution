//jshint esversion:6
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/codeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: mongoose.Schema.Types.Mixed,
  password: mongoose.Schema.Types.Mixed,
  address: [{
    location: String,
    pin_code: Number,
    user_id: Number
  }]
});

const User = mongoose.model('User', userSchema);

//Chaining routes here

app.post("/user",function(req, res) {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(err) {
    if (!err) {
      res.send('Successfully created a user');
    } else {
      res.send(err);
    }
  });
});

app.put('/user/:user_id',function(req,res){
  User.update(
    {user_id:req.params.user_id},
    {
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
    },
    {overwrite:true},
    function(err){
      if(!err){
        res.send('Edited user details');
      }else{
        res.send(err);
      }
    }


  );
});

app.patch('/user/:user_id', function(req, res) {
  let userPassword = req.body.password;
  if(userPassword === password){}
    User.update(
      {user_id:req.params.id},
      {$set:{password:req.body.password}}

    );

});

app.get('/user', function(req, res) {
  User.find(function(err, foundUser) {
    if (!err) {
      res.send(foundUser);
    } else {
      res.send(err);
    }
  });
});

app.delete('/user/:user_id', function(req, res) {
  User.deleteOne({
      user_id: req.body.user_id
    },
    function(err) {
      if (!err) {
        res.send("Successfully deleted user");
      } else {
        res.send(err);
      }
    }
  );
});

app.listen(3000, function() {
  console.log('listening on 3000');
});
