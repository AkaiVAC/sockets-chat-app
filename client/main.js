let socket = io.connect("http://localhost:5100");

const handle = document.querySelector("#handle");
const chat = document.querySelector("#chat");
const output = document.querySelector(".output");
const submit = document.querySelector(".sendMessage");

const typing = document.querySelector(".typing");
const errorMsg = document.querySelector(".errorMessage").classList;

// Send data
submit.addEventListener("click", () => {
	handleErrors();
	const chatMessage = {
		handle: handle.value,
		message: chat.value
	};
	socket.emit("chat", chatMessage);

	chat.value = "";
});

chat.addEventListener("keypress", () => {
	if (!handle.value) return false;
	socket.emit("typing", handle.value);
});

// Receive data
socket.on("chat", ({ handle, message }) => {
	typing.innerHTML = "";
	output.innerHTML += `<frameset><h3>${handle}</h3><p>${message}</p></frameset>`;
});

socket.on("typing", name => {
	typing.innerHTML = `${name} is typing`;
});

const handleErrors = () => {
	if (!handle.value || !chat.value) {
		errorMsg.remove("hide");
		return false;
	} else {
		errorMsg.add("hide");
	}
};
