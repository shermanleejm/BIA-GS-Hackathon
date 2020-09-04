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

def register_user(user_id, password, age, occupation, spending, risk):
    new_user = User(user_id, password, age, occupation, spending, risk)
    try:
        app.logger.info(f"Inserting new user: {user_id}")
        db.session.add(new_user)
        db.session.commit()

        app.logger.info(f"Succesfully added new uesr.")
        return True
    except:
        app.logger.info(f"Error in adding new user.")
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


