'use strict';

const router = require('express').Router();

router.get('/', (req,res) => {
	res.render('login', {});
});

router.get('/callback', (req,res) => {
	console.log("login/callback");
	let token = req.query.token;
	if(token === undefined) {
		res.send("please try to login again");
	}
	else {
		res.send("logged in with token:<br>" + token);
	}
});

module.exports = router;