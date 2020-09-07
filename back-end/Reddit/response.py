from app import app, db

class q_response(db.Model):

    qid = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.String(), primary_key = True)
    choice = db.Column(db.String())
    time_entered = db.Column(db.DateTime)

    def __init__(self, qid, user_id, choice,
            time_entered):
        self.qid = qid
        self.user_id = user_id
        self.choice = choice
        self.time_entered = time_entered

    def json(self):
        return {
            "qid": self.qid,
            "user_id": self.user_id,
            "choice": self.choice,
            "time_entered": self.time_entered
        }

def send_user_response(qid, user_id, choice):

    app.logger.info(f" Attempting to send response to a question in database. ")

    is_add_success = False

    new_response = q_response(qid, user_id, choice, db.func.now())

    db.session.add(new_response)
    db.session.commit()
    db.session.close()

    is_add_success = True
    # except:
    #     app.logger.info("Error in adding question.")

    return {
        "is_successful_add": is_add_success
    }