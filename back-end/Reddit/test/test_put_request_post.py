import requests

url = "http://localhost:5000/post/create"

data = {
    "userid": "Calvin",
    "content": "Hi everyone, this is my first post."
}

response = requests.put(url, params = data)
print(response.status_code)
print(response.text)