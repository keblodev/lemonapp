import express from 'express';
import cors from 'cors';

import https from 'https';
import fs from 'fs';
import url from 'url';

import * as OAuth from 'oauth';

const options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
};

import { Channel, ChildChannel } from './connectors';

import bodyParser from 'body-parser';

//TODO: get shema here
// import { schema } from './schema';

const PORT = 5000;
const app = express();

app.use('*', cors({ origin: 'https://localhost:4000' }));

app.get('/channels/', function(req, res) {
  console.log("Request for all channels");
  Channel.all().then(channels => {
    console.log("sending channels " + channels);
    res.writeHead(200, {'Content-Type': 'json'});
    res.end(JSON.stringify(channels));
  });
});

app.get('/channel/', function(req, res) {

  var parts = url.parse(req.url, true);
  var query = parts.query && parts.query.args && JSON.parse(parts.query.args);

  Channel.find({where: query}).then((channel) => {
      res.writeHead(200, {'Content-Type': 'json'});
      res.end(JSON.stringify(channel));
    })
})

app.get('/childchannels/', function(req, res) {

  var parts = url.parse(req.url, true);
  var query = parts.query && parts.query.args && JSON.parse(parts.query.args);

  let pr;

  if (query) {
    pr = ChildChannel.findAll({where: {channelId : query.id}})
  } else {
    pr = ChildChannel.all();
  }

  pr.then(channels => {
    res.writeHead(200, {'Content-Type': 'json'});
    res.end(JSON.stringify(channels));
  });
});

var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	'A3sAJJmGEutqh7SAWcW49JJ8O',
	'sRdBAXAg6ejps4SMIk9y3hzP7S8xIbpK6A7J6NWFoNJ5l67dnv',
	'1.0A',
	'https://localhost:8081/feedrizer',
	'HMAC-SHA1'
)

var oAuthTokenSecretGlob = "";

app.get('/authorizeuser/', function(req, res) {
		var parts = url.parse(req.url, true);
  		// var query = parts.query && parts.query && JSON.parse(parts.query);

		console.log(parts.query);

		/** Obtaining access_token */
			var getOAuthRequestTokenCallback = function (error, oAuthAccessToken,
														oAuthAccessTokenSecret, results) {
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

})



app.get('/authorize/', function(req, res) {
		oauth.getOAuthRequestToken(function (error, oAuthToken, oAuthTokenSecret, results) {
			var urlObj = url.parse(req.url, true);
			var auth_url = 'https://twitter.com/' +
					'oauth/authenticate?oauth_token=' + oAuthToken;
			var handlers = {
				'/': function (request, response) {
					/**
					 * Creating an anchor with auth_url as href and sending as response
					 */
					var body = '<a href="' + auth_url + '"> Get Code </a>';
					response.writeHead(200, {
						'Content-Length': body.length,
						'Content-Type': 'text/html' });
					response.end(body);
				},
				'/callback': function (request, response) {

				}
			};

			console.log({
				oAuthToken,
				oAuthTokenSecret,
				results
			})

			oAuthTokenSecretGlob = oAuthTokenSecret;

			res.writeHead(200, {'Content-Type': 'json'});
			res.end(JSON.stringify({auth_url}));
			// handlers['/callback'](req, res);
		})
});


const server = https.createServer(options, app);

server.listen(PORT, () =>
    console.log(`GraphQl Server is now running on https://localhost:${PORT}`)
);

