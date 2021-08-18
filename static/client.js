const socket = io();
let userName;
const textarea = document.querySelector("#textarea");
const messageArea = document.querySelector(".message__area");

do {
    userName = prompt("enter your name");
} while (!userName);


const appendMessage = (msg,type) => {
    let mainDiv = document.createElement("div");
    let className = type;
    mainDiv.classList.add(className, "message");
    let markUp = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markUp;
    messageArea.appendChild(mainDiv);
}

const sendMessage = (sms) => {
    let msg = {
        user: userName,
        message:sms.trim()
    }
    appendMessage(msg, "outgoing")
    socket.emit("message", msg);
}

const handleKey = (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value);
      textarea.value=""
        stb();
    }
 
}
textarea.addEventListener("keyup", handleKey)
socket.on("message", (msg) => {
    appendMessage(msg, "incoming");
    stb();
})

const stb = () => {
    messageArea.scrollTop = messageArea.scrollHeight;
}