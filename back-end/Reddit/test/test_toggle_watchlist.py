import requests
import json

url = "http://13.229.107.243:5001/watchlist/toggle_add"

data = {
    "user_id": "Isabel",
    "product": "AAPL"
}

response = requests.post(url, data = json.dumps(data))
print(response.text)