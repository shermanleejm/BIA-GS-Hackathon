import requests

url = "http://localhost:5000/post/retrievelikes"

data = {
    "postid": "1"
}

response = requests.post(url, params = data)
print(response.status_code)
print(response.text)