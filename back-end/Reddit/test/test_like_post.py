import requests

url = "http://localhost:5000/post/like"

data = {
    "userid": "Bob",
    "postid": "4"
}

response = requests.post(url, params = data)
print(response.status_code)
print(response.text)

response = requests.post(url, params = data)
print(response.status_code)
print(response.text)