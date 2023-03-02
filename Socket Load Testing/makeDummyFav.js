import fs from "fs";
let rawdata = fs.readFileSync("Users.json");
const student = JSON.parse(rawdata);

let userCount = 0

const loginUrl = "https://staging.sharedservice.api.by433.com/api/favourites/add-or-remove-favourite"

const makeFav = async () => {
    try {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${student[userCount]['access_token']}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "module": "MATCH",
            "module_id": "dummy",
            "createOrRemove": "create"
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
            })
    }
    catch (error) {
        console.log(error)
    }
}

let callLogin = () => {
    if (userCount++ < student.length) {
        makeFav()
        console.log(userCount)
        setTimeout(callLogin, 13)
    }
}

callLogin()
