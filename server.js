const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const apiRoutes = require('./api-routes.js');
const cors = require("cors");

const app = express();
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

app.use(cors());

mongoose.connect(process.env.NODE_ENV === "test" ? "mongodb://localhost:27017/testDB" : process.env.MONGODB_URL,
{ 
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

const port = process.env.PORT || 8080;

app.get('/', (req, res, next) =>
{
	//app.use(express.static(__dirname + '/docs'));
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', req.header('Origin') || '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS,PATCH");
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.status = 200;
	next();
});

app.use('/', apiRoutes);

app.listen(port, function () {
     console.log("API running on port " + port);
});

module.exports = app;