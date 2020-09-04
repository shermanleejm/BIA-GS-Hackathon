import requests

url = "http://localhost:5000/watchlist/toggle_add"

data = {
    "userid": "Calvin",
    "product": "NASDAQ"
}

response = requests.post(url, params = data)
print(response.status_code)
print(response.text)