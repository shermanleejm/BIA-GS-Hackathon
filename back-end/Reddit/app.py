import json
import os
import logging
import settings
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

logging.basicConfig(filename = "console.log",
            filemode = "w",
            level=logging.INFO)

DB_URI = os.environ.get('DB_URI')
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_POOL_SIZE'] = 100
app.config['SQLALCHEMY_POOL_RECYCLE'] = 280

db = SQLAlchemy(app)

import post
import user
import comment
import watchlist
import like
import response
import qotw
import friend
import rank_user
import rank_info
import rank_processor
import savvy_user
import savvy_info

@app.route("/")
def home():
    return "this is home, truly"

# login
@app.route("/login/register", methods = ['PUT'])
def register_user():

    data = json.loads(request.data)
    user_id = data['user_id']
    password = data['password']

    register_status = user.register_user(user_id, password)
    rank_status = rank_user.add_new_user(user_id)
    savvy_rank_status = savvy_user.add_new_user(user_id)

    result_dict = {
        "register_status": register_status,
        "rank_status": rank_status,
        "savvy_rank_status": savvy_rank_status
    }
    
    return jsonify(result_dict)

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

    return jsonify(post.create_post(user_id, title, content, image_url))

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


@app.route("/post/getpostsfromfriends/<user_id>", methods = ["GET"])
def get_posts_from_friends(user_id):

    list_of_friends = friend.get_friends(user_id)
    
    all_posts = []
    for fr_id in list_of_friends:
        all_posts.append( post.get_post_from_user(fr_id))
    
    return jsonify ({
        "posts": all_posts
    })

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


# @app.route("/user/getrank/<user_id>/<product>", methods = ["GET"])
# def get_user_rank(user_id, product):

#     rank_in_int = rank_user.get_user_rank_in_int(user_id, product)
#     rank_name = rank_info.get_rank_name(rank_in_int)

#     return { "rank_name": rank_name }


@app.route("/user/getsavvyrank/<user_id>", methods = ["GET"])
def get_savvy_rank(user_id):

    points = savvy_user.get_points(user_id)
    rank_name = savvy_info.get_savvy_rank(points)

    return { "rank_name": rank_name }

@app.route("/user/getsavvypoints/<user_id>", methods = ["GET"])
def get_savvy_points(user_id):

    points = savvy_user.get_points(user_id)

    return { "points": points }

@app.route("/user/addsavvypoints", methods = ["POST"])
def add_savvy_points():

    data = json.loads(request.data)
    user_id = data["user_id"]
    points = data["points"]

    update_points_result = savvy_user.add_points(user_id, points)

    return jsonify(update_points_result)


@app.route("/user/getalltrophies/<user_id>", methods = ["GET"])
def get_all_trophies(user_id):
    result_dict = rank_processor.get_all_trophies(user_id)
    
    return jsonify(result_dict)


@app.route("/user/uprank", methods = ["POST"])
def up_user_rank():

    data = json.loads(request.data)
    user_id = data["user_id"]
    product = data["product"]

    update_rank_result = rank_user.up_rank(user_id, product)

    return jsonify(update_rank_result)

# qotw
@app.route("/question/add", methods = ["POST"])
def add_question():
    question_data = json.loads(request.data)

    question = question_data["question"]
    choice_1 = question_data["choice_1"],
    choice_2 = question_data["choice_2"], 
    choice_3 = question_data["choice_3"],
    choice_4 = question_data["choice_4"],
    choice_5 = question_data["choice_5"],
    correct_option = question_data["correct_option"], 
    points = question_data["points"]

    return jsonify( qotw.add_question( question, choice_1,
        choice_2, choice_3, choice_4, choice_5,
        correct_option, points) )

@app.route("/question/get_latest", methods = ["GET"])
def get_latest_question():
    return jsonify( qotw.get_latest_question() )

@app.route("/question/get_all", methods = ["GET"])
def get_all_questions():
    return jsonify( qotw.get_all_questions() )

@app.route("/question/send_user_response", methods = ["POST"])
def send_user_response():

    data = json.loads(request.data)
    qid = data["qid"]
    user_id = data["user_id"]
    choice = data["choice"]

    return jsonify( response.send_user_response(qid, user_id, choice))


if __name__ == "__main__":
    # app.run(debug=True, host="0.0.0.0")
    app.run(port=5001, host="0.0.0.0")