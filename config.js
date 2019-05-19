/*
Configurations parameters
*/

module.exports={
  port: (process.env.PORT || 5000),
  secretKey: 'tomcat',
  mongoUrl: 'mongodb://localhost:27017/authTut'
}
