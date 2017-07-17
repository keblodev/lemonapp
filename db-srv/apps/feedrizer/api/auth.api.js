import express from 'express';
import * as OAuth from 'oauth';
import url from 'url';

const router =  express.Router();

let consumer = "A3sAJJmGEutqh7SAWcW49JJ8O"
let consumerSecret = "sRdBAXAg6ejps4SMIk9y3hzP7S8xIbpK6A7J6NWFoNJ5l67dnv"

var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	'A3sAJJmGEutqh7SAWcW49JJ8O',
	'sRdBAXAg6ejps4SMIk9y3hzP7S8xIbpK6A7J6NWFoNJ5l67dnv',
	'1.0A',
	'https://localhost:8081/feedrizer',
	'HMAC-SHA1'
);

let oAuthTokenSecretGlob = "";

router.get('/authorize/', function(req, res) {
	oauth.getOAuthRequestToken(function (error, oAuthToken, oAuthTokenSecret, results) {
		var urlObj = url.parse(req.url, true);
		var auth_url = 'https://twitter.com/' +
				'oauth/authenticate?oauth_token=' + oAuthToken;

		console.log({
			oAuthToken,
			oAuthTokenSecret,
			results
		})

		oAuthTokenSecretGlob = oAuthTokenSecret;

		res.writeHead(200, {'Content-Type': 'json'});
		res.end(JSON.stringify({auth_url}));
	});
});

router.get('/authorizeuser/', function(req, res) {
		var parts = url.parse(req.url, true);
  		// var query = parts.query && parts.query && JSON.parse(parts.query);

		console.log(parts.query);

		/** Obtaining access_token */
		var getOAuthRequestTokenCallback = function (
			error,
			oAuthAccessToken,
			oAuthAccessTokenSecret,
			results
			) {

			if (error) {
				console.log(error);
				res.end(JSON.stringify({
					message: 'Error occured while getting access token',
					error: error
				}));
				return;
			}

			oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json',
				oAuthAccessToken,
				oAuthAccessTokenSecret,
				function (error, twitterResponseData, result) {
					if (error) {
						console.log(error)
						res.end(JSON.stringify(error));
						return;
					}
					try {
						console.log(JSON.parse(twitterResponseData));
					} catch (parseError) {
						console.log(parseError);
					}
					console.log(twitterResponseData);

					res.writeHead(200, {'Content-Type': 'json'});
					res.end(JSON.stringify({access_token:	twitterResponseData}));
				});
			};

			oauth.getOAuthAccessToken(
				parts.query.oauth_token,
				oAuthTokenSecretGlob,
				parts.query.oauth_verifier,
				getOAuthRequestTokenCallback
			);

});

module.exports = router;