import requests
import json

# url = "http://13.229.107.243:5001/login/authenticate"
url = "http://localhost:5000/login/authenticate"

data = {
    "user_id": "Bob",
    "password": "bob1"
}

response = requests.post(url, data = json.dumps(data))

print("Expected: True, Actual:", json.loads(response.text)['success']) # Should return True

data = {
    "user_id": "Bob",
    "password": "bob2"
}

response = requests.post(url, data = json.dumps(data))
print("Expected: False, Actual:", json.loads(response.text)['success']) # Should return True

data = {
    "user_id": "Apple",
    "password": "apple1"
}

response = requests.post(url, data = json.dumps(data))

print("Expected: True, Actual:", json.loads(response.text)['success']) # Should return True

data = {
    "user_id": "Nicholas",
    "password": "nicholas1"
}

response = requests.post(url, data = json.dumps(data))
print("Expected: False, Actual:", json.loads(response.text)['success']) # Should return True