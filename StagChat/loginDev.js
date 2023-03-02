import fs from "fs";


let rawdata = fs.readFileSync("students.json");
const student = JSON.parse(rawdata);

let userCount = 0
// no need to change the count just run the script its auto calculate the length
const loginUrl = "https://staging.sharedservice.api.by433.com/api/auth/login"


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");



let DATA = []

const LoginApi = async () => {
    try {
        let user = student[userCount]
        var raw = JSON.stringify({
            "email": user["email"],
            "password": user["password"]
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(loginUrl, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                let userData = {
                    username: json['data']['user']['username'],
                    email: user['email'],
                    password: user['password'],
                    access_token: json['data']['user']['access_token'],
                    userID: json['data']['user']['id']
                }
                DATA.push(userData)
            })
    }
    catch (error) {
        console.log(error)
    }
}

let callLogin = () => {
    if (userCount++ < student.length) {
        LoginApi()
        console.log(userCount)
        setTimeout(callLogin, 13)
    }
}

callLogin()

let writeFileS = () => {
    fs.writeFile("Users.json", JSON.stringify(DATA), (err) => {
        if (err) throw err;
        console.log("Data written to file");
    });
}

setInterval(writeFileS, 5000)