import requests

url = "http://localhost:5000/post/1/writecomment"

data = {
    "userid": "Bob",
    "content": "It's a wonderful day!"
}

response = requests.put(url, params = data)
print(response.status_code)
print(response.text)