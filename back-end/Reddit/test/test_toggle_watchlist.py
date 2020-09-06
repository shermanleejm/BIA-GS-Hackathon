import requests
import json

url = "http://localhost:5000/watchlist/toggle_add"

data = {
    "user_id": "Gabriel",
    "product": "GOOGL"
}

response = requests.post(url, data = json.dumps(data))
print(response.text)