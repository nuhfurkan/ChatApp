var socket = io();
var user;

var messages = document.createElement("div");
var msg = document.createElement("input");
msg.type = "text";
var sendButton = document.createElement("button");
sendButton.textContent = "send";

sendButton.addEventListener("click", () => {
    var message = msg.value;
    if (message != "") {
        socket.emit("myMessage", {message: message, username: user});
    } else {
        alert("Message cannot be empty!");
    }
});

function setUserName() {
    socket.emit("setUserName", document.getElementById("name").value);
}

socket.on("userExists", (userData) => {
    alert("This user is already exist: " + userData);
});

socket.on("userSet", (username) => {
    user = username.userData;
    //console.log("will direct the message section");
    
    while (document.body.firstChild) {
        document.body.removeChild(document.body.lastChild);
    }

    document.body.appendChild(msg);
    document.body.appendChild(sendButton);
    document.body.appendChild(messages);
    
});

socket.on("newMessage", (messageData) => {
    console.log("will add the messages");
    messages.innerHTML += `
        <div>
            <p>
                <b>`+ messageData.username +`:</b> `+ messageData.message +`
            </p>
        </div>
    `;
});
