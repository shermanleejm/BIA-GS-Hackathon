import requests

url = "http://localhost:5000/login/register"

data = {
    "userid": "Calvin",
    "password": "calvin1"
}

response = requests.put(url, params = data)
print(response.status_code)
print(response.text)

url = "http://localhost:5000/login/profiling"

data = {
    "userid": "Calvin",
    "age": "25",
    "occupation": "student",
    "spending": "700",
    "risk": "High"
}

response = requests.put(url, params = data)
print(response.status_code)
print(response.text)