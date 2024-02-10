const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('./Schema/type-dev');
const  {resolvers} = require('./Schema/resolver-dev');
const server = new ApolloServer({typeDefs ,resolvers});
server.listen().then(({ url }) => {
    console.log(`Server running at ${url}`);
  });