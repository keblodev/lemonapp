import express from 'express';
import cors from 'cors';

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
};

import { 
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';

import { schema } from './schema';

import {
  makeExecutableSchema
} from 'graphql-tools';


const PORT = 4000;
const app = express();

app.use('*', cors({ origin: 'https://localhost:8081' }));

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

const server = https.createServer(options, app);

server.listen(PORT, () => 
    console.log(`GraphQl Server is now running on https://localhost:${PORT}`)
);

