import requests

url = "http://localhost:5000/user/Bob/getuserinfo"

response = requests.get(url)
print(response.status_code)
print(response.text)