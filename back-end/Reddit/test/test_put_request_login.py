import requests

url = "http://13.229.107.243:8001/login/register"

data = {
    "userid": "Calvin",
    "password": "calvin1"
}

response = requests.put(url, params = data)
print(response.status_code)
print(response.text)

url = "http://13.229.107.243:8001/login/profiling"

data = {
    "userid": "Calvin",
    "age": "25 to 30",
    "occupation": "student",
    "spending": "700",
    "risk": "High"
}

response = requests.put(url, params = data)
print(response.status_code)
print(response.text)