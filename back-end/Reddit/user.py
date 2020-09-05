from app import app, db

class User(db.Model):
    user_id = db.Column(db.String(), primary_key = True)
    password = db.Column(db.String())
    age = db.Column(db.Integer)
    occupation = db.Column(db.String())
    spending = db.Column(db.String())
    risk = db.Column(db.String())

    def __init__(self, user_id, password,
            age, occupation, spending, risk):
        self.user_id = user_id
        self.password = password
        self.age = age
        self.occupation = occupation
        self.spending = spending
        self.risk = risk

    def json(self):
        return {
            "user_id": self.user_id,
            "password": self.password,
            "age": self.age,
            "occupation": self.occupation,
            "spending": self.spending,
            "risk": self.risk,
        }

def profile(user_id, age, occupation, spending, risk):
    try:
        app.logger.info(f"Updating information for user: {user_id}")
        user = User.query.filter_by(user_id=user_id).first()

        user.age = age
        user.occupation = occupation
        user.spending = spending
        user.risk = risk
        db.session.commit()
    
        app.logger.info(f" SUCCESS: Updated information for user {user_id}")
        return True
    except:
        app.logger.info(f" FAIL: Error occurred when updating database")
        return False

def register_user(user_id, password):
    new_user = User(user_id, password, None, None, None, None)
    try:
        app.logger.info(f"Inserting new user: {user_id}")
        db.session.add(new_user)
        db.session.commit()

        app.logger.info(f" SUCCESS: added new user {user_id}.")
        return True
    except:
        app.logger.info(f" FAIL: Error adding new user.")
        return False


def validate_user(user_id_to_check, password):
    """
    Returns a boolean to check if user's password is correct.

    """
    user = User.query.filter_by(user_id=user_id_to_check).first()
    
    try:
        is_user_found = user.password == password
        app.logger.info(" SUCCESS: Password authenticated.")
        return is_user_found
    except:
        app.logger.info(" FAIL: Incorrect password.")
        return False

def check_first_login(user_id_to_check):
    """
    Returns a boolean to check if user has filled the questionnaire.

    """
    user = User.query.filter_by(user_id=user_id_to_check).first()
    
    try:
        if (user.risk):
            app.logger.info(" SUCCESS: User has completed questionnaire.")
            return True
    except:
        app.logger.info(" FAIL: User has yet to complete questionnaire.")
        return False


def get_users():
    users = User.query.all()

    return [user.json() for user in users]

def get_list_of_user_details(user_list):
    users = []
    for user_id in user_list:
        user = User.query.filter_by(user_id=user_id).first()
        users.append(user.json())

    return users
