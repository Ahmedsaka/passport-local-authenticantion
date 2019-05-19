const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const mongoose = require('mongoose');
const users = require('../models/users');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res, next)=>{
  console.log('First log');
  console.log(req.sessionID);
  res.send('<html><h1><p>Hello, world</p></h1></html>');
})

router.get('/allUsers',  async (req, res, next)=>{
  const user = await users.find();
  if(user){
    res.status = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({users: user});
  }
  else{
    var err = new Error('Users not found');
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.json({'Status': 'Failed!'});
    return err;
  }
});

router.post('/login', passport.authenticate('local'), (req, res, next)=>{

  if(req.user){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
  //  res.json({'loginStatus': 'Successful!'});
    res.send(`Welcome, ${req.body.username}`);
  }
  else {
    res.statusCode = 404;
    var err = new Error('The user can\'t be found!')
    res.setHeader('Content-Type', 'application/json');
    res.json({'loginStatus': 'Failed!'});
    return err;
  }
})

router.post('/signup', async(req, res, next)=>{
  //Checks if the user exists
  var user = await users.findOne({email: req.body.email});//Don't do anythig until user is returned
  if(user == null){
    user = new users({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });
    await user.save();
    console.log('user created!');
    res.send(user);
  }else{
    var err = new Error('User already exits!');
    res.status = 400;
    res.setHeader('Content-Type', 'application/json');
    //res.redirect('/signup');
    res.send('<html><h1><p>This user already exist!</p></h1></html>');
    console.log(err);
  }
});

router.get('/logout', (req, res, next)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
});

module.exports = router;
