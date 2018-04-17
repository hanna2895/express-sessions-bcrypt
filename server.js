const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

require('./db/db');

// middleware
app.use(session({
	secret: 'help I am sleepy af', // used to encrypt cookie, make up a phrase CAREFUL YOU DON'T GET HACKED
	resave: false,
	saveUninitialized: false
})); // session is a function, takes an object

app.use(bodyParser.urlencoded({
	extended: false
}));

// controllers
const userController = require('./controllers/userController.js');
app.use('/users/', userController);

app.get('/', (req, res) => {
	res.render('links.ejs') // or could also redirect to something that does work		
})


app.get('*', (req, res) => {
	res.status(404).send('this is not a page yo')		
}) // <- this is called a glob / wildcard

app.listen(PORT, () => {
	const d = new Date(Date.now())
	console.log(d.toString() + ": server running on port " + PORT);
})