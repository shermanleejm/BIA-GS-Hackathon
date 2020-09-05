import requests
import json

url = "http://localhost:5000/watchlist/toggle_add"

data = {
    "user_id": "Calvin",
    "product": "NASDAQ"
}

response = requests.post(url, data = json.dumps(data))
print(response.status_code)
print(response.text)