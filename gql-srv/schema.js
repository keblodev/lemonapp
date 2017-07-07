import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';

import { resolvers } from './resolvers';

export const typeDefs = `
type Channel {
   id: ID!                # "!" denotes a required field
   name: String
   childChannels: [ChildChannel]
}

type ChildChannel {
  id: ID!
  name: String
  channel: [Channel]
}

# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
   channels: [Channel]    # "[]" means this is a list of channels
   childChannels: [ChildChannel]
   channel(name: String): Channel
}

type Mutation {
  addChannel(name: String!): Channel
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema });
export { schema };
