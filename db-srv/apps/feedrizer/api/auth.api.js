import express from 'express';

const router =  express.Router();

import authorizeApi from './authorize.api';
import syncApi from './sync.api';

import * as OAuthProcessor from './oauth1-processor';

router.post('*' , (req, res, next) => {

	const {user_id, guest_id, for_app, callback_url} = req.body;

	if(for_app) {
		req.url = req.url + '/' + for_app.toLowerCase();
		next();
	} else {
		res.writeHead(404, {'Content-Type': 'json'});
		res.end(JSON.stringify({error: "no app id provided"}));
	}
});

router.use('/authorize',authorizeApi);

router.use('/sync',syncApi);


module.exports = router;