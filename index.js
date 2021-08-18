const express = require("express");
const app = express();
const path = require("path");
const httpServer = require("http").createServer(app);
const dotenv = require("dotenv");
const { Socket } = require("socket.io");
dotenv.config({ path: "config/config.env" });
const io = require("socket.io")(httpServer);
const port = process.env.PORT || 8080;
app.use('/static', express.static("static"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public", "index.html"));
})

httpServer.listen(port, () => {
    console.log("😁😁😁🙈🙈🙈");
})

//socket

io.on("connection", (socket) => {
    socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg);
    })
    
})