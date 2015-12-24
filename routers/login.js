'use strict';
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const config = require(__dirname + '/../config/config.js');

router.get('/', (req,res) => {
	res.render('login', {});
});

router.get('/callback', (req,res) => {
	let token = req.query.token;
	if(token === undefined) {
		res.send("please try to login again");
	}
	else {
		// verify token
		jwt.verify(token, config.jwt.secret, function(err, decoded) {
	  	if (err) {
	  		res.send(`Token Error: ${err.name} | ${err.message}`);
	  	}
	  	else {
	  		res.send(`Token received: ${token}<hr>${JSON.stringify(decoded, null, 2)}`);
	  	}
		});
	}
});

module.exports = router;