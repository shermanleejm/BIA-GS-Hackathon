import requests

url = "http://localhost:5000/post/getall"

response = requests.get(url)
print(response.status_code)
print(response.text)

url = "http://localhost:5000/post/getpostfromuser/bob"

response = requests.get(url)
print(response.status_code)
print(response.text)

url = "http://localhost:5000/post/getpostsfromfriends/James"

response = requests.get(url)
print(response.status_code)
print(response.text)