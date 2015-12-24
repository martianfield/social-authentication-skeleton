/*
Google OAuth 2.0
*/

'use strict';

// get modules
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Strategy = require('passport-google-oauth').OAuth2Strategy;

// get configuration
const config = require(__dirname + '/../../config/config.js');

/*
// serialize into session ... needed?
passport.serializeUser(function(user, done) {
  done(null, user);
});

// deserialize from session ... needed?
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
*/

// set up passport to use google oauth 2 strategy
const strategyOptions = {
	clientID: config.auth.google.clientId,
	clientSecret: config.auth.google.clientSecret,
	callbackURL: config.auth.google.callbackUrl
};
passport.use( new Strategy(
	strategyOptions, 
	function(accessToken, refreshToken, profile, callback) {
		let err = null;
		return callback(err, profile);
	}
));

// initialize passport
router.use(passport.initialize());

// facebook authentication requested
router.get(
	'/', 
	passport.authenticate(
		'google', 
		{session: false, scope: ['https://www.googleapis.com/auth/plus.login']}
	),
	(req, res) => { /* never called , redirected to Google instead */}
);

// facebook authentication callback
router.get(
	'/callback', 
	passport.authenticate(
		'google', 
		{ failureRedirect: '/login', session: false}
	),
	(req, res) => {
		if(req.user) {
			// create a user object
			let user = userFromRequest(req);
			// create token
			let token = jwt.sign(user, config.jwt.secret);
			// redirect to login callback page, taking the token along so we can use it client side
			res.redirect('/login/callback?token=' + token);
		} 
		else {
			res.send("There was an error logging in. Please try again.");	
		}
	}
);

function userFromRequest(req) {
	// create a user object
	var name = req.user.name || {familyName:undefined, givenName:undefined, middleName:undefined};
	var user = {
		displayName: req.user.displayName,
		firstName: name.givenName,
		middleName: name.middleName,
		lastName: name.familyName,
		emails: [],
		gender: req.user.gender,
		authDisplayName: req.user.displayName,
		authProvider: "google",
		authId: req.user.id,
		authProfileUrl: req.user._json.url
	}
	return user;
}


module.exports = router;
