// db.config.js

// Export the configuration parameters for MongoDB connection
module.exports = {
    // The URI is the connection string that you copied from Atlas
    uri: process.env.MONGO_URI ,
    // The database name is the name of your database in MongoDB
    database: 'myapp',
    // The options are some additional settings for the connection
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     
    }
  };
  