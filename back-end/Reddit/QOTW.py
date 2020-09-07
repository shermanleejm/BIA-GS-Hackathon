from app import app, db
from sqlalchemy.sql.expression import func

#  QOTW : question of the week

class Qotw(db.Model):

    qid = db.Column(db.Integer, primary_key = True)
    question = db.Column(db.String())
    dt = db.Column(db.DateTime)
    choice_1 = db.Column(db.String())
    choice_2 = db.Column(db.String())
    choice_3 = db.Column(db.String())
    choice_4 = db.Column(db.String())
    choice_5 = db.Column(db.String())
    correct_option = db.Column(db.String())
    points = db.Column(db.Integer)
    
    def __init__(self, question, dt, choice_1,
            choice_2, choice_3, choice_4, choice_5,
            correct_option, points):
        self.question = question
        self.dt = dt
        self.choice_1 = choice_1
        self.choice_2 = choice_2
        self.choice_3 = choice_3
        self.choice_4 = choice_4
        self.choice_5 = choice_5
        self.correct_option = correct_option
        self.points = points

    def json(self):
        return {
            "qid": self.qid,
            "question": self.question,
            "dt": self.dt,
            "choice_1": self.choice_1,
            "choice_2": self.choice_2,
            "choice_3": self.choice_3,
            "choice_4": self.choice_4,
            "choice_5": self.choice_5,
            "correct_option": self.correct_option,
            "points": self.points
        }

def add_question( question, choice_1, choice_2,
            choice_3, choice_4, choice_5,
            correct_option, points ):

    app.logger.info(f" Attempting to add question in database. ")

    is_add_success = False

    # try:

    new_question = Qotw(
        question = question, 
        dt = db.func.now(),
        choice_1 = choice_1,
        choice_2 = choice_2, 
        choice_3 = choice_3,
        choice_4 = choice_4,
        choice_5 = choice_5,
        correct_option = correct_option, 
        points = points
        )

    db.session.add(new_question)
    
    db.session.commit()
    db.session.close()

    is_add_success = True
    # except:
    #     app.logger.info("Error in adding question.")

    return {
        "is_successful_add": is_add_success
    }

def get_latest_question():
    latest_question = Qotw.query.order_by(Qotw.qid.desc()).first()

    return latest_question.json()

def get_all_questions():
    all_questions = Qotw.query.order_by(Qotw.qid.desc()).all()

    return [qn.json() for qn in all_questions]
