const {userlist} = require('../fakeUserData');
const resolvers = {
    Query: {
     users:()=> {
        return userlist;
     }
    },
     Mutation : {
        createUser: (parent, args) => {
          console.log("args==>",args);
          const user = args.input;
          const lastId = userlist[userlist.length - 1]?.id || 0;
          user.id = lastId + 1;
          userlist.push(user);
          return user;
        },
      
        updateUsername: (parent, args) => {
          const { id, newUsername } = args.input;
          const userIndex = userlist.findIndex((user) => user.id === Number(id));
          if (userIndex !== -1) {
            userlist[userIndex].username = newUsername;
            return userlist[userIndex];
          }
          return null;
        },
      
        deleteUser: (parent, args) => {
          const id = args.id;
          const userIndex = userlist.findIndex((user) => user.id === Number(id));
          if (userIndex !== -1) {
            return userlist.splice(userIndex, 1)[0];
          }
      
          return null;
        },
      }
      
}

module.exports = {resolvers};