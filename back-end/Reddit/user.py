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

def profile_user(user_id, age, occupation, spending, risk):

    app.logger.info(f"Updating information for user: {user_id}")
    is_profiling_success = False
    try:
        user = User.query.filter_by(user_id=user_id).first()

        user.age = age
        user.occupation = occupation
        user.spending = spending
        user.risk = risk
        db.session.commit()
    
        app.logger.info(f" SUCCESS: Updated information for user {user_id}")
        is_profiling_success = True
    except:
        app.logger.error(f" FAIL: Error occurred when updating database")
    
    return {
        "success": is_profiling_success
    }
        

def register_user(user_id, password):
    new_user = User(user_id, password, None, None, None, None)

    is_registration_success = False
    try:
        app.logger.info(f"Inserting new user: {user_id}")
        db.session.add(new_user)
        db.session.commit()

        app.logger.info(f" SUCCESS: added new user {user_id}.")
        is_registration_success = True
    except:
        app.logger.error(f" FAIL: Error adding new user.")

    return {
        "success": is_registration_success
    }


def authenticate_user(user_id_to_check, password):
    """
    Returns a boolean to check if user's password is correct.

    """
    user = User.query.filter_by(user_id=user_id_to_check).first()

    is_auth_success = False

    if (user is not None):
        # User exists    
        app.logger.info(" User exists in database. ")
        
        if user.password == password:
            app.logger.info(" SUCCESS: Password authenticated.")
            is_auth_success = True
            
        else:
            app.logger.info(" FAIL: Incorrect password.")

    else:
        app.logger.info(" User does not exist in database.")
    
    return {
        "success": is_auth_success
    }

def check_first_login(user_id_to_check):
    """
    Returns a boolean to check if user has filled the questionnaire.

    """
    user = User.query.filter_by(user_id=user_id_to_check).first()
    
    is_first_login = True

    if (user is not None):
        app.logger.info(" User exists in database")
        
        if (user.risk is not None):
            app.logger.info(" SUCCESS: User has completed questionnaire.")
            is_first_login = False

        else:
            app.logger.info(" FAIL: User has yet to complete questionnaire.")
    
    else:
        app.logger.info(" User does not exist in database.")

    return {
        "is_first_login": is_first_login
    }


def get_users():
    users = User.query.all()

    return [user.json() for user in users]

def get_user_details_from_list(user_list):

    required_users = User.query.filter(User.user_id.in_(user_list)).all()

    return [user.json() for user in required_users]
