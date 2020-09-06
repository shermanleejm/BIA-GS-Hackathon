import requests
import json

url = "http://13.229.107.243:5001/post/create"

data = {
    "user_id": "Jill",
    "title": "title for jill's third post",
    "content": "Hi everyone, this is her third post.",
    "image_url": ""
}

response = requests.put(url, data = json.dumps(data))
print(response.status_code)
print(response.text)