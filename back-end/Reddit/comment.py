from app import app, db

class Comment(db.Model):

    post_id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.String(), primary_key = True)
    content = db.Column(db.String())
    dt = db.Column(db.DateTime, primary_key = True)

    def __init__(self, post_id, user_id, content, dt):       
        self.post_id = post_id
        self.user_id = user_id
        self.content = content
        self.dt = dt

    def json(self):
        return {
            "user_id": self.user_id,
            "post_id": self.post_id,
            "content": self.content,
            "dt": self.dt
        }

def write_comment(post_id, user_id, content):

    app.logger.info("Uploading comment")

    is_successful_write = False
    try:

        app.logger.info(db.func.now())
        new_comment = Comment(post_id = post_id, 
                    user_id = user_id,
                    content = content,
                    dt = db.func.now())

        app.logger.info(db.func.now())
        db.session.add(new_comment)
        db.session.commit()

        app.logger.info(f" SUCCESS: Uploaded comment from {user_id}")
        is_successful_write = True

    except:
        app.logger.info(f" FAIL: Upload comment from {user_id} failed")
    
    return {
        "is_success": is_successful_write
    }

def get_comments(post_id):
    """
    Returns comments given a post_id
    """
    app.logger.info(f"Querying database for post_id = {post_id}")
    comments = Comment.query.filter_by(post_id = post_id).order_by(Comment.dt.desc()).all()

    return [comment.json() for comment in comments]
