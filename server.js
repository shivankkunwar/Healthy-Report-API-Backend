
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { requiresAuth } = require('express-openid-connect');
const Report = require("./models/report.js");
const dbConfig = require("./db.config.js");
require('dotenv').config();
const  jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');
const app = express();
app.use(express.json());
app.use(cors());
const { auth }  = require('express-oauth2-jwt-bearer');
const jwtCheck = auth({
    audience: 'Health api unique Identifier',
    issuerBaseURL: 'https://dev-gana4pxtp6vnixt2.au.auth0.com/',
    tokenSigningAlg: 'RS256'
  });
  
  // enforce on all endpoints
  app.use(jwtCheck);
  




app.post('/api/report', async (req, res) => {
    
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const response = await axios.get('https://dev-gana4pxtp6vnixt2.au.auth0.com/userinfo',{
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        });
        const userInfo = response.data;
        const email= userInfo.email;
        const report = new Report({ ...req.body, name: email });
        await report.save();
    // Send a success response with the report
    res.status(201).json(report);
  } catch (error) {
    // Send an error response with the error message
    res.status(500).json({ message: error.message });
  }
});

app.get("/testing",async (req,res) =>{
    try{
        const accessToken = req.headers.authorization.split(' ')[1];
        const response = await axios.get('https://dev-gana4pxtp6vnixt2.au.auth0.com/userinfo',{
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        });
        const userInfo = response.data;
        console.log(userInfo);
        res.send(userInfo);      
    }
    catch(error){
      console.log(error.message);
    }

    
})
app.get('/api/report', async (req, res) => {
  try {
    
    const accessToken = req.headers.authorization.split(' ')[1];
    const response = await axios.get('https://dev-gana4pxtp6vnixt2.au.auth0.com/userinfo',{
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    });
    const userInfo = response.data;
    const email= userInfo.email;
    
    const reports = await Report.find({ name: email });
    
    res.status(200).json(reports);
  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
});




mongoose.connect(process.env.MONGO_URI, dbConfig.options)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error));


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
