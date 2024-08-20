const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
    username: String!
    nationality: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  input InsertUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = US
  }

  input UpdateUsernameInput {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    createUser(input: InsertUserInput!): User
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(id: ID!): User
  }

  enum Nationality {
    US
    CA
    UK
    AU
    NZ
  }
`;

module.exports = { typeDefs };
