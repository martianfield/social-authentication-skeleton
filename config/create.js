'use strict';
const prompt = require('prompt');
const fs = require('fs');

prompt.message = "";
prompt.delimiter = "";

var config = {};
config.auth = {};
config.auth.facebook = {};
config.auth.twitter = {};
config.jwt = {};
config.mongo = {};


var prompts = [
	{message: "Facebook App ID", name: "facebookAppId"},
	{message: "Facebook App Secret", name: "facebookAppSecret"},
	{message: "Facebook Callback Url", name: "facebookCallbackUrl"},
	{message: "Token Secret", name: "jwtSecret"},
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
	config.jwt.secret = result.jwtSecret;
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
