import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import axios from 'axios';

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
      type User {
        id: ID!
        username: String!
        email: String!
        phone: String!
        website: String!
      }
      type Todo {
        id: ID!
        title: String!
        completed: Boolean!
        user: User
      }
      type Query {
        getTodoList: [Todo]
        getTodo(id: ID!): Todo
        getUser: [User]
        getUserById(id: ID!): User
      }
    `,
    resolvers: {
      Todo: {
        user: async (todo) => {
          const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
          return data;
        },
      },
      Query: {
        getTodoList: async () => {
          const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
          return data;
        },
        getTodo: async (parent, { id }) => {
          const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
          return data;
        },
        getUser: async () => {
          const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
          return data;
        },
        getUserById: async (parent, { id }) => {
          const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
          return data;
        },
      },
    },
  });

  app.use(express.json());
  app.use(cors());

  await server.start();
  app.use('/graphql', expressMiddleware(server));

  app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).send('Something went wrong!');
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
