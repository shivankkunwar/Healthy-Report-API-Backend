
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
        const report = new Report({ ...req.body, email: email });
        await report.save();
    
    res.status(201).json(report);
  } catch (error) {
    
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
    const reports = await Report.find({ email: email });

    const {sortColumn, sortOrder} =req.query;
    let sortedReports= reports;
    if (sortColumn === "name") {
      sortedReports.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    } else if (sortColumn === "date") {
      sortedReports.sort((a, b) => {
        if (sortOrder === "asc") {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      });
    } else if (sortColumn === "time") {
      sortedReports.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.time.localeCompare(b.time);
        } else {
          return b.time.localeCompare(a.time);
        }
      });
    }

    res.send(sortedReports); 
    
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
