import fs from "fs";
import { runMain } from "module";
import fetch from "node-fetch";

let reqIDS = []

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxZmIzZjJkMTk2NmE5MjNlNmM0ZTEwIiwiZmlyc3RfbmFtZSI6IldhbGVlZCAgRWJyYWhpbSIsImxhc3RfbmFtZSI6IlF1YWxpdHkgQXNzdXJhbmNlIiwiZ2VuZGVyIjpudWxsLCJkYXRlX29mX2JpcnRoIjoiMTk4OS0wOS0xOVQwMDowMDowMC4wMDBaIiwiZW1haWwiOiJ3YWxlZWQuYWhtZWRAYnk0MzMuY29tIiwidXNlcm5hbWUiOiJ3YWxlZWQ0MzMiLCJwcm9maWxlX3BpY3R1cmUiOiJtZWRpYS9wcm9maWxlX3BpY3R1cmUvMTY2OTg4NjE1NjI1M18xNDc2ODYzLmpwZWciLCJsYXN0X3NlZW4iOiIyMDIyLTExLTAzVDA5OjMyOjA0LjAwMFoiLCJiaW9ncmFwaHkiOiIiLCJub19vZl9mcmllbmRzIjowLCJqZXJzZXlfbnVtYmVyIjo3LCJpc19tYW51YWxfbG9naW4iOnRydWUsIm5vdGlmaWNhdGlvbiI6ZmFsc2UsImlzX2RlbW8iOmZhbHNlLCJkZXZpY2VfdG9rZW4iOm51bGwsInByb2ZpbGVfYWNjZXNzaWJpbGl0eSI6InB1YmxpYyJ9LCJpYXQiOjE2NzAxOTA1NjEsImV4cCI6MTY3MDI3Njk2MSwiYXVkIjoiW29iamVjdCBPYmplY3RdIiwiaXNzIjoiNDMzLWRldiJ9.7ugD0fBqxOF0C5tnkilIJAzL0z_V6EnauE-VYV3DRwU");

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