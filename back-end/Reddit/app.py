import json
import os
import logging
import settings
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from python-dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

logging.basicConfig(filename = "console.log",
            filemode = "w",
            level=logging.INFO)

DB_URI = os.environ.get('DB_URI')
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

import post
import user
import comment
import watchlist
import like
import friend

@app.route("/")
def home():
    return "this is home, truly"

# login
@app.route("/login/register", methods = ['PUT'])
def register_user():

    data = json.loads(request.data)
    username = data['user_id']
    password = data['password']
    
    return jsonify(user.register_user(username, password))

@app.route("/login/profiling", methods = ['PUT'])
def profile_user():

    data = json.loads(request.data)
    
    username = data['user_id']
    age = data['age']
    occupation = data['occupation']
    spending = data['spending']
    risk = data['risk']

    return jsonify(user.profile_user(username, age, occupation,
                                            spending, risk))

@app.route("/login/authenticate", methods = ['POST'])
def authenticate_login():

    data = json.loads(request.data)    
    username = data['user_id'] 
    password = data['password']

    app.logger.info(f"Authenticating login for {username}")

    return jsonify(user.authenticate_user(username, password))

@app.route("/login/checkfirstlogin/<user_id>", methods = ['GET'])
def check_first_login(user_id):

    app.logger.info(f"Checking if user: {user_id} has logged in before.")
    
    return jsonify(user.check_first_login(user_id))

# friend
@app.route("/friend/connect", methods = ['POST'])
def connect_two_users():
    data = json.loads(request.data)
    sender_id = data['sender_id']
    receiver_id = data['receiver_id']

    # Currently, no way to 'delete' the friendship

    return jsonify(friend.connect(sender_id, receiver_id))

# Post
@app.route("/post/getall", methods = ['GET'])
def get_all_posts():
    all_posts = post.get_all()
    return jsonify(all_posts)

@app.route("/post/getpostfromuser/<user_id>", methods = ['GET'])
def get_post_from(user_id):
    user_posts = post.get_post_from_user(user_id)
    return jsonify(user_posts)

@app.route("/post/create", methods = ['PUT'])
def create_post():
    data = json.loads(request.data)
    user_id = data['user_id']
    title = data['title']
    content = data['content']
    image_url = data['image_url']

    return jsonify(post.create_post(user_id, title, content))

@app.route("/post/togglelike", methods = ["POST"])
def like_post():
    data = json.loads(request.data)
    user_id = data['user_id']
    post_id = data['postid']

    return jsonify(like.toggle_like(post_id, user_id))

@app.route("/post/getlikes/<post_id>", methods = ["GET"])
def get_likes(post_id):
    likes = like.get_like_info(post_id)

    return jsonify(likes)

@app.route("/post/writecomment/<post_id>", methods = ["PUT"])
def write_comment(post_id):
    data = json.loads(request.data)
    user_id = data['user_id'] # this is the one who is posting
    content = data['content']

    return jsonify(comment.write_comment(post_id, user_id, content))

@app.route("/post/getcomments/<post_id>", methods = ["GET"])
def get_comments(post_id):

    comments = comment.get_comments(post_id)
    
    return jsonify(comments)

# Watchlist
@app.route("/watchlist/toggle_add", methods = ["POST"])
def toggle_add():
    data = json.loads(request.data)
    user_id = data['user_id']
    product = data['product']

    return jsonify(watchlist.toggle_add_to_watchlist(
                                user_id, product))

@app.route("/watchlist/getall/<user_id>", methods = ["GET"])
def get_watchlist(user_id):
    user_watchlist = watchlist.get_watchlist(user_id)
    return jsonify(user_watchlist)

# User Section
@app.route("/user/getallusers", methods = ['GET'])
def get_all_users():
    users = user.get_users()
    return jsonify(users)

@app.route("/user/getuserinfo/<user_id>", methods = ['GET'])
def get_user_info(user_id):

    user_info = user.get_user_details_from_list([user_id])
    user_posts = post.get_post_from_user(user_id)
    user_watchlist = watchlist.get_watchlist(user_id)
    friend_ids = friend.get_friends(user_id)

    user_details = {
        "info": user_info,
        "posts": user_posts,
        "watchlist": user_watchlist,
        "friend_id_list": friend_ids
    }
    
    return jsonify(user_details)

@app.route("/user/getfriends/<user_id>", methods = ["GET"])
def get_friends(user_id):
    
    friend_ids = friend.get_friends(user_id)
    friends = user.get_user_details_from_list(friend_ids)
    
    return jsonify(friends), 200

@app.route("/user/getstrangers/<user_id>", methods = ['GET'])
def get_non_friends(user_id):

    all_users = user.get_users()
    friend_ids = friend.get_friends(user_id)
    friends = user.get_user_details_from_list(friend_ids) + \
        user.get_user_details_from_list([user_id])
    
    non_friends = [user for user in all_users if user not in friends]

    return jsonify(non_friends), 200

# qotw

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
    # app.run(port=5001, host="0.0.0.0")