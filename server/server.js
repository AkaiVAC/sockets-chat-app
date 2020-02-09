const express = require("express");
const socket = require("socket.io");

// Initialize Express
const app = express();

// Middlewares
app.use(express.static("./client"));

// Routing

// Listen on port
const port = process.env.port;
const server = app.listen(
	port,
	console.log(`Listening on: http://localhost:${port}`)
);

// Socket setup
const io = socket(server);
io.on("connection", socket => {
	console.log(`Connected to a socket: ${socket.id}`);

	socket.on("chat", data => {
		io.sockets.emit("chat", data);
	});

	socket.on("typing", data => {
		socket.broadcast.emit("typing", data);
	});
});
