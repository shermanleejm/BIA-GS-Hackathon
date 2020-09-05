import requests
import json

# url = "http://13.229.107.243:5001/login/register"
url = "http://localhost:5000/login/register"

data = {
    "user_id": "Calvin",
    "password": "calvin1"
}

response = requests.put(url, data = json.dumps(data))
print(response.status_code)
print(response.text)

# url = "http://13.229.107.243:5001/login/profiling"
url = "http://localhost:5000/login/profiling"

data = {
    "user_id": "Calvin",
    "age": "25 to 30",
    "occupation": "student",
    "spending": "700",
    "risk": "High"
}

response = requests.put(url, data = json.dumps(data))
print(response.status_code)
print(response.text)