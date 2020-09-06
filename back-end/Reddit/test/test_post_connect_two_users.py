import requests
import json

url = "http://13.229.107.243:5001/friend/connect"

data = {
    "sender_id": "Jill",
    "receiver_id": "James" 
}

response = requests.post(url, data = json.dumps(data))
print(response.status_code)
print(response.text)