const {userlist} = require('../fakeUserData');
const resolvers = {
    Query: {
     user(){
        return userlist;
     }
    }
}

module.exports = {resolvers};