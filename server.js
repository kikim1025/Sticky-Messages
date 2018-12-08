const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const envVar = require(`./envVar`);
for (let v in envVar) {
    process.env[v] = envVar[v]; //in case i need more env variables
}

const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, `/client/public`)));
app.set("JWTKey", process.env.JWT_KEY);

/*
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
} else {
  mongoose.connect(database, { useNewUrlParser: true });
}
*/

mongoose.connect('mongodb://localhost/sticky-notes_db', { useNewUrlParser: true });

require('./routes/apiRoutes')(app);

app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});