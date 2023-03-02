import io from "socket.io-client";
import fs from "fs";
const URL = "https://chat.by433.com:3030/";
const MAX_CLIENTS = 1000;
const CLIENT_CREATION_INTERVAL_IN_MS = 0;
const EMIT_INTERVAL_IN_MS = 1000;

let rawdata = fs.readFileSync("students.json");
let student = JSON.parse(rawdata);

let clientCount = 0;
let lastReport = new Date().getTime();
let packetsSinceLastReport = 0;

// reporting parameters
TOTAL_USERS_CREATED = 0
CONNECTED_USERS = 0
RECONNECT = 0
CONNECT_ERROR = 0
CONNECTION_FAILED = 0
RECONNECT_FAILED = 0
DISCONNECTED_USERS = 0
//


const createClient = () => {
  const transports = ["websocket"];

  const socket = io(URL, {
    transports,
  });

  setInterval(() => {
    socket.emit("client to server event");
  }, EMIT_INTERVAL_IN_MS);

  socket.on("server to client event", () => {
    packetsSinceLastReport++;
  });

  socket.on("disconnect", (reason) => {
    console.log(`disconnect due to ${reason}`);
  });

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

  if (++clientCount < MAX_CLIENTS) {
    setTimeout(createClient, CLIENT_CREATION_INTERVAL_IN_MS);
  }

};

createClient();



