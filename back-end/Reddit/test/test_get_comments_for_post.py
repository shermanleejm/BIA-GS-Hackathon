import requests

url = "http://localhost:5000/post/4/getcomments"

response = requests.get(url)
print(response.status_code)
print(response.text)