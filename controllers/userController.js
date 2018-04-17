const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', (req, res) => {
	res.send('user controller')		
})

router.get('/register', (req, res) => {
	console.log(req.session);
	res.render('register.ejs');		
})

router.post('/register', (req, res) => {
	

	// you can add whatever data you want
	req.session.username = req.body.username;
	req.session.loggedIn = true;
	req.session.message = "Thanks for signing up"

	console.log(req.session, "hey this was logged");

	res.redirect('/home')

	// res.send(req.body)		
})

module.exports = router;