import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';

import { resolvers } from './resolvers';

export const typeDefs = `

scalar JSON

type ChildChannel {
  id: ID!
  name: String
}

type FeedrizerUser {
	id: ID!
	name: String!
	apps: [FeedrizerApp]
}

type FeedrizerApp {
	id: ID!
	appId: String!
	feed: Feed
	user: FeedrizerUser
}

type FeedPost {
	id: ID!
	appId: String
}

type Feed {
	id: ID!
	appId: String!
	posts: [FeedPost]
}

# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
   childChannels: [ChildChannel]   # "[]" means this is a list of channels
   posts(for_app: String!): [FeedPost]
   feed(for_app: String!): [Feed]
}

type Auth {
	auth_url: String
	access_token: String
}

type Mutation {
  sync(for_app: String!, auth_params: JSON!): Auth
  getAuthUrl(for_app: String!): Auth
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers});
// addMockFunctionsToSchema({ schema });
export { schema };
