from app import app, db

class Savvy_user(db.Model):

    user_id = db.Column(db.String(), primary_key = True)
    points = db.Column(db.Integer)

    def __init__(self, user_id, points = 0):

        self.user_id = user_id
        self.points = points

    def json(self):
        return {
            "user_id": self.user_id,
            "points": self.points
        }

def add_new_user(user_id):

    is_successful_add = False

    try:
        new_user = Savvy_user(user_id)
        db.session.add(new_user)
        db.session.commit()
        db.session.close()

        is_successful_add = True
    except:
        app.logger.error("Error adding new user to rank_user table")

    return {
        "is_successful_add": is_successful_add
    }

def get_points(user_id):
    user = Savvy_user.query.filter_by(user_id = user_id).first()

    return user.points

def add_points(user_id, new_points):
    user = Savvy_user.query.filter_by(user_id = user_id).first()

    curr_points = user.points
    
    new_user = Savvy_user.query.filter_by(user_id = user_id).update({"points": curr_points + new_points}, \
            synchronize_session = False)
    db.session.commit()
    db.session.close()


    return {
        "is_successful_add": True
    }
