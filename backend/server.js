// express
const express = require('express');
const app = express();

// socket.io
const socket = require('socket.io');
const port = 8080;

// db
const db = require('./userDB.js');

server = app.listen(port, function(){
    console.log('server is running on port ',port)
});

io = socket(server);

var username = "default"

// When client connected
io.on('connection', async (socket)=> {
    var client_ip = socket.request.connection.remoteAddress;
    client_ip = client_ip.split(":")[3]

    console.log('User connected : ', client_ip)

    // get user info from db
    // console.log('Getting userinfo')
    var userinfo = await db.find_db(client_ip);

    // send client ip
    io.emit('RECEIVE_IP', client_ip);

    // send user info 
    io.emit('RECEIVE_USERINFO', userinfo);
    io.emit('RECEIVE_USERWIN', userinfo.win);
    io.emit('RECIEVE_USERLOSE', userinfo.lose);

    // Username이 바뀌었을때
    socket.on('CHANGE_USERNAME', function(data){
        username = data.username
        
        db.update_db(client_ip, 'nickname', username)

        console.log("[CHANGE_USERNAME] IP : ", client_ip, " Username : ", username)
        // console.log("[CHANGE_USERNAME] change username : ",username)
    })
})

