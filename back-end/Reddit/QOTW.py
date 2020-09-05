# from app import app, db

# #  QOTW : question of the week

# class Questions(db.Model):

#     qid = db.Column(db.String(), primary_key = True)
#     question = db.Column(db.String())
#     dt = db.Column(db.String())
#     choice_1 = db.Column(db.String())
#     choice_2 = db.Column(db.String())
#     choice_3 = db.Column(db.String())
#     choice_4 = db.Column(db.String())
#     choice_5 = db.Column(db.String())
#     correct_option = db.Column(db.String())
#     points = db.Column(db.Integer)
    
#     def __init__(self, qid, question, dt, choice_1,
#             choice_2, choice_3, choice_4, choice_5,
#             correct_option, points):
#         self.qid = qid
#         self.password = password
#         self.age = age
#         self.occupation = occupation
#         self.spending = spending
#         self.risk = risk

#     def json(self):
#         return {
#             "user_id": self.user_id,
#             "password": self.password,
#             "age": self.age,
#             "occupation": self.occupation,
#             "spending": self.spending,
#             "risk": self.risk,
#         }