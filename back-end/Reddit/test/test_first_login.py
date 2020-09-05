import requests

url = "http://localhost:5000/login/checkfirstlogin/Nicholas"

response = requests.get(url)
print(response.status_code)
print(response.text) # should return True

url = "http://localhost:5000/login/checkfirstlogin/Jill"

response = requests.get(url)
print(response.status_code)
print(response.text) # should return True

url = "http://localhost:5000/login/checkfirstlogin/Bob"

response = requests.get(url)
print(response.status_code)
print(response.text) # should return False