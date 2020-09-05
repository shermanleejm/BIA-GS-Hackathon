import requests

url = "http://localhost:5000/post/getlikes/1"

response = requests.get(url)
print(response.status_code)
print(response.text)