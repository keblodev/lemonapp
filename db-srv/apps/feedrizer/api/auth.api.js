import express from 'express';

const router =  express.Router();

import * as OAuthProcessor from './oauth1-processor';

let oAuthTokenSecretGlob = "";

router.post('/authorize/', function(req, res) {

	const {user_id, guest_id, for_app, callback_url} = req.body;

	if(for_app) {
			OAuthProcessor.getOAuthRequestToken({for_app, callback_url},
			auth_url => {
				res.writeHead(200, {'Content-Type': 'json'});
				res.end(JSON.stringify({auth_url}));
			},
			error => {
				res.end(JSON.stringify({
					message: 'Error occured while getting access token',
					error: error
				}));
			})
	} else {
		res.writeHead(404, {'Content-Type': 'json'});
		res.end(JSON.stringify({error: "no app id provided"}));
	}

});

router.post('/sync/', function(req, res) {

	const {user_id, guest_id, for_app, oauth_token, oauth_verifier} = req.body;

	if (for_app && oauth_token && oauth_verifier) {
		OAuthProcessor.getOAuthAccessToken(
			{for_app, oauth_token, oauth_verifier},
			result => {
				res.writeHead(200, {'Content-Type': 'json'});
				res.end(JSON.stringify({access_token: result}));
			}
		);
	}
});

module.exports = router;