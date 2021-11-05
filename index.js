const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require("socket.io")(http);
const { v4: uuidV4 } = require("uuid");

app.use(express.static('./public'));

const PORT = 3000;

let rooms = {};

app.get("/hello", (req, res) => {
    res.send("Hello World!")
});

app.get("/", (req, res) => {
    const room = uuidV4();
    rooms[room] = { count: 0 };
    console.log(rooms);
    res.redirect(`/${room}`);
});

app.get("/:room", (req, res) => {
    const room = req.params.room;
    let count = rooms[room]["count"];
    rooms[room]["count"] = count + 1;
    count = rooms[room]["count"];
    if (count > 2) {
        res.send("2 people already in this room...Please create a new room.");
    }
    else
    {
        res.send(`Get Room= ${room}, users = ${rooms[room]["count"]}`);
    }
});
/** 
io.on("connection", (socket) => {

    console.log('A user connected');
    users += 1;
    io.emit('users-count', users);

    socket.on('message', (message) => {
        console.log("Message received...", message)
        socket.broadcast.emit('message-r', message);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
        users -= 1;
        io.emit('users-count', users);
    })
})

**/



http.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});