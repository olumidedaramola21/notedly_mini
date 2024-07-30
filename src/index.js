const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
require("dotenv").config();

const port = process.env.PORT || 4000;


let notes = [
   {id: '1', content: 'This is a note', author: 'Adam Scott'},
   {id: '2', content: 'This is another note', author: 'Harlow Everly'},
   {id: '3', content: 'Oh look, another note', author: 'Riley Harrison'}
]

// define the schema
const typeDefs = gql`
  type Query {
    hello: String!
    notes: [Note!]! 
    note(id: ID): Note! 
  },

  type Pizza {
  id: ID!
  size: String!
  slices: Int!
  toppings: [String]
  },

  type Note {
  id: ID!
  content: String!
  author: String!
  }
`;
// define the resolvers
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    notes: () => notes,
    // Only return the information requested by the user
    note: (parent, args) => {
      return notes.find(note => note.id === args.id)
    }
  },
};

const app = express();
// apollo-server instance
const server = new ApolloServer({ typeDefs, resolvers });
// apply the apollo graphql middleware and set the path to /api
const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: "/api" });
};

app.listen(port, () => console.log("Listening on port 4000"));

startServer().catch((error) => {
  console.log(error);
});


