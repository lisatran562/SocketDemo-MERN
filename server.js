const express = require("express");
const app = express();
const port = 8000;
const server = app.listen(port, () => console.log(`Running on port ${port}!`));

const io = require("socket.io")(server, {cors: true});

// emitters - passes data where it needs to go (emit)
// on - trigger -- listening for a particular event

// Name of the trigger
io.on('connection', socket => {
    console.log(socket.id)
    socket.on('chat', msg => {
        console.log("Got the message: " + msg);
        io.emit('post chat', msg)
    })
})


