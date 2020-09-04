from app import app, db

class Post(db.Model):

    post_id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.String())
    content = db.Column(db.String())

    def __init__(self, user_id, content):
        self.user_id = user_id
        self.content = content

def get_all_posts():
    all_posts = Post.query.all()

    return all_posts

def create_post(user_id, content):
    try:
        app.logger.info(f" Creating new post from {user_id}")
        new_post = Post(user_id = user_id, content = content)
        app.logger.info(new_post.post_id)
        db.session.add(new_post)
        db.commit()

        app.logger.info(f" SUCCESS: new post created")
        return True
    except:
        app.logger.info(f" FAIL: Error in creating post")
        return False
