export const AppIds = {
	TWITTER:'TWITTER',
	FACEBOOK:'FACEBOOK',
	MEDIUM:'MEDIUM',
	GOOGLE:'GOOGLE',
}

export const AppAPIs = {
	TWITTER: {
		auth_url: 		'https://twitter.com/oauth/authenticate?oauth_token=',
		access_token: 	'https://api.twitter.com/oauth/access_token',
		request_token: 	'https://api.twitter.com/oauth/request_token',
	},
	FACEBOOK: {
		auth_url: 			'https://www.facebook.com/v2.10/dialog/oauth?',
		access_token_url: 	'https://graph.facebook.com/v2.10/oauth/access_token?',
		token_verify_url:	'https://graph.facebook.com/debug_token?',
		get_posts_url:		'https://graph.facebook.com/v2.5/{user_id}/feed?'
	},
	INSTAGRAM: null,
	MEDIUM: null,
	GOOGLE: {
		auth_url:			'https://accounts.google.com/o/oauth2/v2/auth?',
		access_token_url:	'https://www.googleapis.com/oauth2/v4/token?',
		token_verify_url:	'https://www.googleapis.com/oauth2/v1/tokeninfo?',
		get_posts_url:		'https://www.googleapis.com/plus/v1/people/{user_id}/activities/{collection_type}?'
	},
}


