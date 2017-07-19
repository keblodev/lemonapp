export const AppIds = {
	TWITTER:'TWITTER',
	FACEBOOK:'FACEBOOK',
	MEDIUM:'MEDIUM',
	GOOGLE:'GOOGLE',
}

export const AppAPIs = {
	TWITTER: {
		request_token: 	'https://api.twitter.com/oauth/request_token',
		access_token: 	'https://api.twitter.com/oauth/access_token',
		auth_url: 'https://twitter.com/oauth/authenticate?oauth_token=',
	},
	FACEBOOK: {
		auth_url: 			'https://www.facebook.com/v2.10/dialog/oauth?',
		access_token_url: 	'https://graph.facebook.com/v2.10/oauth/access_token?',
		token_verify_url:	'https://graph.facebook.com/debug_token?',
		get_posts_url:		'https://graph.facebook.com/v2.5/{user_id}/feed?'
	},
	MEDIUM: null,
	GOOGLE: null,
}


