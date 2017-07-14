import fetch from 'node-fetch';
import querystring from 'querystring';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false
})

let nextId = 3;

export const resolvers = {
    Query: {
        channels: () => {
          console.log('Channels request')
          return fetch('https://localhost:5000/channels',
          { agent })
	          .then(res => res.json())
            .then(res => {
              console.log('Got channels. Sending ' + res);

              return res;
            });
        },
        childChannels: _ =>
          fetch('https://localhost:5000/childchannels',
          { agent })
	          .then(res => res.json())
        ,
        channel: (_, args) =>
          fetch('https://localhost:5000/channel?'+querystring.stringify({ args: JSON.stringify(args) }),
          { agent })
	          .then(res => res.json())
    },
    Channel: {
      childChannels: (channel) =>
        fetch('https://localhost:5000/childchannels?'+querystring.stringify({ args: JSON.stringify(channel) }),
          { agent })
	          .then(res => res.json())

    },
    ChildChannel: {
      channel(childChannel) {
        //TODO:
        return childChannel.getChannel();
      }
    },
    Mutation: {
        addChannel: (root, args) => {
            //TODO:
            const newChannel = {
                id: nextId++,
                name: args.name
            };
            channels.push(newChannel);
            return newChannel;
        },

		authorizeUser: (root, args) => {
			console.log(args)
			return fetch('https://localhost:5000/authorizeuser?' + querystring.stringify(args),
          { agent })
	          .then(res => res.json())}
		,

		getAuthUrl: (root, args) =>
			fetch('https://localhost:5000/authorize?' + querystring.stringify({ args: args }),
          { agent })
	          .then(res => res.json())
    }
};
