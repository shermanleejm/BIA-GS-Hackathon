from app import app, db

class Post(db.Model):

    post_id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.String())
    content = db.Column(db.String())

    def __init__(self, user_id, content):        
        self.user_id = user_id
        self.content = content

    def json(self):
        return {
            "post_id": self.post_id,
            "user_id": self.user_id,
            "content": self.content
        }

def create_post(user_id, content):
    app.logger.info(f" Creating new post from {user_id}")

    is_successful_create = False

    try:
        new_post = Post(user_id = user_id, content = content)
        db.session.add(new_post)
        db.session.commit()

        app.logger.info(f" SUCCESS: new post created")
        is_successful_create = True
    except:
        app.logger.info(f" FAIL: Error creating new post")
    
    return {
        "is_success": is_successful_create
    }

def get_all():
    
    posts = Post.query.all()

    return [post.json() for post in posts]

def get_post_from_user(user_id):
    
    posts = Post.query.filter_by(user_id=user_id).all()

    return [post.json() for post in posts]


