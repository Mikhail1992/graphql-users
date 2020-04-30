const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

require("./models");

const app = express();
app.use(cors());

mongoose.connect("mongodb://graphql:graphql1@ds051577.mlab.com:51577/graphql", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { typeDefs, resolvers } = require("./schema");
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
