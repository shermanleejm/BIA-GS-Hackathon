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

import post
import user
import comment
import watchlist
import like
import friend

def to_json(a_dictionary):
    return json.loads(json.dumps(a_dictionary))

@app.route("/")
def home():
    return "this is home, truly"

@app.route("/login/register", methods = ['PUT'])
def register_user():

    username = request.args.get('userid') 
    password = request.args.get('password')

    return_dict = {
        "is_successful_registration": user.register_user(username, password)
    }
    return return_dict

@app.route("/login/profiling", methods = ['PUT'])
def profile_user():
    username = request.args.get('userid')
    age = request.args.get('age')
    occupation = request.args.get('occupation')
    spending = request.args.get('spending')
    risk = request.args.get('risk')

    return_dict = {
        "is_successful_profiling": user.profile(username, age, occupation,
                                            spending, risk)
    }

    return return_dict

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

@app.route("/friend/connect", methods = ['POST'])
def connect_two_users():
    sender_id = request.args.get("sender_id")
    receiver_id = request.args.get("receiver_id")

    result_dict = {
        "is_connect_success": friend.connect(sender_id, receiver_id)
    }

    # Currently, no way to 'delete' the friendship

    return result_dict

@app.route("/post/create", methods = ['PUT'])
def create_post():
    user_id = request.args.get('userid')
    content = request.args.get('content')

    return_dict = {
        'is_post_created_successfully': post.create_post(user_id, content)
    }

    return return_dict

@app.route("/post/like", methods = ["POST"])
def like_post():
    user_id = request.args.get('userid')
    post_id = request.args.get('postid')

    return_dict = {
        'is_toggle_like_success': like.toggle_like(post_id, user_id)
    }

    return return_dict

@app.route("/post/retrievelikes", methods = ["POST"])
def get_like_info():
    post_id = request.args.get('postid')

    return like.get_like_info(post_id)

@app.route("/post/writecomment", methods = ["PUT"])
def write_comment():
    post_id = request.args.get('postid')
    user_id = request.args.get('userid') # this is the one who is posting
    content = request.args.get('content')

    result_dict = {
        'is_successful_comment' : comment.write_comment(post_id, user_id, content)
    }

    return result_dict

@app.route("/post/getcomments", methods = ["POST"])
def get_comments():
    post_id = request.args.get('postid')

    result_dict = {
        "all_comments": comment.get_comments(post_id)
    }

    return result_dict

@app.route("/watchlist/toggle_add", methods = ["POST"])
def toggle_add():

    user_id = request.args.get('userid')
    product = request.args.get('product')

    return_dict = {
        "is_toggle_add_successful": watchlist.toggle_add_to_watchlist(
                                user_id, product)
    }
    return return_dict

@app.route("/watchlist/get", methods = ["POST"])
def get_watchlist():

    user_id = request.args.get('userid')

    return_dict = {
        "watchlist": watchlist.get_watchlist(
            user_id)
    }
    return return_dict

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")