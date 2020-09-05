import requests

url = "http://localhost:5000/user/Jill/getstrangers"

response = requests.get(url)
print(response.status_code)
print(response.text)

url = "http://localhost:5000/user/Jill/getfriends"

response = requests.get(url)
print(response.status_code)
print(response.text)