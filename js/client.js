var socket = io('https://chat-app1000.herokuapp.com', { transports : ['websocket'] });
const form = document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');
const messageContainer= document.querySelector(".container");
var audio = new Audio('ting.mp3')
const appendfunc = (message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=="left")
    {
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    appendfunc(messageInput.value,"right");
    socket.emit("send_message",messageInput.value);
    messageInput.value="";
})

const name = prompt("enter your name to enter the chat");
let nam3 = "soumya";
console.log(name);
socket.emit("user_joined",name );
socket.on('user_join', data=>{
    appendfunc(`${data} joined the chat`,"right")
})
socket.on('receive',data=>{
    appendfunc(`${data.name}: ${data.messages}` , "left");
});
// socket.emit("disconnect");
socket.on('user_offline',data=>{
    console.log(data);
    appendfunc(`${data.name} offline` , "left");
})
