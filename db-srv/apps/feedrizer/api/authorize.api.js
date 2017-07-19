import express from 'express';
const router =  express.Router();
import querystring from 'querystring';

import config from '../env.js';

import { AppIds, AppAPIs } from '../static/api.configs';

import * as OAuthProcessor from './oauth1-processor';

router.post('/twitter', function(req, res) {
	const {user_id, guest_id, for_app, callback_url} = req.body;

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
	});
});

router.post('/facebook', (req, res, next) => {

	const {user_id, guest_id, for_app, callback_url} = req.body;

	const {client_id, redirect_uri, scope} = config[for_app];

	const authUrl = AppAPIs[for_app].auth_url;

	const auth_url = authUrl + querystring.stringify({client_id, redirect_uri, scope});

	console.log(auth_url);

	res.writeHead(200, {'Content-Type': 'json'});
	res.end(JSON.stringify({auth_url}));
});

router.post('/instagram', (req, res, next) => {

	const {user_id, guest_id, for_app, callback_url} = req.body;

	const {client_id, redirect_uri, response_type} = config[for_app];

	const authUrl = AppAPIs[for_app].auth_url;

	const auth_url = authUrl + querystring.stringify({client_id, redirect_uri, response_type});

	console.log(auth_url);

	res.writeHead(200, {'Content-Type': 'json'});
	res.end(JSON.stringify({auth_url}));
});

router.post('/google', (req, res, next) => {

	const {user_id, guest_id, for_app, callback_url} = req.body;

	const {client_id, redirect_uri, response_type, scope, access_type} = config[for_app];

	const authUrl = AppAPIs[for_app].auth_url;

	const auth_url = authUrl + querystring.stringify({client_id, response_type, redirect_uri, scope, access_type});

	console.log(auth_url);

	res.writeHead(200, {'Content-Type': 'json'});
	res.end(JSON.stringify({auth_url}));
});

module.exports = router;