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

router.post('/facebook', async (req, res, next) => {

	const {for_app, auth_params} = req.body;

	const {user_id, guest_id, code} = auth_params || {};

	const {client_id, redirect_uri, client_secret, app_access_token} = config[for_app];

	const {access_token_url, app_verify_url, token_verify_url, get_posts_url} = AppAPIs[for_app];

	if (code) {

		const access_token_query = {
			client_id,
			client_secret,
			redirect_uri,
			code
		};

		const access_token_data = await fetch(access_token_url
		+querystring.stringify(access_token_query))
	          .then(res => res.json());

		console.log(access_token_data);

		// const app_verify_query = {
		// 	input_token: access_token_data.access_token,
		// 	access_token: app_access_token
		// };

		//to get exact user_id instead of 'me'
		// const app_verify_data = await fetch(token_verify_url
		// 	+querystring.stringify(app_verify_query))
		// 	.then(res => res.json());

		// console.log(app_verify_data);

		// const {user_id} = app_verify_data.data;

		const some_posts_data = await fetch(format(get_posts_url, {user_id: 'me'})
			+querystring.stringify({access_token: access_token_data.access_token}))
			.then(res => res.json());

		console.log(some_posts_data);

		res.writeHead(200, {'Content-Type': 'json'});
		res.end(JSON.stringify({access_token: JSON.stringify(some_posts_data)}));
	}
});

router.post('/google', async (req, res, next) => {

	const {for_app, auth_params} = req.body;

	const {user_id, guest_id, code} = auth_params || {};

	console.log({code});

	const {client_id, redirect_uri, client_secret, app_access_token, grant_type} = config[for_app];

	const {access_token_url, app_verify_url, token_verify_url, get_posts_url} = AppAPIs[for_app];

	if (code) {

		const access_token_query = {
			client_id,
			client_secret,
			redirect_uri,
			code,
			grant_type
		};

		console.log(access_token_query);


		const access_token_data = await fetch(access_token_url,
		{
			method: 'POST',
			body:	querystring.stringify(access_token_query),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
	          .then(res => res.json());

		console.log(access_token_data);

		// const app_verify_query = {
		// 	access_token: access_token_data.access_token,
		// };

		// //to get user_id -> we need this and it sucks balls
		// const app_verify_data = await fetch(token_verify_url
		// 	+querystring.stringify(app_verify_query))
		// 	.then(res => res.json());

		// console.log(app_verify_data);

		const user_id = 'me';
		const collection_type = 'public'

		const some_posts_data = await fetch(format(get_posts_url, {user_id, collection_type})
			+querystring.stringify({access_token: access_token_data.access_token}))
			.then(res => res.json());


		const data = some_posts_data;

		console.log(some_posts_data);

		res.writeHead(200, {'Content-Type': 'json'});
		res.end(JSON.stringify({access_token: JSON.stringify(data)}));
	}
});

router.post('/instagram', async (req, res, next) => {

	const {for_app, auth_params} = req.body;

	const {user_id, guest_id, code} = auth_params || {};

	console.log({code});

	const {client_id, redirect_uri, client_secret, app_access_token, grant_type} = config[for_app];

	const {access_token_url, app_verify_url, token_verify_url, get_posts_url} = AppAPIs[for_app];

	if (code) {

		const access_token_query = {
			client_id,
			client_secret,
			redirect_uri,
			code,
			grant_type
		};

		console.log(access_token_query);
		console.log(access_token_url+querystring.stringify(access_token_query))

		const access_token_data = await fetch(access_token_url,
		{
			method: 'POST',
			body: 	querystring.stringify(access_token_query),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		})
	          .then(res => res.json());

		console.log(access_token_data);

		const user_id = 'self';
		const collection_type = 'recent'

		const some_posts_data = await fetch(format(get_posts_url, {user_id, collection_type})
			+querystring.stringify({access_token: access_token_data.access_token}))
			.then(res => res.json());

		const data = some_posts_data;

		console.log(some_posts_data);

		res.writeHead(200, {'Content-Type': 'json'});
		res.end(JSON.stringify({access_token: JSON.stringify(data)}));
	}
});


module.exports = router;