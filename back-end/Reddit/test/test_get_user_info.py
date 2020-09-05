import requests

# url = "http://localhost:5000/user/getuserinfo/Bob"
url = "http://13.229.107.243:5001/user/getuserinfo/Bob"

response = requests.get(url)
print(response.status_code)
print(response.text)