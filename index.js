var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
users = [];

app.use("/", require("express").static("public"));

io.on("connection", (socket) => {
    console.log("somebody connected");
    socket.on("setUserName", (userData) => {
        if (users.indexOf(userData) > -1) {
            socket.emit("userExists", userData);
        } else {
            users.push(userData);
            socket.emit("userSet", {userData: userData});
        }
    })

    socket.on("myMessage", (messageData) => {
        io.sockets.emit("newMessage", messageData);
    })
})

server.listen(3000, () => {
    console.log("started to listen at 3000");
})

