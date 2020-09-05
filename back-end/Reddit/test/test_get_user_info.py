import requests

url = "http://localhost:5000/user/getuserinfo/Bob"
# url = "http://13.229.107.243:8001/user/Bob/getuserinfo"

response = requests.get(url)
print(response.status_code)
print(response.text)