import requests

url = "http://localhost:5000/post/getcomments"

data = {

    "postid": "4",
    
}

response = requests.post(url, params = data)
print(response.status_code)
print(response.text)