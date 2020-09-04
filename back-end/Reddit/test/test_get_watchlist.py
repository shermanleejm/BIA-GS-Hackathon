import requests

url = "http://localhost:5000/watchlist/getall"

data = {
    "userid": "Calvin"
}

response = requests.post(url, params = data)
print(response.status_code)
print(response.text)