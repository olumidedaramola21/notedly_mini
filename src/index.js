const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
require('dotenv').config()

const port = process.env.PORT || 4000;

// define the schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
// define the resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  } 
} 

const app = express();
// apollo-server instance
const server = new ApolloServer({typeDefs, resolvers})
// apply the apollo graphql middleware and set the path to /api
const startServer =async () => {
  await server.start()
  server.applyMiddleware({app, path: '/api'});
}


app.listen(port, () => console.log("Listening on port 4000"));

startServer().catch(error => {
console.log(error)
})
