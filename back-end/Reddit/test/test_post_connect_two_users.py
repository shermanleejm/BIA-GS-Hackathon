import requests
import json

url = "http://13.229.107.243:5001/friend/connect"

data = {
    "sender_id": "Heather",
    "receiver_id": "Edwin" 
}

response = requests.post(url, data = json.dumps(data))
print(response.status_code)
print(response.text)