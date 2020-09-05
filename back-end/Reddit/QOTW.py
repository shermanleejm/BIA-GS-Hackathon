from app import app, db

#  QOTW : question of the week

class Questions(db.Model):

    qid = db.Column(db.String(), primary_key = True)
    question = db.Column(db.String())
    dt = db.Column(db.DateTime)
    choice_1 = db.Column(db.String())
    choice_2 = db.Column(db.String())
    choice_3 = db.Column(db.String())
    choice_4 = db.Column(db.String())
    choice_5 = db.Column(db.String())
    correct_option = db.Column(db.String())
    points = db.Column(db.Integer)
    
    def __init__(self, qid, question, dt, choice_1,
            choice_2, choice_3, choice_4, choice_5,
            correct_option, points):
        self.qid = qid
        self.question = question
        self.dt = dt
        self.choice_1 = choice_1
        self.choice_2 = choice_2
        self.choice_3 = choice_3
        self.choice_4 = choice_4
        self.choice_5 = choice_5

    def json(self):
        return {
            "user_id": self.user_id,
            "password": self.password,
            "age": self.age,
            "occupation": self.occupation,
            "spending": self.spending,
            "risk": self.risk,
        }