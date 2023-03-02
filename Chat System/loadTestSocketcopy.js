import io from "socket.io-client";

const URL = 'https://chat.by433.com:3030';

const createClient = () => {

    const transports = ["polling", "websocket"];

    let client_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmYjUzYTFjOTdkZWFjM2ZiYzk1NTMyIiwiZmlyc3RfbmFtZSI6IlRlc3QiLCJsYXN0X25hbWUiOiJNb2hzaW4iLCJnZW5kZXIiOm51bGwsImRhdGVfb2ZfYmlydGgiOiIyMDIyLTA4LTE2VDAwOjAwOjAwLjAwMFoiLCJlbWFpbCI6InZhc2Fyb2M0NjFAc2FmZS1jYXJ0LmNvbSIsInVzZXJuYW1lIjoidGVzdGNyYXNobW9oc2luIiwicHJvZmlsZV9waWN0dXJlIjpudWxsLCJsYXN0X3NlZW4iOiIyMDIyLTA5LTA3VDA5OjEyOjI4LjAwMFoiLCJiaW9ncmFwaHkiOiIiLCJub19vZl9mcmllbmRzIjoyLCJqZXJzZXlfbnVtYmVyIjo2OSwiaXNfbWFudWFsX2xvZ2luIjp0cnVlLCJub3RpZmljYXRpb24iOnRydWUsImlzX2RlbW8iOmZhbHNlLCJkZXZpY2VfdG9rZW4iOm51bGwsInByb2ZpbGVfYWNjZXNzaWJpbGl0eSI6InB1YmxpYyJ9LCJpYXQiOjE2NjI1NDU0NTgsImV4cCI6MTY2MjYzMTg1OCwiYXVkIjoiW29iamVjdCBPYmplY3RdIiwiaXNzIjoiNDMzLXN0YWdpbmcifQ.phu01oJf77HvbQQIA3o3ZSczqtblG8_FZWlYg1AClpY'
    let user_id = '6220a63acea71e3fe6bec72d'
    let query = "token=" + client_token + "&user_id=" + user_id
    // let botUrl = URL + "?token="
    // let botUrl =
    //   "https://chat.by433.com:3030/socket.io/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNWQ5MDkxYjU5N2IzYTFkMDkyM2YwIiwiZmlyc3RfbmFtZSI6Ikhhc3NhbiIsImxhc3RfbmFtZSI6IkFiYmFzIiwiZ2VuZGVyIjoxLCJkYXRlX29mX2JpcnRoIjoiMTk5OC0wMS0yOFQwMDowMDowMC4wMDBaIiwiZW1haWwiOiJoYXNzYW5Aam9nby5haSIsInVzZXJuYW1lIjoiYWJiYXMxMmFzZDM0NTQzIiwicHJvZmlsZV9waWN0dXJlIjpudWxsLCJsYXN0X3NlZW4iOiIyMDIyLTAzLTA3VDE3OjQ2OjE2LjAwMFoiLCJiaW9ncmFwaHkiOiIiLCJub19vZl9mcmllbmRzIjoxLCJqZXJzZXlfbnVtYmVyIjo1fSwiaWF0IjoxNjQ2Njc1NTQ0LCJleHAiOjE2NDc4ODUxNDQsImF1ZCI6IltvYmplY3QgT2JqZWN0XSIsImlzcyI6IjQzMy1zdGFnaW5nIn0.OsnjZ9NMAteUR_v6UNiMgmTfHPG-uJ8mf2yy6LvbdCQ&user_id=6225d9091b597b3a1d0923f0";
    let socket = io(URL + "?token=" + client_token, { transports: ['websocket'], secure: true, reconnection: true, rejectUnauthorized: false });

    //console.log(socket)
    socket.on("connect", (reason) => {
        console.log(`connected to server `);
    });

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