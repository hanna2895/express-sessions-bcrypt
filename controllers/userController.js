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

router.post('/login', (req, res) => {
	// 1. find the user
	User.findOne({username: req.body.username}, (err, userFound) => {
		// 2. if there is a user with that usename
		if (userFound) {
			// 3. compare the passwords -> this is in lieu of something like if (password === password)
			if (bcrypt.compareSync(req.body.password, userFound.password)) {
				// 4. set up session
				req.session.username = req.body.username;
				req.session.loggedIn = true;
				req.session.message = `Hello, ${req.body.username}, hope you're having a nice day. `

				res.redirect('/home')
			} // 3. continued -> passwords don't match 
			else {
				// remember, don't explicitly say whether it was the username or the password that was no good. use the same message for both
				req.session.message = "Incorrect username or password."
				res.redirect('/users/login')
			}
		} // 2. continued -> user was not found 
		else {
			req.session.message = "Incorrect username or password."
			res.redirect('/users/login')
		}
	})		
})

module.exports = router;