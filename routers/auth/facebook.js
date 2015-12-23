'use strict';
// get modules
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// get configuration
const config = require(__dirname + '/../../config/config.js');
const configFacebook = config.auth.facebook;
const configJwt = config.jwt;

// set up passport to use facebook strategy
const optionsFacebook = {
	clientID: configFacebook.appId,
	clientSecret: configFacebook.appSecret,
	callbackURL: configFacebook.callbackUrl,
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
			var token = jwt.sign(user, configJwt.secret);
			console.log("token:" + token);
			// save user to request
			//req.user = user;

			// redirect to profile page (for now)
			res.redirect('/login/callback?token=' + token);
		}
		else {
			res.send("There was an error logging in. Please try again.");	
		}
	}
);


module.exports = router;
