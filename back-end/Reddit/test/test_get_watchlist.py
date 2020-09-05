import requests

url = "http://13.229.107.243:5001/watchlist/getall/Calvin"

response = requests.get(url)
print(response.status_code)
print(response.text)