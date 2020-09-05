import json
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
# import pandas as pd
# import time
# import requests
# import boto3
# import atexit
# from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
CORS(app)

# s3 = boto3.client("s3")

def getJSON(filename):
    """retrieve a file from the s3 bucket 

    :param name: name of the file to be retrieved
    :type name: str
    :return: the JSON file matching the name passed in
    :rtype: JSON file
    """   
    s3_obj = s3.get_object(Bucket="accredify-social-analytics", Key=filename)
    return s3_obj["Body"].read().decode("utf-8")


def putJSON(obj, filename):
    """upload a file onto the s3 bucket

    :param obj: a JSON file that contains relevant data
    :type obj: JSON file
    :param filename: a name that describes the content of the file
    :type filename: string
    """   
    s3.put_object(
        Body=json.dumps(obj, indent=2),
        Bucket="accredify-social-analytics",
        Key=filename,
    )

@app.route("/")
def home():
    """the home page

    :return: the greeting message for the homepage
    :rtype: str
    """    
    return "Welcome to BIA"

if __name__ == "__main__":
    app.run(port=5001, host="0.0.0.0")