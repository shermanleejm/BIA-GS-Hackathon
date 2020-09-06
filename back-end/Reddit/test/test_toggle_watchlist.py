import requests
import json

# url = "http://localhost:5000/watchlist/toggle_add"
url = "http://13.229.107.243:5001/watchlist/toggle_add"


data = {
    "user_id": "Bob",
    "product": "TSLA"
}

response = requests.post(url, data = json.dumps(data))
print(response.text)