import fs from "fs";
import fetch from "node-fetch";


let friendReq = 105;
let count = 0;
let rawdata = fs.readFileSync("Users.json");
let student = JSON.parse(rawdata);
console.log("Total Users", student.length)
console.log(student[0]['access_token'])




global.Headers = fetch.Headers;

let sendFriendReq = async () => {
    let access_token = student[count]["access_token"];

    var myHeaders = {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
    };

    var raw = JSON.stringify({
        username: "mtktest",
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    await fetch(
        "https://staging.friends.api.by433.com/api/send-request",
        requestOptions
    )
        .then((response) => console.log(response.json()))




}

// sendFriendReq();

let callFriendreq = () => {

    if (++count < friendReq) {
        sendFriendReq();
        callFriendreq()
    }
}


callFriendreq()