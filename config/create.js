'use strict';
const prompt = require('prompt');
const fs = require('fs');

prompt.message = "";
prompt.delimiter = "";

var config = {};
config.auth = {};
config.auth.facebook = {};
config.auth.google = {};
config.jwt = {};
config.mongo = {};


var prompts = [
	{message: "Facebook App ID", name: "facebookAppId"},
	{message: "Facebook App Secret", name: "facebookAppSecret"},
	{message: "Facebook Callback Url", name: "facebookCallbackUrl"},
	{message: "Google Client ID", name: "googleClientId"},
	{message: "Google Client Secret", name: "googleClientSecret"},
	{message: "Google Callback Url", name: "googleCallbackUrl"},
	{message: "Token Secret", name: "jwtSecret"},
	{message: "Token Expires In (seconds or a string describing time spam", name: "jwtExpiresIn"},
	{message: "Mongo URI", name:"mongoUri"}
]

var prompt_facebook = [
	
];
var prompt_jwt = [
	
]

prompt.start();
prompt.get(prompts, (err, result) => {
	config.auth.facebook.appId = result.facebookAppId;
	config.auth.facebook.appSecret = result.facebookAppSecret;
	config.auth.facebook.callbackUrl = result.facebookCallbackUrl;
	config.auth.google.clientId = result.googleClientId;
	config.auth.google.clientSecret = result.googleClientSecret;
	config.auth.google.callbackUrl = result.googleCallbackUrl;
	config.jwt.secret = result.jwtSecret;
	config.jwt.expiresIn = result.jwtExpiresIn;
	config.mongo.uri = result.mongoUri;
	saveConfig(config);
});

function saveConfig(config) {
	let config_string = "module.exports = " + JSON.stringify(config, null, 2);
	fs.writeFile("config/config.created.js", config_string, (err) => { 
		if(err) {
			console.log("Could not save config:" + err);
		}
		else {
			console.log("Configuration written to 'config.created.js' - rename it to 'config.js' to use it");
		}
	});
}
