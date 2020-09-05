import requests
import json

url = "http://localhost:5000/post/writecomment/1"

data = {
    "user_id": "Bob",
    "title": "This is a placeholder title",
    "content": "It's a wonderful day!"
}

response = requests.put(url, data = json.dumps(data))
print(response.status_code)
print(response.text)