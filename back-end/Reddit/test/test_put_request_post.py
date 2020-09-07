import requests
import json

url = "http://13.229.107.243:5001/post/create"

data = {
    "user_id": "Apple",
    "title": "title for Apple's first post",
    "content": "Hi everyone, this is Apple's first post.",
    "image_url": ""
}

response = requests.put(url, data = json.dumps(data))
print(response.status_code)
print(response.text)