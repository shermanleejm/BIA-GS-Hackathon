import requests

url = "http://localhost:5000/login/authenticate"

data = {
    "user_id": "Bob",
    "password": "bob1"
}

response = requests.post(url, params = data)
print(response.status_code)
print(response.text) # Should return True

data = {
    "user_id": "Bob",
    "password": "bob2"
}

response = requests.post(url, params = data)
print(response.status_code)
print(response.text) # should return False