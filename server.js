const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));
  // Set environmental variable for JWT auth. This is for heroku production, as heroku defaults to 'production' for Node.js applications 
  app.set('JWTKey', process.env.JWTKey);
} else {
  app.use(express.static(path.join(__dirname, './client/public')));
  // For local testing. Pretty creative key name.
  app.set('JWTKey', 'process.env.JWTKey');
}

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sticky-messages_db';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});