const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	// user will have logged in when they see this, so their username will be stored in the session already so we can send it to the template
	// remember, the session object is available ** EVERYWHERE ** in the controllers
	res.render('home.ejs', {
		username: req.session.username
	})		
})


module.exports = router;