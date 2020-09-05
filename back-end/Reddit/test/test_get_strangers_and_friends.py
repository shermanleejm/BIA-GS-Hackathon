import requests

# url = "http://13.229.107.243:5001/user/getstrangers/Jill"
url = "http://localhost:5000/user/getstrangers/Jill"

response = requests.get(url)
print(response.status_code)
print(response.text)

# url = "http://localhost:5000/user/getfriends/Jill"

# response = requests.get(url)
# print(response.status_code)
# print(response.text)