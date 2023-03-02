import fs from "fs";
import fetch from "node-fetch";
import randomEmail from "random-email";
import UsernameGenerator from "username-generator";
import dateFormat from "dateformat";
import { exec } from "child_process";
const numUsers = 50;
let loopCount = 0;
const password = "Hsf328612,./";

var key = "rews";
var usNameRandomKey = key;
let usersData = [];

// ----------------------------

const registerUrl = new URL(
  "https://dev.sharedservice.api.by433.com/api/auth/register"
);
const getOTP = new URL(
  "https://dev.sharedservice.api.by433.com/api/auth/get-verification-code"
);

const verifyEmail = new URL(
  "https://dev.sharedservice.api.by433.com/api/auth/verify-email"
);

// ---------------------------

const registerApi = (body, headers) => {
  fetch(registerUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((json) => {
      //console.log(body.email);
      if (json["response"] == true) {
        fetch(getOTP, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ email: body.email }),
        })
          .then((res) => res.json())
          .then((otp) => {
            let token = otp["data"]["email_verification_token"];
            //console.log(token);
            // console.log(body.email);

            fetch(verifyEmail, {
              method: "POST",
              headers: headers,
              body: JSON.stringify({ email_verification_token: token }),
            })
              .then((resp) => resp.json())
              .then((Djson) => {
                // console.log(token);
                // console.log(Djson);
                try {
                  var newData = {
                    username: Djson["data"]["user"]["username"],
                    email: Djson["data"]["user"]["email"],
                    password: password,
                    access_token: Djson["data"]["user"]["access_token"],
                  };
                  usersData.push(newData);
                } catch {
                  console.log(Djson);
                }
              });
          });
      } else {
        console.log(json);
      }
    })
    .catch((error) => console.log(error));
};

let createAccounts = () => {
  var day = dateFormat(new Date(), "yyyymmddhMMss");

  let email =
    usNameRandomKey + loopCount + day + randomEmail({ domain: "gmail.com" });
  var username = usNameRandomKey + loopCount + day.slice(7)
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
    was_demo: false,
    last_name: "Bot",
    jersey_number: 22,
    gender: "1",
    date_of_birth: "1998-01-28",
    username: username,
  };

  try {
    registerApi(body, headers);
  } catch {
    console.log("Error");
  }
  setInterval(() => {
    if (++loopCount < numUsers) {
      setTimeout(createAccounts, 10);
    }
  });
};

createAccounts();

let generateReport = () => {
  console.log(usersData.length);
  console.log("Completed");
  console.log(usersData);
  let finaldata = JSON.stringify(usersData, null, 2);

  fs.writeFile("student.json", finaldata, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
  var nu = UsernameGenerator.generateUsername();
  usNameRandomKey = key + nu.slice(0, 4);
  loopCount = 0;
  createAccounts();
};

setInterval(generateReport, 50000);
