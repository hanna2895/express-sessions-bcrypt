const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
	res.send('user controller')		
})

router.get('/register', (req, res) => {
	console.log(req.session);
	const message = req.session.message;
	req.session.message = null;
	res.render('register.ejs', {
		message: message
	});		
})

router.post('/register', (req, res) => {
	// capture password
	const password = req.body.password;

	// hash the password
	// 1st param = the pwd you are encrypting
	// 2nd param = the algorithm we encrypt with (& salt)
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	//this is the obj we will store in our db
	const userDbEntry = {
		username: req.body.username,
		password: passwordHash
	}

	User.create(userDbEntry, (err, createdUser) => {
		console.log(createdUser, "\n ^^^ this is the user that was created ----------------------" );
		req.session.username = req.body.username,
		req.session.loggedIn = true,
		req.session.message = "Thanks for signing up"

		res.redirect('/home')
	})	
})

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log("oh shit", err);
		} else {
			res.redirect('/users/register')
		}
	})		
})

// ** login routes ** get 
router.get('/login', (req, res) => {
	const message = req.session.message;
	req.session.message = null;
	res.render('login.ejs', {
		message: message
	})		
})

module.exports = router;