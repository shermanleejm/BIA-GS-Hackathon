import requests

url = "http://localhost:5000/friend/connect"

data = {
    "sender_id": "Jill",
    "receiver_id": "James" 
}

response = requests.post(url, params = data)
print(response.status_code)
print(response.text)