// bulk send messages
let MESSAGE_COUNTER = 10
let COUNTER = 0
let user_id = 1

for (let i = 0; i < MESSAGE_COUNTER; i++) {
    COUNTER += 1
    console.log(i)
    console.log({
        "key_type": "group",
        "id": user_id,
        "message": { "Counter": COUNTER, "Message": "Guardian Angel" }
    })

}