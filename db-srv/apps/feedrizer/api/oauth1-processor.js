import * as OAuth from 'oauth';
import { AppIds, AppAPIs } from '../static/api.configs';

const coreAppId = "FEEDRIZER";

const config =  JSON.parse(require('dotenv').config().parsed.JSON)[coreAppId];

var oauthPerApp = {
	...Object.keys(AppIds).map(key => ({ key : null}))
};

var initAuthForApp = (for_app, callback_url) => (
		oauthPerApp[for_app] = oauthPerApp[for_app] || new OAuth.OAuth(
		AppAPIs[for_app].request_token,
		AppAPIs[for_app].access_token,
		config[for_app].consumer_key,
		config[for_app].consumer_secret,
		'1.0',
		callback_url ? callback_url : 'https://localhost:8081/feedrizer',
		'HMAC-SHA1'
	)
);

var getOauth = ({for_app, callback_url}) => (
	AppIds[for_app] && AppAPIs[for_app]
		&& initAuthForApp(for_app, callback_url)
);

export const getOAuthRequestToken = (({for_app, callback_url}, cb, errocCb) => {
	let oauth = getOauth({for_app, callback_url});

	if (oauth) {
		oauth.getOAuthRequestToken(
			(error, oAuthToken, oAuthTokenSecret, results) => {
				let auth_url = AppAPIs[for_app].auth_url + oAuthToken;

				console.log({
					oAuthToken,
					oAuthTokenSecret,
					results
				});

				//todo: should be in user
				oauth.__temp__oAuthTokenSecret = oAuthTokenSecret;

				cb(auth_url);
		})
	} else {
		errocCb({errod: "well damn"});
	}
});

export const getOAuthAccessToken = (({for_app, oauth_token, oauth_verifier}, cb, errorCb) => {
	let oauth = getOauth({for_app});
	/** Obtaining access_token */
	let getOAuthRequestTokenCallback = (
			error,
			oAuthAccessToken,
			oAuthAccessTokenSecret,
			results
		) => {

		if (error) {
			console.log(error);
			errorCb(error);
			return;
		}

		oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json',
			oAuthAccessToken,
			oAuthAccessTokenSecret,
			(error, twitterResponseData, result) => {
				if (error) {
					console.log(error);
					errorCb(error);
				}

				// console.log(twitterResponseData);

				cb(twitterResponseData);
			});
	};

	oauth.getOAuthAccessToken(
		oauth_token,
		oauth.__temp__oAuthTokenSecret,
		oauth_verifier,
		getOAuthRequestTokenCallback
	);
});
