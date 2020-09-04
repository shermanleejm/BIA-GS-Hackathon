import json
import os
import logging
import settings
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

logging.basicConfig(filename = "console.log",
            filemode = "w",
            level=logging.INFO)

DB_URI = os.environ.get('DB_URI')

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

import posts
import user

def to_json(a_dictionary):
    return json.loads(json.dumps(a_dictionary))

@app.route("/")
def home():
    return "this is home, truly"

# @app.route("/register", methods = ['PUT'])
# def register_user():


#     return_dict = {
#         "is_successful_registration": user.register_user
#     }
#     return

@app.route("/login/authenticate", methods = ['POST'])
def authenticate_login():

    username = request.args.get('userid') 
    password = request.args.get('password')

    app.logger.info(f"Authenticating login for {username}")

    return_dict = {
        "is_sucessful_login": user.validate_user(username, password)
    }
    return to_json(return_dict)

@app.route("/login/checkfirstlogin", methods = ['POST'])
def check_first_login():

    username = request.args.get('userid') 

    app.logger.info(f"Checking if user: {username} has completed questionnaire.")

    return_dict = {
        "is_first_login": user.check_first_login(username)

    }
    return to_json(return_dict)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")