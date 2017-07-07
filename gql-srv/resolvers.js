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
          return fetch('https://localhost:5000/channels',
          { agent })
	          .then(res => res.json());
        },
        childChannels: () => {
          return fetch('https://localhost:5000/childchannels',
          { agent })
	          .then(res => res.json());
        },
        channel(_, args) {
          return fetch('https://localhost:5000/channel?'+querystring.stringify({ args: JSON.stringify(args) }),
          { agent })
	          .then(res => res.json());
        }
    },
    Channel: {
      childChannels(channel) {
        return fetch('https://localhost:5000/childchannels?'+querystring.stringify({ args: JSON.stringify(channel) }),
          { agent })
	          .then(res => res.json());
      }
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
        }
    }
};
