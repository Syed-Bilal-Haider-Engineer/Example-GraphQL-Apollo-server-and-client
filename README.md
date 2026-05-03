# Example GraphQL Apollo Server and Client

This repository contains two GraphQL examples built with Apollo:

1. `Server/` and `Client/` - a simple Apollo Server and React client example.
2. `GraphQL-JSONPLACEHOLDER/` - an Apollo Server example that proxies the JSONPlaceholder REST API and a React Apollo client.

## Project structure

- `Server/`
  - Apollo Server project using `apollo-server`
  - GraphQL schema and resolvers are defined in `Server/Schema/type-dev.js` and `Server/Schema/resolver-dev.js`
  - Run with `npm start`
- `Client/`
  - React application bootstrapped with Create React App
  - Uses `@apollo/client` and `graphql`
  - Run with `npm start`
- `GraphQL-JSONPLACEHOLDER/`
  - `Server/`
    - Express + Apollo Server serving a GraphQL API at `/graphql`
    - Fetches data from `https://jsonplaceholder.typicode.com`
    - Run with `npm run dev` or `npm start`
  - `client/`
    - React client using Apollo Client and GraphQL
    - Run with `npm start`

## Prerequisites

- Node.js 16 or newer
- npm

## Running the first example

### Start the GraphQL server

```bash
cd Server
npm install
npm start
```

The server will start with Apollo Server and print the GraphQL endpoint URL in the console.

### Start the React client

Open a second terminal:

```bash
cd Client
npm install
npm start
```

Then open `http://localhost:3000` in your browser.

## Running the JSONPlaceholder GraphQL example

### Start the JSONPlaceholder GraphQL server

```bash
cd GraphQL-JSONPLACEHOLDER/Server
npm install
npm run dev
```

The server listens on port `8000` by default and exposes GraphQL at:

- `http://localhost:8000/graphql`

### Start the JSONPlaceholder React client

Open a second terminal:

```bash
cd GraphQL-JSONPLACEHOLDER/client
npm install
npm start
```

Then open `http://localhost:3000` in your browser.

## Example GraphQL queries

### JSONPlaceholder GraphQL queries

```graphql
query GetTodoList {
  getTodoList {
    id
    title
    completed
    user {
      id
      username
      email
      phone
      website
    }
  }
}
```

```graphql
query GetUserById($id: ID!) {
  getUserById(id: $id) {
    id
    username
    email
    phone
    website
  }
}
```

## Notes

- The root `Server/` project uses Apollo Server.
- The `GraphQL-JSONPLACEHOLDER/Server` project uses Apollo Server with Express and `expressMiddleware`.
- The clients are React apps built with Create React App and Apollo Client.

## Helpful links

- Apollo Server: https://www.apollographql.com/docs/apollo-server/
- Apollo Client: https://www.apollographql.com/docs/react/
- GraphQL: https://graphql.org/
