const { addUser, removeUser, getUser, getUsers, addUnpairedUser, getUnpairedUsers, removeUnpairedUser } = require("./users")

module.exports = function (server) {
    const io = require('socket.io')(server, {
        cors: {
            "Access-Control-Allow-Origin": process.env.URL
        }
    });

    io.on('connection', (socket) => {
        console.log(`${socket.id} user just connected!`)

        socket.on("addNewUser", (userId, callback) => {
            const { error } = addUser(userId, socket.id)
            if (error) return callback(error)
            const onlineUsers = getUsers()
            io.emit("getUsers", onlineUsers);
            callback()
        });

        socket.on("paired", (userId, callback) => {
            const { error } = addUnpairedUser(userId)
            if (error) return callback(error)
            const unpairedUser = getUnpairedUsers()
            if (unpairedUser.length < 2) return
            const user = getUser(userId)
            const user2 = getUser(unpairedUser[0])
            io.to(user ? user.socketId : null).emit("paired", user2 ? user2.userId : null)
            removeUnpairedUser(user2 ? user2.userId : null)
            io.to(user2 ? user2.socketId : null).emit("paired", user? user.userId : null)
            removeUnpairedUser(user? user.userId : null)
        })

        socket.on("closed", (userId, callback) => {
            removeUnpairedUser(userId)
            callback()
        })

        socket.on("sendMessage", (receiver, message, callback) => {
            const user = getUser(receiver)
            if (!user) {
                return callback("User not found")
            }
            io.to(user.socketId).emit("sendMessage", message)
            io.to(socket.id).emit("receiveMessage", message)
            callback()
        })

        socket.on("unpaired", (receiver, callback) => {
            const user = getUser(receiver)
            io.to(user ? user.socketId : null).emit("unpaired")
            callback()
        })

        socket.on("typing", (userId) => {
            const user = getUser(userId)
            io.to(user? user.socketId : null).emit("typing")
        })

        socket.on("notTyping", (userId) => {
            const user = getUser(userId)
            io.to(user.socketId).emit("notTyping")
        })

        socket.on("screen-off", () => {
            const user = removeUser(socket.id)
            removeUnpairedUser(user.userId)
            const onlineUsers = getUsers()
            io.emit("getUsers", onlineUsers);
        })

        socket.on("offline", () => {
            const user = removeUser(socket.id)
            removeUnpairedUser(user.userId)
            const onlineUsers = getUsers()
            io.emit("getUsers", onlineUsers);
        });

        socket.on("disconnect", () => {
            const user = removeUser(socket.id)
            removeUnpairedUser(user ? user.userId : null)
            const onlineUsers = getUsers()
            io.emit("getUsers", onlineUsers);
            console.log('A user disconnected')
        })
    });
}