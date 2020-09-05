import requests
import json

url = "http://localhost:5000/post/togglelike"

data = {
    "user_id": "Bob",
    "postid": "4"
}

# Once to like
response = requests.post(url, data = json.dumps(data))
print(response.status_code)
print(response.text)

# Once to dislike
response = requests.post(url, data = json.dumps(data))
print(response.status_code)
print(response.text)