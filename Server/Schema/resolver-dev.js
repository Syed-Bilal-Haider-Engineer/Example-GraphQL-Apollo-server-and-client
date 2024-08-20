const { userlist } = require('../fakeUserData');

const resolvers = {
  Query: {
    users: () => userlist,
  },

  Mutation: {
    createUser: (parent, { input }) => {
      const lastId = userlist[userlist.length - 1]?.id || 0;
      const newUser = { ...input, id: lastId + 1 };
      userlist.push(newUser);
      return newUser;
    },

    updateUsername: (parent, { input: { id, newUsername } }) => {
      const user = userlist.find((user) => user.id === Number(id));
      return user ? { ...user, username: user.username = newUsername } : null;
    },

    deleteUser: (parent, { id }) => {
      const userIndex = userlist.findIndex((user) => user.id === Number(id));
      return userIndex !== -1 ? userlist.splice(userIndex, 1)[0] : null;
    },
  },
};

module.exports = { resolvers };
