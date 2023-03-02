import fs from "fs";
import fetch from "node-fetch";
import randomEmail from "random-email";
import UsernameGenerator from "username-generator";
import dateFormat from "dateformat";
// import { exec } from "child_process";
const numUsers = 2000;
const ClientCreateInterval = 0
let loopCount = 0;
const password = "Hsf328612,./";
var usNameRandomKey = "papich";
let rawdata = fs.readFileSync("studentsssssssss.json");
let usersData = JSON.parse(rawdata);
let ErrorCount = 0
let Errors = []
let SuccessCount = 0
// ----------------------------

const registerUrl = new URL(
  "https://staging.sharedservice.api.by433.com/api/auth/register"
);

// ---------------------------


//const devSecrete = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InRlYW0iOiJRQSIsInB1cnBvc2UiOiJ1c2Vycy1sb2FkLXRlc3RpbmcifSwiaWF0IjoxNjY2MDgyMjM3LCJhdWQiOiJbb2JqZWN0IE9iamVjdF0iLCJpc3MiOiI0MzMtZGV2In0.KZS7RJMFd_If6gNEAa-IAsgZEZfj8FK5ZTaZu-C_x0k"
const stagSecrete = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InRlYW0iOiJRQSIsInB1cnBvc2UiOiJ1c2Vycy1sb2FkLXRlc3RpbmcifSwiaWF0IjoxNjY2MDkxOTI2LCJhdWQiOiJbb2JqZWN0IE9iamVjdF0iLCJpc3MiOiI0MzMtc3RhZ2luZyJ9.MRzLw1OEvCdhBbKbMQzOxBIkTNR1I9tQ9-cKUz9Y4jM"

const registerApi = async (body, headers) => {
  let json2;
  let token;

  await fetch(registerUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((json) => {
      json2 = json;
      console.log(json, loopCount);
      if (json['response'] == true) {
        SuccessCount ++
      }
      //console.log(body.email);
    })
    .catch((err) => {
      console.log(err);
      ErrorCount++
      let errdict = { "ErrorsCount": ErrorCount, "Errorss": err,"SuccessCount":SuccessCount }
      console.log(errdict)
      Errors.push(errdict)
    });

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
    test_user: true,
    secret: stagSecrete,
    was_demo: false,
    gender: "1",
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
    setTimeout(createAccounts, ClientCreateInterval)
  }

};

createAccounts();

// fs.writeFile("Errors.json", JSON.stringify(Errors), (err) => {
//   if (err) throw err;
//   console.log("Data written to file");
// });

const generateReport = () => {
  console.log(Errors)
  console.log(JSON.stringify(Errors))
  fs.writeFile("Errors.json", JSON.stringify(Errors), (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });

};



setInterval(generateReport, 3000);
