import express from 	'express';
const router =  		express.Router();
import querystring from 'querystring';
import fetch from 		'node-fetch';
import format from  	'string-format';

import config from '../env.js';

import * as OAuthProcessor from './oauth1-processor';
import { AppIds, AppAPIs } from '../static/api.configs';

router.post('/twitter', function(req, res) {
	const {for_app, auth_params} = req.body;

	console.log(req.body)

	const {user_id, guest_id, oauth_token, oauth_verifier} = auth_params || {};

	if (oauth_token && oauth_verifier) {
		OAuthProcessor.getOAuthAccessToken(
			{for_app, oauth_token, oauth_verifier},
			result => {

				res.writeHead(200, {'Content-Type': 'json'});
				res.end(JSON.stringify({access_token: JSON.stringify(result)}));
			}
		);
	}
});

router.post('/facebook',async (req, res, next) => {

	const {for_app, auth_params} = req.body;

	const {user_id, guest_id, code} = auth_params || {};

	const {client_id, redirect_uri, client_secret, app_access_token} = config[for_app];

	const {access_token_url, app_verify_url, token_verify_url, get_posts_url} = AppAPIs[for_app];

	if (code) {

		const access_token_query = {
			client_id: 		client_id,
			client_secret: 	client_secret,
			redirect_uri: 	redirect_uri,
			code:			code
		};

		const access_token_data = await fetch(access_token_url
		+querystring.stringify(access_token_query))
	          .then(res => res.json());

		console.log(access_token_data);

		const app_verify_query = {
			input_token: access_token_data.access_token,
			access_token: app_access_token
		};

		//to get user_id -> we need this and it sucks balls
		const app_verify_data = await fetch(token_verify_url
			+querystring.stringify(app_verify_query))
			.then(res => res.json());

		console.log(app_verify_data);

		const {user_id} = app_verify_data.data;

		const some_posts_data = await fetch(format(get_posts_url, {user_id})
			+querystring.stringify({access_token: access_token_data.access_token}))
			.then(res => res.json());

		console.log(some_posts_data);

		res.writeHead(200, {'Content-Type': 'json'});
		res.end(JSON.stringify({access_token: JSON.stringify(some_posts_data)}));
	}
});

module.exports = router;