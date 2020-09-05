import requests
import json

url = "http://localhost:5000/login/checkfirstlogin/Nicholas"

response = requests.get(url)
print("Expected: True, Actual:", json.loads(response.text)["is_first_login"]) # should return True

url = "http://localhost:5000/login/checkfirstlogin/Jill"

response = requests.get(url)
print("Expected: True, Actual:", json.loads(response.text)["is_first_login"]) # should return True

url = "http://localhost:5000/login/checkfirstlogin/Bob"

response = requests.get(url)
print("Expected: False, Actual:", json.loads(response.text)["is_first_login"]) # should return True