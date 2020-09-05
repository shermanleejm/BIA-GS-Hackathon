import requests
import json

url = "http://localhost:5000/friend/connect"

data = {
    "sender_id": "Jill",
    "receiver_id": "Bob" 
}

response = requests.post(url, data = json.dumps(data))
print(response.status_code)
print(response.text)