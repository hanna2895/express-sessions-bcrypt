const express = require('express');
const app = express();
const PORT = 3000;

require('./db/db');

// controllers
const userController = require('./controllers/userController.js');
app.use('/users/', userController);


app.get('*', (req, res) => {
	res.status(404).send('this is not a page yo')		
}) // <- this is called a glob / wildcard

app.listen(PORT, () => {
	const d = new Date(Date.now())
	console.log(d.toString() + ": server running on port " + PORT);
})