import io from "socket.io-client";

const URL = 'https://chat.by433.com:3030';

let MESSAGE_COUNTER = 10
let COUNTER = 0

const createClient = () => {

    const transports = ["polling", "websocket"];

    let client_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmYjUzYTFjOTdkZWFjM2ZiYzk1NTMyIiwiZmlyc3RfbmFtZSI6IlRlc3QiLCJsYXN0X25hbWUiOiJNb2hzaW4iLCJnZW5kZXIiOm51bGwsImRhdGVfb2ZfYmlydGgiOiIyMDIyLTA4LTE2VDAwOjAwOjAwLjAwMFoiLCJlbWFpbCI6InZhc2Fyb2M0NjFAc2FmZS1jYXJ0LmNvbSIsInVzZXJuYW1lIjoidGVzdGNyYXNobW9oc2luIiwicHJvZmlsZV9waWN0dXJlIjpudWxsLCJsYXN0X3NlZW4iOiIyMDIyLTA5LTA3VDA5OjEyOjI4LjAwMFoiLCJiaW9ncmFwaHkiOiIiLCJub19vZl9mcmllbmRzIjoyLCJqZXJzZXlfbnVtYmVyIjo2OSwiaXNfbWFudWFsX2xvZ2luIjp0cnVlLCJub3RpZmljYXRpb24iOnRydWUsImlzX2RlbW8iOmZhbHNlLCJkZXZpY2VfdG9rZW4iOm51bGwsInByb2ZpbGVfYWNjZXNzaWJpbGl0eSI6InB1YmxpYyJ9LCJpYXQiOjE2NjI1NDU0NTgsImV4cCI6MTY2MjYzMTg1OCwiYXVkIjoiW29iamVjdCBPYmplY3RdIiwiaXNzIjoiNDMzLXN0YWdpbmcifQ.phu01oJf77HvbQQIA3o3ZSczqtblG8_FZWlYg1AClpY'
    let user_id = '63189040940587f83d5bf07c'
    let query = "token=" + client_token + "&user_id=" + user_id
    let socket = io(URL + "?token=" + client_token, { transports: ['websocket'], secure: true, reconnection: true, rejectUnauthorized: false });

    //console.log(socket)
    //console.log(URL + "?token=" + client_token)
    socket.on("connect", (reason) => {
        console.log(`connected to server `);
        // join group
        socket.emit("join-group", [user_id])

        socket.emit("send-message", {
            "key_type": "group",
            "id": user_id,
            "message": "-----------------  one  --------------------------------"
        })


        // bulk send messages
        // for (let i = 0; i < MESSAGE_COUNTER; i++) {
        //     COUNTER += 1
        //     socket.emit("send-message", {
        //         "key_type": "group",
        //         "id": user_id,
        //         "message": { "Counter": COUNTER, "Message": "Guardian Angel" }
        //     })
        // }

    });

    socket.on("message-received", message => {
        //console.log(message)

    })

    socket.on("connect_failed", (reason) => {
        console.log(`coonection failed not connected to server ${reason}`);
    });

    socket.on("connecting", (reason) => {
        console.log(`connecting to server ${reason}`);
    });

    socket.on("reconnecting", (reason) => {
        console.log(`reconnecting to server ${reason}`);
    });

    socket.on("connect_error", (reason) => {
        console.log(`connect error to server ${reason}`);
    });

    socket.on("Reconnect_failed ", (reason) => {
        console.log(`reconnection failed to server ${reason}`);
    });

    socket.on("disconnect", (reason) => {
        console.log(`disconnect due to ${reason}`);
    });

};


createClient()