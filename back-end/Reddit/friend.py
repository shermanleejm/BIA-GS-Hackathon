from app import app, db

class Friend(db.Model):

    sender_id = db.Column(db.String(), primary_key = True)
    receiver_id = db.Column(db.String(), primary_key = True)

    def __init__(self, sender_id, receiver_id):       
        self.sender_id = sender_id
        self.receiver_id = receiver_id

def connect(sender_id, receiver_id):
    app.logger.info(f" Attempting to form friendship between {sender_id} and {receiver_id}")
    try:
        new_friend = Friend(sender_id, receiver_id)
        db.session.add(new_friend)
        db.session.commit()

        friend_reverse = Friend(receiver_id, sender_id)
        db.session.add(friend_reverse)
        db.session.commit()

        app.logger.info(" SUCCESS: Friendship formed.")
        return True
    except:
        app.logger.info(" FAIL: Users are already friends.")

        return False

    
def get_friends(user_id):
    """
    takes in user_id and return a list of friend's user_ids (friends)
    """
    app.logger.info(f"Querying database to obtain friends user_id: {user_id}")

    connections = Friend.query.filter_by(sender_id=user_id).all()

    friends = [connection.receiver_id for connection in connections]

    return friends

