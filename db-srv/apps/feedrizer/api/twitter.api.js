import Twitter from 'twitter';
import http from 'http'

var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	'A3sAJJmGEutqh7SAWcW49JJ8O',
	'sRdBAXAg6ejps4SMIk9y3hzP7S8xIbpK6A7J6NWFoNJ5l67dnv',
	'1.0A',
	'https://localhost:8081/feedrizer',
	'HMAC-SHA1'
)
