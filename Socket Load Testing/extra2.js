import io from "socket.io-client";
import fs from "fs";
let socket_url = 'http://3.89.221.218:5000';
let rawdata = fs.readFileSync("user_tokens.json");
const data = JSON.parse(rawdata);

let connect = 0;
let error = 0;
for (var i = 0; i < data.length; i++) {
    let socket = io(socket_url, {
        query: "user_id=" + data[i].user_id + "&token=" + data[i].token,
        transports: ["websocket", "polling"],
        forceNew: true,
        // reconnection: true,
        reconnectionDelay: 1000,
        // reconnectionDelayMax: 5000,
        // reconnectionAttempts: 2,
        timeout: 8000
    });
    // socket.on('connect_error', function (err) {
    //     error++;
    //     socket.connect()
    //     // console.log('connect error', err.message)
    // });
    // socket.on('connect_timeout', function (err) {
    //     // error++;
    //     socket.connect()
    // });
    // socket.on('disconnect', function (err) {
    //     // error++;
    //     socket.connect()
    // });
    socket.on('connect', function (data) {
        connect++;
        console.log('user connected', connect)
    });
}