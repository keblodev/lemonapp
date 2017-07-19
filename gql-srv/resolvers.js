import fetch from 'node-fetch';
import querystring from 'querystring';
import https from 'https';

import GraphQLJSON from 'graphql-type-json';

const agent = new https.Agent({
  rejectUnauthorized: false,
})

let nextId = 3;

export const resolvers = {
	JSON: GraphQLJSON,
    Query: {
        childChannels: _ =>
          fetch('https://localhost:5000/childchannels',
          { agent })
	          .then(res => res.json())
        ,
        posts: (_, args) =>
          fetch('https://localhost:5000/api/feedrizer/feed?'+querystring.stringify({ args: JSON.stringify(args) }),
          { agent })
	          .then(res => res.json())
    },
    Feed: {
      posts: (feed) =>
        fetch('https://localhost:5000/api/feedrizer/posts?'+querystring.stringify({ args: JSON.stringify(feed) }),
          { agent })
	          .then(res => res.json())

    },
    ChildChannel: (_) =>
		fetch('https://localhost:5000/childchannels',
          { agent })
	          .then(res => res.json())
    ,
    Mutation: {

		sync: (root, args) => {
			console.log(args)
			return fetch('https://localhost:5000/api/feedrizer/sync',
          	{
				agent,
				method: "POST",
				body:    JSON.stringify(args),
				headers: { 'Content-Type': 'application/json' },
			})
	          .then(res => res.json())}
		,

		getAuthUrl: (root, args) =>{
			console.log(args);
			return fetch('https://localhost:5000/api/feedrizer/authorize',
          	{
				agent,
				method: "POST",
				body:    JSON.stringify(args),
				headers: { 'Content-Type': 'application/json' },
			})
	          .then(res => res.json())}
    }
};
