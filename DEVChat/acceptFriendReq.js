import fs from "fs";
import { runMain } from "module";
import fetch from "node-fetch";

let reqIDS = []

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYzdkNDBlOTQ3MGYyYjFkNTA3MjBkIiwiZmlyc3RfbmFtZSI6Ikhhc3NhbiIsImxhc3RfbmFtZSI6IkFiYmFzIiwiZ2VuZGVyIjoxLCJkYXRlX29mX2JpcnRoIjoiMTk5OC0wMS0yOFQwMDowMDowMC4wMDBaIiwiZW1haWwiOiJoYXNzYW4uYWJiYXNAYnk0MzMuY29tIiwidXNlcm5hbWUiOiJoYXNzYW40MzMiLCJwcm9maWxlX3BpY3R1cmUiOm51bGwsImxhc3Rfc2VlbiI6bnVsbCwiYmlvZ3JhcGh5IjoiIiwibm9fb2ZfZnJpZW5kcyI6MCwiamVyc2V5X251bWJlciI6NSwiaXNfbWFudWFsX2xvZ2luIjp0cnVlLCJub3RpZmljYXRpb24iOmZhbHNlLCJpc19kZW1vIjpmYWxzZSwiZGV2aWNlX3Rva2VuIjpudWxsLCJwcm9maWxlX2FjY2Vzc2liaWxpdHkiOiJwdWJsaWMifSwiaWF0IjoxNjc3NDkxODk1LCJleHAiOjE2Nzc1NzgyOTUsImF1ZCI6IltvYmplY3QgT2JqZWN0XSIsImlzcyI6IjQzMy1kZXYifQ.1VvuY4_RQyWnOHt96nFjuASu3t6SP9ZXVtzwf3ofzGA");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

await fetch("https://dev.friends.api.by433.com/api/view-received-requests?limit=100000&from=0", requestOptions)
    .then(response => response.json())
    .then(result => {
        //console.log(result['data']['users'][0])
        let reqIDsArray = result['data']['users']

        for (let r in reqIDsArray) {
            //console.log(r)
            reqIDS.push(reqIDsArray[r]['request_id'])
        }

    }).catch(error => console.log('error', error))

console.log(reqIDS)



myHeaders.append("Content-Type", "application/json");





let AcceptFriendReqs = async (idReq) => {
    var raw = JSON.stringify({
        "request_id": idReq,
        "status": 1
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("https://dev.friends.api.by433.com/api/accept-or-reject-request", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}


let RunMainFlow = () => {
    for (let x in reqIDS) {
        let idReq = reqIDS[x]
        console.log(x, idReq)
        AcceptFriendReqs(idReq)
    }
}


RunMainFlow()