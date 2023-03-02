import pandas as pd
import requests
import json
from tqdm import tqdm

data = None
url = "https://preprod.sharedservice.api.by433.com/api/auth/auto-login"
deleteUrl = "https://preprod.profile.api.by433.com/api/delete-account"


with open("refreshtokens.txt") as f:
    data = f.readlines()

print("\n\n\n\t\t\tReading Data Done rows : ", len(data))


def delete_UserAccounts(refreshToken):
    payload = json.dumps({
        "token": refreshToken
    })
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    # print(response.json())
    res = response.json()
    access_token = res['data']['user']['access_token']
    # print(access_token)
    # print(userID)

    payload = json.dumps({
        "type": "notNeed",
        "reason": "I don’t need it anymore"
    })
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }

    responsed = requests.request(
        "POST", deleteUrl, headers=headers, data=payload)

    assert responsed.json()['message'] == "User Deleted successfully"


for i in tqdm(data):
    delete_UserAccounts(i.strip())

# print(len(data[0].strip()))
# print(len("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2YTM1ZmY5MjEwMTBlNThlOGMyOTExIiwiZmlyc3RfbmFtZSI6Ikhhc3NhbiIsImxhc3RfbmFtZSI6IkFiYmFzIiwiZ2VuZGVyIjoxLCJkYXRlX29mX2JpcnRoIjoiMTk5OC0wMS0yOFQwMDowMDowMC4wMDBaIiwiZW1haWwiOiJteWxzZWxoa2lodGxseGUyMUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImJnbmxnZnNxdGdhanpmYzIxIiwicHJvZmlsZV9waWN0dXJlIjpudWxsLCJsYXN0X3NlZW4iOm51bGwsImFjY2Vzc190b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeUlqcDdJbWxrSWpvaU5qSTJZVE0xWm1ZNU1qRXdNVEJsTlRobE9HTXlPVEV4SWl3aVptbHljM1JmYm1GdFpTSTZJa2hoYzNOaGJpSXNJbXhoYzNSZmJtRnRaU0k2SWtGaVltRnpJaXdpWjJWdVpHVnlJam94TENKa1lYUmxYMjltWDJKcGNuUm9Jam9pTVRrNU9DMHdNUzB5T0ZRd01Eb3dNRG93TUM0d01EQmFJaXdpWlcxaGFXd2lPaUp0ZVd4elpXeG9hMmxvZEd4c2VHVXlNVUJuYldGcGJDNWpiMjBpTENKMWMyVnlibUZ0WlNJNkltSm5ibXhuWm5OeGRHZGhhbnBtWXpJeElpd2ljSEp2Wm1sc1pWOXdhV04wZFhKbElqcHVkV3hzTENKc1lYTjBYM05sWlc0aU9tNTFiR3dzSW1KcGIyZHlZWEJvZVNJNklpSXNJbTV2WDI5bVgyWnlhV1Z1WkhNaU9qQXNJbXBsY25ObGVWOXVkVzFpWlhJaU9qTXpMQ0pwYzE5dFlXNTFZV3hmYkc5bmFXNGlPblJ5ZFdVc0ltNXZkR2xtYVdOaGRHbHZiaUk2Wm1Gc2MyVjlMQ0pwWVhRaU9qRTJOVEV4TWpjNE1EZ3NJbVY0Y0NJNk1UWTFNVEl4TkRJd09Dd2lZWFZrSWpvaVcyOWlhbVZqZENCUFltcGxZM1JkSWl3aWFYTnpJam9pTkRNekxYQnliMlIxWTNScGIyNGlmUS5NTmJ6V1MxQWx3clN0dmlvXy05M09IMWFCWm9vR3BDbl85RUpzbC1pcXRrIiwiYmlvZ3JhcGh5IjoiIiwibm9fb2ZfZnJpZW5kcyI6MCwiamVyc2V5X251bWJlciI6MzMsImlzX21hbnVhbF9sb2dpbiI6dHJ1ZSwibm90aWZpY2F0aW9uIjpmYWxzZX0sImlhdCI6MTY1MTEyNzgwOH0.utjTZCT1Bp3rziOQNuVixPG2fhCy5qthBWxdD3SkYO0"))
