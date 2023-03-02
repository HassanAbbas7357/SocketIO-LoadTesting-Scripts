import io from "socket.io-client";

const URL = 'https://chat.by433.com:3030';

// {
//    "email": "waleed.ahmed@by433.com",
//    "password": "12345678"
//}
// Staging env



let MESSAGE_COUNTER = 1
let COUNTER = 0

const createClient = () => {

    const transports = ["polling", "websocket"];

    let client_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzNGU1OGUwY2UxNTQxOGU1YzhlZDk3IiwiZmlyc3RfbmFtZSI6IkJvdCBIYXNzYW4iLCJsYXN0X25hbWUiOiJCb3QiLCJnZW5kZXIiOjEsImRhdGVfb2ZfYmlydGgiOiIxOTk4LTAxLTI4VDAwOjAwOjAwLjAwMFoiLCJlbWFpbCI6ImZyZW5jaDU1MjAyMjA5Mjk1MjMzMHNvQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZnJlbmNoNTUiLCJwcm9maWxlX3BpY3R1cmUiOiJidWNrZXQgZmlsZSBwYXRoIiwibGFzdF9zZWVuIjpudWxsLCJiaW9ncmFwaHkiOiIiLCJub19vZl9mcmllbmRzIjowLCJqZXJzZXlfbnVtYmVyIjoyMiwiaXNfbWFudWFsX2xvZ2luIjp0cnVlLCJub3RpZmljYXRpb24iOnRydWUsImlzX2RlbW8iOmZhbHNlLCJkZXZpY2VfdG9rZW4iOm51bGwsInByb2ZpbGVfYWNjZXNzaWJpbGl0eSI6InB1YmxpYyJ9LCJpYXQiOjE2NjQ0MTEwNjAsImV4cCI6MTY2NDQ5NzQ2MCwiYXVkIjoiW29iamVjdCBPYmplY3RdIiwiaXNzIjoiNDMzLWRldiJ9.YS0I__1LKVmSocX52WjOgG9JU9CAELCNusMscz_mlOg"
    let user_id = '6320fc540af24cc2521eb416'
    let query = "token=" + client_token + "&user_id=" + user_id
    let socket = io(URL + "?token=" + client_token, { transports: ['websocket'], secure: true, reconnection: true, rejectUnauthorized: false });

    //console.log(socket)
    //console.log(URL + "?token=" + client_token)
    socket.on("connect", (reason) => {
        console.log(`connected to server `);
        // join group
        socket.emit("join-group", ['6320fc540af24cc2521eb416'])

        socket.emit("send-message", {
            "key_type": "group",
            "id": user_id,
            "message": "-----------------  one  --------------------------------"
        })
        //sendMessage()
        setInterval(sendMessage, 1000)
        // socket.emit("send-message", {
        //     "key_type": "user",
        //     "id": user_id,
        //     "message": "-----------------  one  --------------------------------"
        // })

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

    const sendMessage = () => {
        // socket.emit("send-message", {
        //     "key_type": "group",
        //     "id": user_id,
        //     "message": `-----------------  ${COUNTER}  --------------------------------`
        // })
        COUNTER += 1
        console.log(COUNTER)
        // if (MESSAGE_COUNTER > COUNTER) {
        //     sendMessage()
        // }

    }

    socket.on("message-received", message => {
        console.log(message)

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