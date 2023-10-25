// report.js

// Import the mongoose library
const mongoose = require('mongoose');

// Create a schema for the report collection
const reportSchema = new mongoose.Schema({
 
  name: { type: String, required: true },
 
  date: { type: Date, required: true },
  
  time: { type: String, required: true },
  
  injuries: [{
   
    number: { type: Number, required: true },
    
    area: { type: String, required: true },
    
    details: { type: String },

    x: { type: Number, required: true },
   
    y: { type: Number, required: true }
  }]
});

// Create a model for the report collection
module.exports = mongoose.model('Report', reportSchema);
