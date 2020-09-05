import requests

url = "http://localhost:5000/post/getcomments/4"

response = requests.get(url)
print(response.status_code)
print(response.text)