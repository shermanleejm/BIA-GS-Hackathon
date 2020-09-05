import requests

url = "http://localhost:5000/user/getstrangers/Jill"

response = requests.get(url)
print(response.status_code)
print(response.text)

url = "http://localhost:5000/user/getfriends/Jill"

response = requests.get(url)
print(response.status_code)
print(response.text)