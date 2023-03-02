import io from "socket.io-client";

const URL = process.env.URL || "wss://chat.by433.com:3030";
// const URL = process.env.URL || "ws://localhost:5000";

const createClient = () => {
  // for demonstration purposes, some clients stay stuck in HTTP long-polling
  // const transports = ["polling", "websockets"];
  //const transports = ["polling"];
  // const transports =
  //   Math.random() < POLLING_PERCENTAGE ? ["polling"] : ["polling", "websocket"];
  let client_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyMGE2M2FjZWE3MWUzZmU2YmVjNzJkIiwiZmlyc3RfbmFtZSI6IldhbGVlZCIsImxhc3RfbmFtZSI6IldhcWFyIiwiZ2VuZGVyIjpudWxsLCJkYXRlX29mX2JpcnRoIjoiMTk4OS0wOS0xOVQwMDowMDowMC4wMDBaIiwiZW1haWwiOiJ3YWxlZWQuYWhtZWRAYnk0MzMuY29tIiwidXNlcm5hbWUiOiJ3YWxlZWQ0MzMiLCJwcm9maWxlX3BpY3R1cmUiOm51bGwsImxhc3Rfc2VlbiI6IjIwMjItMDMtMDdUMjA6MDY6MTEuMDAwWiIsImJpb2dyYXBoeSI6IiIsIm5vX29mX2ZyaWVuZHMiOjEsImplcnNleV9udW1iZXIiOjd9LCJpYXQiOjE2NDY3Mjg3MTksImV4cCI6MTY0NzkzODMxOSwiYXVkIjoiW29iamVjdCBPYmplY3RdIiwiaXNzIjoiNDMzLXN0YWdpbmcifQ.GNDDTHr1eJLyMOue7mQnn5mKER0CqPbbuP3vHH3IqTk'
  let user_id = '6220a63acea71e3fe6bec72d'
  let query = "token="+client_token+"&user_id="+user_id
  // let botUrl = URL + "?token="
  // let botUrl =
  //   "https://chat.by433.com:3030/socket.io/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNWQ5MDkxYjU5N2IzYTFkMDkyM2YwIiwiZmlyc3RfbmFtZSI6Ikhhc3NhbiIsImxhc3RfbmFtZSI6IkFiYmFzIiwiZ2VuZGVyIjoxLCJkYXRlX29mX2JpcnRoIjoiMTk5OC0wMS0yOFQwMDowMDowMC4wMDBaIiwiZW1haWwiOiJoYXNzYW5Aam9nby5haSIsInVzZXJuYW1lIjoiYWJiYXMxMmFzZDM0NTQzIiwicHJvZmlsZV9waWN0dXJlIjpudWxsLCJsYXN0X3NlZW4iOiIyMDIyLTAzLTA3VDE3OjQ2OjE2LjAwMFoiLCJiaW9ncmFwaHkiOiIiLCJub19vZl9mcmllbmRzIjoxLCJqZXJzZXlfbnVtYmVyIjo1fSwiaWF0IjoxNjQ2Njc1NTQ0LCJleHAiOjE2NDc4ODUxNDQsImF1ZCI6IltvYmplY3QgT2JqZWN0XSIsImlzcyI6IjQzMy1zdGFnaW5nIn0.OsnjZ9NMAteUR_v6UNiMgmTfHPG-uJ8mf2yy6LvbdCQ&user_id=6225d9091b597b3a1d0923f0";
  let socket = io(URL,{ query: "token="+client_token+"&user_id="+user_id, transports: ['websocket'], secure: true, reconnection: true, rejectUnauthorized: false});
  setTimeout(function(){
     console.log(socket)
     socket.on("connect", (reason) => {
          console.log(`connected to server ${reason}`);
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
   },10000)
};

createClient();
