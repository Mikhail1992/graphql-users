const { gql } = require("apollo-server-express");
const mongoose = require("mongoose");

const User = mongoose.model("User");

const typeDefs = gql`
  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }

  input CreateUserInput {
    email: String!
    name: String!
  }

  input UpdateUserInput {
    email: String
    name: String
  }

  type Query {
    user(id: ID!): User
    users(skip: Int = 0, limit: Int = 10): [User]
  }
`;

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return await User.findById(id);
    },
    users: async (_, args) => {
      return await User.find({}, null, args);
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const user = new User(input);
      return await user.save();
    },
    updateUser: async (_, { id, input }) => {
      await User.findByIdAndUpdate(id, input);
      return await User.findById(id);
    },
    deleteUser: async (_, { id }) => {
      return await User.findByIdAndRemove(id);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
