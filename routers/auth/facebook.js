'use strict';
// get modules
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// get configuration
const config = require(__dirname + '/../../config/config.js');

// set up passport to use facebook strategy
const optionsFacebook = {
	clientID: config.auth.facebook.appId,
	clientSecret: config.auth.facebook.appSecret,
	callbackURL: config.auth.facebook.callbackUrl,
	profileFields: ['id', 'displayName', 'emails', 'name', 'profileUrl', 'gender']
};
passport.use( new FacebookStrategy(
	optionsFacebook, 
	function(accessToken, refreshToken, profile, callback) {
		return callback(null, profile);
	}
));

// initialize passport
router.use(passport.initialize());

// facebook authentication requested
router.get('/', passport.authenticate('facebook', {session: false}));

// facebook authentication callback
router.get('/callback', 
	passport.authenticate('facebook', { failureRedirect: '/login', session: false}),
	(req, res) => {
		if(req.user) {
			// create a user object
			var name = req.user.name || {familyName:undefined, givenName:undefined, middleName:undefined};
			var user = {
				displayName: req.user.displayName,
				firstName: name.givenName,
				middleName: name.middleName,
				lastName: name.familyName,
				emails: req.user.emails,
				gender: req.user.gender,
				authDisplayName: req.user.displayName,
				authProvider: "facebook",
				authProviderId: req.user.id,
				authProfileUrl: req.user.profileUrl
			}
			// TODO: save or create user in database

			// create token
			var token = jwt.sign(user, config.jwt.secret);

			// redirect to login callback page, taking the token along so we can use it client side
			res.redirect('/login/callback?token=' + token);
		}
		else {
			res.send("There was an error logging in. Please try again.");	
		}
	}
);


module.exports = router;
