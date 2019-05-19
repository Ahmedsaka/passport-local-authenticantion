const express = require('express');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const config = require('./config');

const app = express();

const user = require('./routes/user');

const connect = mongoose.connect(config.mongoUrl);
connect.then((db)=>{
  console.log('connected correctly');
}).catch((err)=>{
  console.log(err);
})

app.use(cookieParser());
app.use(session({
  genid: (req)=>{
    console.log('sessionId has been generated!');
    return uuid();
  },
  store: new FileStore(),
  secret: config.secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60
  }
}));

app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/user', user);

app.listen(config.port, ()=>{
  console.log(`App is running on localhost:${config.port}`);
});
