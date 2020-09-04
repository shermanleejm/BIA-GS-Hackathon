import requests

url = "http://localhost:5000/login/authenticate"

data = {
    "username": "Bob",
    "password": "bob1"
}

response = requests.post(url, params = data)
print(response.status_code)
print(response.text)