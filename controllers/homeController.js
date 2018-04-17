const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	// user will have logged in when they see this, so their username will be stored in the session already so we can send it to the template
	// remember, the session object is available ** EVERYWHERE ** in the controllers
	const d = new Date(Date.now());
	const message = req.session.message;
	if (req.session.loggedIn) {
		res.render('home.ejs', {
			username: req.session.username,
			loginDate: d.toLocaleTimeString('en-us'),
			message: message
		})		
	} else {
		// res.redirect('/users/register')
		res.send('you suck and need to log in')
	}
			
})


module.exports = router;