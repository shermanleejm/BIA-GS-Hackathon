from app import app, db

class User(db.Model):
    user_id = db.Column(db.String(), primary_key = True)
    password = db.Column(db.String())
    age = db.Column(db.Integer)
    monthly_income = db.Column(db.Integer)
    savings = db.Column(db.Integer)
    category = db.Column(db.String())

    def __init__(self, user_id, password,
            age, monthly_income, savings, category):
        self.user_id = user_id
        self.password = password
        self.age = age
        self.monthly_income = monthly_income
        self.savings = savings
        self.category = category

def get_all_users():
    all_users = User.query.all()

    return all_users

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
        if (user.category):
            app.logger.info(" SUCCESS: User has completed questionnaire.")
            return True
    except:
        app.logger.info(" FAIL: User has yet to complete questionnaire.")
        return False


