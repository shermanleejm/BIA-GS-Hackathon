import requests

url = "http://localhost:5000/post/create"

data = {
    "user_id": "Calvin",
    "content": "Hi everyone, this is my most recent post."
}

response = requests.put(url, params = data)
print(response.status_code)
print(response.text)