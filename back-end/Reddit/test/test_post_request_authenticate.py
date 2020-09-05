import requests

url = "http://13.229.107.243:8001/login/authenticate"

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

json.loads(request.get_json())

print(url)
response = requests.post(url, params = data)
print(response.text) # should return True

# data = {
#     "user_id": "Nicholas",
#     "password": "nicholas1"
# }

# response = requests.post(url, params = data)
# print(response.text) # should return False