import requests

url = "http://13.229.107.243:5001/user/getstrangers/Apple"
# url = "http://localhost:5000/user/getfriends/Apple"

print(url)
response = requests.get(url)
print(response.status_code)
print(response.text)

# url = "http://localhost:5000/user/getfriends/Jill"

# response = requests.get(url)
# print(response.status_code)
# print(response.text)