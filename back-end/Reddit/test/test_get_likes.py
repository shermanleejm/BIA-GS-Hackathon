import requests

url = "http://localhost:5000/post/1/getlikes"

response = requests.get(url)
print(response.status_code)
print(response.text)