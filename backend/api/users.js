let onlineUsers = [];
let unpairedUsers = [];

const addUser = (userId, socketId) => {
  const existingUser = onlineUsers.find((user) => user.userId === userId);
  const existingSocket = onlineUsers.find((user) => user.socketId === socketId);

  // Remove existing socket if found
  if (existingSocket) {
    removeUser(socketId);
  }

  // Remove existing user with same userId (for page refresh case)
  if (existingUser) {
    removeUser(existingUser.socketId);
  }

  const user = { userId, socketId };
  onlineUsers.push(user);

  return { user };
};

const addUnpairedUser = (userId) => {
  const existingUser = unpairedUsers.find((user) => user === userId);

  if (existingUser) {
    return { error: "User already unPaired" };
  }

  unpairedUsers.push(userId);

  return {};
};

// Make sure removeUser function returns the removed user
const removeUser = (socketId) => {
  const index = onlineUsers.findIndex((user) => user.socketId === socketId);
  if (index !== -1) {
    return onlineUsers.splice(index, 1)[0];
  }
  return null;
};

const removeUnpairedUser = (userId) => {
  const filteredUnpairedUsers = unpairedUsers.filter((user) => user !== userId);

  unpairedUsers = filteredUnpairedUsers;
};

const getUser = (userId) => onlineUsers.find((user) => user.userId === userId);

const getUsers = () => onlineUsers;

const getUnpairedUsers = () => unpairedUsers;

module.exports = {
  getUser,
  removeUser,
  addUser,
  getUsers,
  addUnpairedUser,
  getUnpairedUsers,
  removeUnpairedUser,
};
