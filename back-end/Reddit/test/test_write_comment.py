import requests

url = "http://localhost:5000/post/writecomment"

data = {
    "userid": "Bob",
    "postid": "4",
    "content": "It's a wonderful day!"
}

response = requests.put(url, params = data)
print(response.status_code)
print(response.text)