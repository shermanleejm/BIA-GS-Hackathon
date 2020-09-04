import json
import os
import logging
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


from constants import DB_URI

app = Flask(__name__)

logging.basicConfig(filename = "console.log",
            level=logging.INFO)

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

import posts
import user

@app.route("/")
def home():
    return "this is home, truly"

@app.route("/post")
def post():
    all_posts = posts.get_all_posts()
    return "Call to posts db success"

@app.route("/allusers")
def all_user():
    all_users = user.get_all_users()
    return "Got all users"

@app.route("/login/authenticate", methods = ['GET'])
def authenticate_login():

    username = request.args.get('userid') 
    password = request.args.get('password')

    app.logger.info(f"Authenticating login for {username}")
    
    return user.validate_user(username, password)

@app.route("/login/checkfirstlogin", methods = ['GET'])
def check_first_login():

    username = request.args.get('userid') 

    app.logger.info(f"Checking if user: {username} has completed questionnaire.")

    return user.check_first_login(username)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")