import requests
import json

url = "http://13.229.107.243:8001/login/authenticate"
# url = "http://localhost:5000/login/authenticate"

# data = {
#     "user_id": "Bob",
#     "password": "bob1"
# }

# response = requests.post(url, params = data)
# print(response.text) # Should return True

# data = {
#     "user_id": "Bob",
#     "password": "bob2"
# }

# response = requests.post(url, params = data)
# print(response.text) # should return False

data = {
    "user_id": "Apple",
    "password": "apple1"
}

data = json.dumps(data)

print(url)
response = requests.post(url, json = data)
print(response.text) # should return True

# data = {
#     "user_id": "Nicholas",
#     "password": "nicholas1"
# }

# response = requests.post(url, params = data)
# print(response.text) # should return False