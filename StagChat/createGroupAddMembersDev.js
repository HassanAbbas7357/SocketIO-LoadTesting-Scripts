import fetch from "node-fetch";

let membersIDS = []

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxZmIzZjJkMTk2NmE5MjNlNmM0ZTEwIiwiZmlyc3RfbmFtZSI6IldhbGVlZCAgRWJyYWhpbSIsImxhc3RfbmFtZSI6IlF1YWxpdHkgQXNzdXJhbmNlIiwiZ2VuZGVyIjpudWxsLCJkYXRlX29mX2JpcnRoIjoiMTk4OS0wOS0xOVQwMDowMDowMC4wMDBaIiwiZW1haWwiOiJ3YWxlZWQuYWhtZWRAYnk0MzMuY29tIiwidXNlcm5hbWUiOiJ3YWxlZWQ0MzMiLCJwcm9maWxlX3BpY3R1cmUiOiJtZWRpYS9wcm9maWxlX3BpY3R1cmUvMTY2OTg4NjE1NjI1M18xNDc2ODYzLmpwZWciLCJsYXN0X3NlZW4iOiIyMDIyLTExLTAzVDA5OjMyOjA0LjAwMFoiLCJiaW9ncmFwaHkiOiIiLCJub19vZl9mcmllbmRzIjowLCJqZXJzZXlfbnVtYmVyIjo3LCJpc19tYW51YWxfbG9naW4iOnRydWUsIm5vdGlmaWNhdGlvbiI6ZmFsc2UsImlzX2RlbW8iOmZhbHNlLCJkZXZpY2VfdG9rZW4iOm51bGwsInByb2ZpbGVfYWNjZXNzaWJpbGl0eSI6InB1YmxpYyJ9LCJpYXQiOjE2NzAxOTA1NjEsImV4cCI6MTY3MDI3Njk2MSwiYXVkIjoiW29iamVjdCBPYmplY3RdIiwiaXNzIjoiNDMzLWRldiJ9.7ugD0fBqxOF0C5tnkilIJAzL0z_V6EnauE-VYV3DRwU");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

await fetch("https://dev.friends.api.by433.com/api/view-my-friends?limit=22000000&from=0", requestOptions)
    .then(response => response.json())
    .then(result => {
        let results = result['data']['users']
        for (let x in results) {
            let UserID = results[x]['id']
            membersIDS.push(UserID)
        }
    })
    .catch(error => console.log('error', error));

console.log(membersIDS)

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxZmIzZjJkMTk2NmE5MjNlNmM0ZTEwIiwiZmlyc3RfbmFtZSI6IldhbGVlZCAgRWJyYWhpbSIsImxhc3RfbmFtZSI6IlF1YWxpdHkgQXNzdXJhbmNlIiwiZ2VuZGVyIjpudWxsLCJkYXRlX29mX2JpcnRoIjoiMTk4OS0wOS0xOVQwMDowMDowMC4wMDBaIiwiZW1haWwiOiJ3YWxlZWQuYWhtZWRAYnk0MzMuY29tIiwidXNlcm5hbWUiOiJ3YWxlZWQ0MzMiLCJwcm9maWxlX3BpY3R1cmUiOiJtZWRpYS9wcm9maWxlX3BpY3R1cmUvMTY2OTg4NjE1NjI1M18xNDc2ODYzLmpwZWciLCJsYXN0X3NlZW4iOiIyMDIyLTExLTAzVDA5OjMyOjA0LjAwMFoiLCJiaW9ncmFwaHkiOiIiLCJub19vZl9mcmllbmRzIjowLCJqZXJzZXlfbnVtYmVyIjo3LCJpc19tYW51YWxfbG9naW4iOnRydWUsIm5vdGlmaWNhdGlvbiI6ZmFsc2UsImlzX2RlbW8iOmZhbHNlLCJkZXZpY2VfdG9rZW4iOm51bGwsInByb2ZpbGVfYWNjZXNzaWJpbGl0eSI6InB1YmxpYyJ9LCJpYXQiOjE2NzAxOTA1NjEsImV4cCI6MTY3MDI3Njk2MSwiYXVkIjoiW29iamVjdCBPYmplY3RdIiwiaXNzIjoiNDMzLWRldiJ9.7ugD0fBqxOF0C5tnkilIJAzL0z_V6EnauE-VYV3DRwU");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "image": "https://i.pinimg.com/originals/0e/0f/8b/0e0f8b42b900892b904381e532306bd0.jpg",
    "user_ids": membersIDS,
    "title": "Dexter's Laboratory"
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("https://dev.chat.api.by433.com/api/create-group", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));