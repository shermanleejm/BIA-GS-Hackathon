from app import app, db

class Post(db.Model):

    post_id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.String())
    content = db.Column(db.String())

    def __init__(self, post_id, user_id, content):        
        self.post_id = post_id
        self.user_id = user_id
        self.content = content

def create_post(user_id, content):
    
    try:
        app.logger.info(f" Creating new post from {user_id}")
        new_post = Post(user_id = user_id, content = content)
        db.session.add(new_post)
        db.session.commit()

        app.logger.info(f" SUCCESS: new post created")
        return True
    except:
        app.logger.info(f" FAIL: Error creating new post")
        return False


