import json
import os
import logging
import settings
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

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

    username = request.args.get('user_id') 
    password = request.args.get('password')
    
    return jsonify(user.register_user(username, password))

@app.route("/login/profiling", methods = ['PUT'])
def profile_user():
    username = request.args.get('user_id')
    age = request.args.get('age')
    occupation = request.args.get('occupation')
    spending = request.args.get('spending')
    risk = request.args.get('risk')

    return jsonify(user.profile_user(username, age, occupation,
                                            spending, risk))

@app.route("/login/authenticate", methods = ['POST'])
def authenticate_login():

    username = request.args.get('user_id') 
    password = request.args.get('password')

    app.logger.info(f"Authenticating login for {username}")
    
    return jsonify(user.authenticate_user(username, password))

@app.route("/login/checkfirstlogin/<user_id>", methods = ['GET'])
def check_first_login(user_id):

    app.logger.info(f"Checking if user: {user_id} has logged in before.")
    
    return jsonify(user.check_first_login(user_id))

# friend
@app.route("/friend/connect", methods = ['POST'])
def connect_two_users():

    sender_id = request.args.get('sender_id')
    receiver_id = request.args.get('receiver_id')

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
    user_id = request.args.get('user_id')
    content = request.args.get('content')

    return jsonify(post.create_post(user_id, content))

@app.route("/post/togglelike", methods = ["POST"])
def like_post():
    user_id = request.args.get('user_id')
    post_id = request.args.get('postid')

    return jsonify(like.toggle_like(post_id, user_id))

@app.route("/post/<post_id>/getlikes", methods = ["GET"])
def get_likes(post_id):
    likes = like.get_like_info(post_id)

    return jsonify(likes)

@app.route("/post/<post_id>/writecomment", methods = ["PUT"])
def write_comment(post_id):

    user_id = request.args.get('user_id') # this is the one who is posting
    content = request.args.get('content')

    return jsonify(comment.write_comment(post_id, user_id, content))

@app.route("/post/<post_id>/getcomments", methods = ["GET"])
def get_comments(post_id):

    comments = comment.get_comments(post_id)
    
    return jsonify(comments)

# Watchlist
@app.route("/watchlist/<user_id>/<product>/toggle_add", methods = ["POST"])
def toggle_add(user_id, product):

    return jsonify(watchlist.toggle_add_to_watchlist(
                                user_id, product))

@app.route("/watchlist/<user_id>/getall", methods = ["GET"])
def get_watchlist(user_id):
    user_watchlist = watchlist.get_watchlist(user_id)
    return jsonify(user_watchlist)

# User Section
@app.route("/user/getallusers", methods = ['GET'])
def get_all_users():
    users = user.get_users()
    return jsonify(users)

@app.route("/user/<user_id>/getuserinfo", methods = ['GET'])
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

@app.route("/user/<user_id>/getfriends", methods = ["GET"])
def get_friends(user_id):
    
    friend_ids = friend.get_friends(user_id)
    friends = user.get_user_details_from_list(friend_ids)
    
    return jsonify(friends), 200

@app.route("/user/<user_id>/getstrangers", methods = ['GET'])
def get_non_friends(user_id):

    all_users = user.get_users()
    friend_ids = friend.get_friends(user_id)
    friends = user.get_user_details_from_list(friend_ids)
    
    non_friends = [user for user in all_users if user not in friends]

    return jsonify(non_friends), 200

# qotw

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")