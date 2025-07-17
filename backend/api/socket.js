const {
  addUser,
  removeUser,
  getUser,
  getUsers,
  addUnpairedUser,
  getUnpairedUsers,
  removeUnpairedUser,
} = require("./users");

module.exports = function (server) {
  const io = require("socket.io")(server, {
    cors: {
      "Access-Control-Allow-Origin": process.env.URL,
    },
  });

  io.on("connection", (socket) => {
    console.log(`${socket.id} user just connected!`);

    socket.on("addNewUser", (userId, callback) => {
      const { error } = addUser(userId, socket.id);
      if (error) return callback(error);
      const onlineUsers = getUsers();
      io.emit("getUsers", onlineUsers);
      callback();
    });

    socket.on("paired", (userId, callback) => {
      const { error } = addUnpairedUser(userId);
      if (error) return callback(error);
      const unpairedUser = getUnpairedUsers();
      if (unpairedUser.length < 2) return;
      const user = getUser(userId);
      const user2 = getUser(unpairedUser[0]);
      io.to(user ? user.socketId : null).emit(
        "paired",
        user2 ? user2.userId : null
      );
      removeUnpairedUser(user2 ? user2.userId : null);
      io.to(user2 ? user2.socketId : null).emit(
        "paired",
        user ? user.userId : null
      );
      removeUnpairedUser(user ? user.userId : null);
    });

    socket.on("unpaired", (receiver, callback) => {
      const user = getUser(receiver);
      io.to(user ? user.socketId : null).emit("unpaired");
      if (callback && typeof callback === "function") {
        callback();
      }
    });

    socket.on("closed", (userId, callback) => {
      removeUnpairedUser(userId);
      if (callback && typeof callback === "function") {
        callback();
      }
    });

    socket.on("sendMessage", (receiver, message, callback) => {
      const user = getUser(receiver);
      if (!user) {
        if (callback && typeof callback === "function") {
          return callback("User not found");
        }
        return;
      }
      io.to(user.socketId).emit("sendMessage", message);
      io.to(socket.id).emit("receiveMessage", message);
      if (callback && typeof callback === "function") {
        callback();
      }
    });

    socket.on("typing", (userId) => {
      const user = getUser(userId);
      io.to(user ? user.socketId : null).emit("typing");
    });

    socket.on("notTyping", (userId) => {
      const user = getUser(userId);
      io.to(user.socketId).emit("notTyping");
    });

    socket.on("screen-off", () => {
      const user = removeUser(socket.id);
      if (user) {
        removeUnpairedUser(user.userId);
      }
      const onlineUsers = getUsers();
      io.emit("getUsers", onlineUsers);
    });

    socket.on("offline", () => {
      const user = removeUser(socket.id);
      if (user) {
        removeUnpairedUser(user.userId);
      }
      const onlineUsers = getUsers();
      io.emit("getUsers", onlineUsers);
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} user disconnected!`);

      // Remove user by socket ID
      const disconnectedUser = removeUser(socket.id);

      if (disconnectedUser) {
        // Remove from unpaired users if they were searching
        removeUnpairedUser(disconnectedUser.userId);

        // Notify all users about updated online count
        const onlineUsers = getUsers();
        io.emit("getUsers", onlineUsers);

        // If user was in a chat, notify their partner
        io.emit("userDisconnected", disconnectedUser.userId);

        console.log(
          `User ${disconnectedUser.userId} disconnected. Online users: ${onlineUsers.length}`
        );
      }
    });

    // Add a new event to handle partner disconnection
    socket.on("userDisconnected", (disconnectedUserId) => {
      socket.emit("unpaired");
      socket.emit("partnerDisconnected");
    });
  });
};
