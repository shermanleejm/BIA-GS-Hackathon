import requests

url = "http://localhost:5000/watchlist/Calvin/getall"

response = requests.get(url)
print(response.status_code)
print(response.text)