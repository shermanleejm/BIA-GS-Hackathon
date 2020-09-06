from app import app, db
import like

class Post(db.Model):

    post_id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.String())
    title = db.Column(db.String())
    content = db.Column(db.String())
    image_url = db.Column(db.String())

    def __init__(self, user_id, title, content, image_url):        
        self.user_id = user_id
        self.title = title
        self.content = content
        self.image_url = image_url

    def json(self):
        return {
            "post_id": self.post_id,
            "user_id": self.user_id,
            "title": self.title,
            "content": self.content,
            "image_url": self.image_url
        }

def create_post(user_id, title, content, image_url):
    app.logger.info(f" Creating new post from {user_id}")

    is_successful_create = False
    
    try:

        new_post = Post(title = title, 
                user_id = user_id, content = content,
                image_url = image_url)
        db.session.add(new_post)
        db.session.commit()
        db.session.close()

        app.logger.info(f" SUCCESS: new post created")
        is_successful_create = True
    except:
        app.logger.info(f" FAIL: Error creating new post")
    
    return {
        "is_success": is_successful_create
    }

def get_all():
    
    posts = Post.query.all()
    list_of_posts = [post.json() for post in posts]
    for post in list_of_posts:
        post["likes"] = like.get_like_info(post["post_id"])

    return list_of_posts

def get_post_from_user(user_id):
    
    posts = Post.query.filter_by(user_id=user_id).all()

    list_of_posts = [post.json() for post in posts]
    for post in list_of_posts:
        post["likes"] = like.get_like_info(post["post_id"])

    return list_of_posts


