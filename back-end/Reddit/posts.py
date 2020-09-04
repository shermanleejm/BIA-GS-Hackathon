from app import app, db

class Post(db.Model):

    post_id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.String())
    content = db.Column(db.String())

    def __init__(self, post_id, user_id, content):
        self.post_id = post_id
        self.user_id = user_id
        self.content = content

def get_all_posts():
    all_posts = Post.query.all()

    return all_posts
