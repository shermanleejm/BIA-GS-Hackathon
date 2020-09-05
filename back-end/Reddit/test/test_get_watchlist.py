import requests

url = "http://localhost:5000/watchlist/getall/Calvin"

response = requests.get(url)
print(response.status_code)
print(response.text)