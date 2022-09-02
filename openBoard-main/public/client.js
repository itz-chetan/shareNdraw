// const socket = io();
// alert("hi");;
let Name;
var audio = new Audio('audio_file.wav');
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");
let chatSection = document.querySelector(".chat__section");
let closeSection = document.querySelector(".close_section");
let chatBot = document.querySelector(".chatBot");
do {
    Name = prompt("Please enter your name:");
} while (!Name);
chatBot.addEventListener("click",(e)=>{
    chatSection.style.display="block";
    chatBot.style.display="none";
//     var audio = new Audio('audio_file.wav');
    audio.play();
});
closeSection.addEventListener("click",(e)=>{
    chatSection.style.display="none";
    chatBot.style.display="block";
})

textarea.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value.trim());
        // console.log(textarea);
        // e.target.value='';
    }
})
function sendMessage(message) {
    let msg = {
        user: Name,
        message: message.trim()
    }
    appendMessage(msg, 'outgoing');
    scrollToBottom()
    textarea.value='';
    // send to server
    socket.emit('message',msg)
}
function appendMessage(msg, type) {
    let mainDiv = document.createElement("div");
    let className=type;
    mainDiv.classList.add(className,"message");
    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv);
}

// receive message
socket.on('message',(msg)=>{
    // console.log(msg);
    appendMessage(msg,'incoming');
    scrollToBottom()
})

function scrollToBottom()
{
    messageArea.scrollTop=messageArea.scrollHeight
}
