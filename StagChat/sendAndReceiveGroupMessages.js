import io from "socket.io-client";
import fs from "fs";
import log4js from "log4js";

log4js.configure({
    appenders: { cheese: { type: "file", filename: "GroupChatLoadTest.log" } },
    categories: { default: { appenders: ["cheese"], level: "all" } },
});

const logger = log4js.getLogger();


// const URL = "http://3.89.221.218:3000";
const URL = "https://chat.by433.com:3000";
//const URL = "http://poc.socket.by433.com:3000"
const MAX_CLIENTS = 11;
const CLIENT_CREATION_INTERVAL_IN_MS = 100;
const ReportCreation_INTERVAL_IN_MS = 120000
const EMIT_INTERVAL_IN_MS = 1000;

let rawdata = fs.readFileSync("Users.json");
const student = JSON.parse(rawdata);
let clientCount = 0;


// reporting parameters
let TOTAL_USERS_CREATED = 0
let CONNECTED_USERS = 0
let RECONNECTING = 0
let CONNECTING = 0
let CONNECT_ERROR = 0
let CONNECTION_FAILED = 0
let RECONNECT_FAILED = 0
let DISCONNECTED_USERS = 0
let Errors = []
//


let MESSAGE_COUNTER = 1



const createClient = () => {
    TOTAL_USERS_CREATED += 1
    let COUNTER = 0
    let userName = student[clientCount]["username"]
    const transports = ["websocket"];
    //console.log(student[0])
    //logger.info("User Created  - username" + student[clientCount]['username'])
    let GroupID = "638d27d7aa6799fc301a09ea"
    const socket = io(URL + "?token=" + student[clientCount]["access_token"] + "&user_id=" + student[clientCount]["userID"] + "&username=" + userName, {
        transports,
    }, { 'timeout': 5000, 'connect timeout': 5000, secure: true, reconnection: false });

    socket.on("connect", (reason) => {
        CONNECTED_USERS += 1
        logger.info(`Connected to the Server" - Total ${CONNECTED_USERS} - username : ${userName} ${reason}`)
        console.log(`Connected to the Server" - Total ${CONNECTED_USERS} - username : ${userName} ${reason}`)
    });

    const disconnectSocket = () => {
        socket.close()
    }


    const sendMessage = () => {
        socket.emit("send-message", {
            "key_type": "group",
            "id": GroupID,
            "message": `${userName} --  ${COUNTER} `
        })
        COUNTER += 1
        console.log(COUNTER)
        // if (MESSAGE_COUNTER > COUNTER) {
        //     sendMessage()
        // }

    }
    setInterval(sendMessage, 1000)

    socket.on("message-received", (message) => {
        RECONNECTING += 1
        let msg = message['message']
        logger.info(`username: ${userName}  - Message: ${msg}`)
        console.info(`username: ${userName} - Message: ${msg}`)
    });



    //setTimeout(disconnectSocket, 20000);
    // setInterval(() => {
    //     socket.emit("client to server event");
    // }, EMIT_INTERVAL_IN_MS);


    socket.on("connect_failed", (reason) => {
        CONNECTION_FAILED += 1
        Errors.push(reason)
        logger.fatal(`Connect Failed to the server - username ${userName}  - ${reason}`)
        console.fatal(`Connect Failed to the server - username ${userName}  - ${reason}`)
    });

    socket.on("connecting", (reason) => {
        CONNECTING += 1
        Errors.push(reason)
        logger.warn(`Connecting to the server - username ${userName}  - ${reason}`)
        console.warn(`Connecting to the server - username ${userName}  - ${reason}`)
    });


    socket.on("reconnecting", (reason) => {
        RECONNECTING += 1
        logger.warn(`ReConnecting to the server - username ${userName}  - ${reason}`)
        console.warn(`ReConnecting to the server - username ${userName}  - ${reason}`)
    });


    // socket.on("notifications", (matchEvenet) => {
    //     console.log(matchEvenet)
    //     logger.log(matchEvenet)
    //     logger.info(`Match Event - username ${userName}  - ${matchEvenet}`)
    //     console.info(`Match Event - username ${userName}  - ${matchEvenet}`)
    // });

    socket.on("notifications", (matchEvenet) => {
        console.log(matchEvenet)
        logger.log(matchEvenet)
        logger.info(`Match Notification - username ${userName}  - ${matchEvenet}`)
        console.info(`Match Notification - username ${userName}  - ${matchEvenet}`)
    });

    socket.on("connect_error", (reason) => {
        CONNECT_ERROR += 1
        Errors.push(reason)
        logger.error(`Connect Error to the server - username ${userName}  - ${reason}`)
        console.error(`Connect Error to the server - username ${userName}  - ${reason}`)
    });

    socket.on("Reconnect_failed ", (reason) => {
        RECONNECT_FAILED += 1
        Errors.push(reason)
        logger.fatal(`ReConnect Failed to the server - username ${userName}  - ${reason}`)
        console.fatal(`ReConnect Failed to the server - username ${userName}  - ${reason}`)
    });

    socket.on("disconnect", (reason) => {
        DISCONNECTED_USERS += 1
        logger.warn(`Disconnected to the server - username ${userName}  - ${reason}`)
        console.warn(`Disconnected to the server - username ${userName}  - ${reason}`)
    });

    if (++clientCount < MAX_CLIENTS) {
        setTimeout(createClient, CLIENT_CREATION_INTERVAL_IN_MS)
    }

};

createClient();

const GenerateReport = () => {
    let report = {
        TOTAL_USERS_CREATED: TOTAL_USERS_CREATED,
        CONNECTED_USERS: CONNECTED_USERS,
        RECONNECTING: RECONNECTING,
        CONNECT_ERROR: CONNECT_ERROR,
        CONNECTION_FAILED: CONNECTION_FAILED,
        RECONNECT_FAILED: RECONNECT_FAILED,
        DISCONNECTED_USERS: DISCONNECTED_USERS,
        CONNECTING: CONNECTING,
        Errors: Errors
    }
    logger.info(report)
}

setInterval(GenerateReport, ReportCreation_INTERVAL_IN_MS);