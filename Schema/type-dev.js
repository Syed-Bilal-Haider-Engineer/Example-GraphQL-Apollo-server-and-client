
const {gql} = require('apollo-server');;
 const typeDefs = gql`
type user {
    id:ID!,
    name:String!,
    age:Int!
    nationality:String!,
    username:String!
}
type Query{
user:[user!]!
}
`

module.exports = {typeDefs};