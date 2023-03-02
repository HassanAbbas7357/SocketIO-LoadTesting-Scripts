import fs from "fs";
import fetch from "node-fetch";
import randomEmail from "random-email";
import UsernameGenerator from "username-generator";
import dateFormat from "dateformat";

let friendReq = 31;
let count = 0;
let rawdata = fs.readFileSync("Users.json");
let student = JSON.parse(rawdata);
let rrr = 0;

let data = student.reverse()

global.Headers = fetch.Headers;
let url =
    "https://dev.friends.api.by433.com/api/send-request";

let sendFriendReq = async () => {
    let access_token = data[count]["access_token"];

    var myHeaders = {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
    };

    var raw = JSON.stringify({
        username: "hassan433",
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };
    var resul
    await fetch(
        "https://dev.friends.api.by433.com/api/send-request",
        requestOptions
    )
        .then((response) => response.json())
        .then((json) => {
            resul = json
            rrr += 1
            console.log(json);
            console.log(rrr);
        })
        .catch((error) => console.log("error", error))

    console.log("---this ----> ", resul)

    if (resul["response"] == true) {
        let senderID = resul['data']['request']['created_by']
        let receiverID = resul['data']['request']['user_id']
        let reqID = resul['data']['request']['_id']

        var reqOpBody = JSON.stringify({
            "sender_id": senderID,
            "receiver_id": receiverID,
            "request_id": reqID
        })
        var requestOption = {
            method: "POST",
            headers: myHeaders,
            body: reqOpBody,
            redirect: "follow",
        }
        // console.log("----------------------------------------")
        // console.log(reqOpBody)
        // console.log(requestOption)

        // console.log("----------------------------------------")
        fetch('https://dev.friends.api.by433.com/api/start-one-on-one-chat', requestOption)
            .then((res) => res)
            .then(async (res) => {
                let re = await res.json()
                console.log(re)
            })
            .catch((err) => console.log(err));
    }
}



const Runner = () => {
    if (++count < friendReq) {
        sendFriendReq();
        Runner()

    };
    console.log("All SENT")
}


Runner()

// sendFriendReq();
