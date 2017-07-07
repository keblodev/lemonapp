export const typeDefs = `

type Channel {
  id: ID!
  name: String
}

type ChildChannel {
    id: ID!
    name: String
}

type Query {
  channels: [Channel]
  childChannels: [ChildChannel]
}
`;
