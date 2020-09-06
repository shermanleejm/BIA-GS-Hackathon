from app import app, db

class Likes(db.Model):

    post_id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.String(), primary_key = True)

    def __init__(self, post_id, user_id):
        self.post_id = post_id
        self.user_id = user_id

def toggle_like(post_id, user_id):
    
    app.logger.info(f" Toggling like status for {post_id} by {user_id}")

    current_like = Likes.query.filter_by(user_id = user_id, post_id = post_id).first()

    if current_like is None:
        new_like = Likes(post_id, user_id)
        db.session.add(new_like)

        app.logger.info(f" SUCCESS: {user_id} now likes {post_id}")

    else:
        db.session.delete(current_like)

        app.logger.info(f" SUCCESS: {user_id} no longer likes {post_id}")
        
    db.session.commit()
    db.session.close()
    return {
        "is_success": True
    }

def get_like_info(post_id):
    """
    post_id is a string in the param, but int in database
    """
    app.logger.info(f"Querying database to obtain likes for postId: {post_id}")
    likes = Likes.query.filter_by(post_id = int(post_id)).all()

    return [user.user_id for user in likes]
