import io from "socket.io-client";

const URL = 'https://chat.by433.com:3030';
let COUNTER = 0
// {
//    "email": "salman.saleem@by433.com",
//     "password": "Salman123!"
// }



const createClient = () => {

    const transports = ["polling", "websocket"];

    let client_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyOWI2ZDI2ZDdiMDVjYjNjY2I4MDg0IiwiZmlyc3RfbmFtZSI6IlNhbG1hbiIsImxhc3RfbmFtZSI6IlNhbGVlbSIsImdlbmRlciI6MSwiZGF0ZV9vZl9iaXJ0aCI6IjIwMDQtMDMtMTdUMDA6MDA6MDAuMDAwWiIsImVtYWlsIjoic2FsbWFuLnNhbGVlbUBieTQzMy5jb20iLCJ1c2VybmFtZSI6InNhbG1hbjIxNCIsInByb2ZpbGVfcGljdHVyZSI6Im1lZGlhL3Byb2ZpbGVfcGljdHVyZS8xNjU4NTA4NDk3MTM1Xzg1NTY2NzEuanBlZyIsImxhc3Rfc2VlbiI6IjIwMjItMDktMTZUMTQ6MzM6MTUuMDAwWiIsImJpb2dyYXBoeSI6IlRlc3RpbmcgVXNlciIsIm5vX29mX2ZyaWVuZHMiOjEzLCJqZXJzZXlfbnVtYmVyIjo3LCJpc19tYW51YWxfbG9naW4iOnRydWUsIm5vdGlmaWNhdGlvbiI6dHJ1ZSwiaXNfZGVtbyI6ZmFsc2UsImRldmljZV90b2tlbiI6bnVsbCwicHJvZmlsZV9hY2Nlc3NpYmlsaXR5IjoicHVibGljIn0sImlhdCI6MTY2MzYwNDg2MiwiZXhwIjoxNjYzNjkxMjYyLCJhdWQiOiJbb2JqZWN0IE9iamVjdF0iLCJpc3MiOiI0MzMtc3RhZ2luZyJ9.25i2oQux-sc7AKL_TQAGuElakrW9RsMgDlQP2MQYqU0'
    let group_ID = '6320fc540af24cc2521eb416'
    let query = "token=" + client_token + "&group_ID=" + group_ID
    let socket = io(URL + "?token=" + client_token, { transports: ['websocket'], secure: true, reconnection: true, rejectUnauthorized: false });

    //console.log(socket)
    //console.log(URL + "?token=" + client_token)
    socket.on("connect", (reason) => {
        console.log(`connected to server `);
        // join group
        //socket.emit("join-group", [group_ID])
        // socket.emit("send-message", {
        //     "key_type": "group",
        //     "id": group_ID,
        //     "message": "-- one --"
        // })

    });

    socket.on("message-received", message => {
        console.log(message)
        COUNTER++
        console.log(`  ----------------  😝😝😝😝😝😝😝   ${COUNTER}     😝😝😝😝😝😝           -------------------`)


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