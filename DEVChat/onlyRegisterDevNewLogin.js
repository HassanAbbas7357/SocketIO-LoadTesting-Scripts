import fs from "fs";
import fetch from "node-fetch";
import randomEmail from "random-email";
import UsernameGenerator from "username-generator";
import dateFormat from "dateformat";
// import { exec } from "child_process";
const numUsers = 200;
let loopCount = 0;
const password = "Hsf328612,./";
var usNameRandomKey = "res";
let rawdata = fs.readFileSync("students.json");
let usersData = JSON.parse(rawdata);

// ----------------------------


const devSecrete = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InRlYW0iOiJRQSIsInB1cnBvc2UiOiJ1c2Vycy1sb2FkLXRlc3RpbmcifSwiaWF0IjoxNjY2MDgyMjM3LCJhdWQiOiJbb2JqZWN0IE9iamVjdF0iLCJpc3MiOiI0MzMtZGV2In0.KZS7RJMFd_If6gNEAa-IAsgZEZfj8FK5ZTaZu-C_x0k"
const stagSecrete = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InRlYW0iOiJRQSIsInB1cnBvc2UiOiJ1c2Vycy1sb2FkLXRlc3RpbmcifSwiaWF0IjoxNjY2MDkxOTI2LCJhdWQiOiJbb2JqZWN0IE9iamVjdF0iLCJpc3MiOiI0MzMtc3RhZ2luZyJ9.MRzLw1OEvCdhBbKbMQzOxBIkTNR1I9tQ9-cKUz9Y4jM"


const registerUrl = new URL(
    "https://dev.sharedservice.api.by433.com/api/auth/register"
);
const getOTP = new URL(
    "https://dev.sharedservice.api.by433.com/api/auth/get-verification-code?email="
);

const verifyEmail = new URL(
    "https://dev.sharedservice.api.by433.com/api/auth/verify-email"
);

// ---------------------------

const registerApi = async (body, headers) => {
    let json2;
    let token;
    let err = 0;
    await fetch(registerUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
    })
        .then((response) => response.json())
        .then((json) => {
            json2 = json;
            console.log(json);
            //console.log(body.email)
            //console.log(body.email);
        })
        .catch((err) => {
            console.log(err);
            err = 1;
        });
    if (err == 1) {
        return "";
    } else {
        if (json2["response"] == true) {
            await fetch(getOTP + body.email, {
                method: "GET",
                headers: headers,
            })
                .then((res) => res.json())
                .then((otp) => {
                    console.log(otp)
                    token = otp['data']['email_verification_token']
                    console.log(token);
                    // console.log(body.email);
                })
                .catch((err) => console.log(err));

            await fetch(verifyEmail, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ email_verification_token: token }),
            })
                .then((resp) => resp.json())
                .then((Djson) => {
                    // console.log(token);
                    console.log(Djson);
                    try {
                        var newData = body
                        usersData.push(newData);
                    } catch {
                        console.log(Djson);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            console.log(json2);
        }
    }
};
const createAccounts = () => {
    var day = dateFormat(new Date(), "yyyymmddhMMss");

    let email =
        usNameRandomKey + loopCount + day + randomEmail({ domain: "gmail.com" });
    var username = usNameRandomKey + loopCount;
    // UsernameGenerator.generateUsername(String(loopCount)) +UsernameGenerator.generateUsername(String(loopCount))
    // console.log(email);
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    const body = {
        profile_picture: "bucket file path",
        password: password,
        email: email,
        first_name: "Bot Hassan",
        last_name: "Bot",
        jersey_number: 22,
        was_demo: false,
        gender: "1",
        test_user: true,
        secret: devSecrete,
        is_flag: false,
        device_token: null,
        date_of_birth: "1998-01-28",
        username: username,
    };

    try {
        registerApi(body, headers);
        // console.log('register api')
    } catch {
        console.log("Error");
    }

    if (++loopCount < numUsers) {
        createAccounts();
    }

};

createAccounts();

const generateReport = () => {
    console.log(usersData.length);
    console.log("Completed");
    console.log(usersData);
    let finaldata = JSON.stringify(usersData, null, 2);
    console.log("this is final Data --- > " + finaldata)

    fs.writeFile("students.json", finaldata, (err) => {
        if (err) throw err;
        console.log("Data written to file");
    });
    var nu = UsernameGenerator.generateUsername();
    usNameRandomKey = nu.slice(0, 4);
    loopCount = 0;
    createAccounts();
};



setInterval(generateReport, 30000);
