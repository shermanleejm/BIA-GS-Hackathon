from app import app, db

class Friend(db.Model):

    friendship_id = db.Column(db.Integer, primary_key = True)
    sender_id = db.Column(db.String())
    receiver_id = db.Column(db.String())

    def __init__(self, sender_id, receiver_id):       
        self.sender_id = sender_id
        self.receiver_id = receiver_id

def connect(sender_id, receiver_id):
    app.logger.info(f" Attempting to form friendship between {sender_id} and {receiver_id}")

    is_connection_success = False

    try:
        new_friend = Friend(sender_id = sender_id, receiver_id = receiver_id)

        db.session.add(new_friend)

        friend_reverse = Friend(sender_id = receiver_id, receiver_id = sender_id)
        db.session.add(friend_reverse)
        db.session.flush()
        db.session.commit()
        db.session.close()
        
        app.logger.info(" SUCCESS: Friendship formed.")
        is_connection_success = True
    except:
        app.logger.info(" FAIL: Error in forming friendship.")

    return {
        "is_success": is_connection_success
    }

def get_non_friends(user_id):
    """
    takes in user_id

    returns a list of non_friends
    """
    app.logger.info(f"Querying database to obtain friends user_id: {user_id}")

    connections = Friend.query.filter_by(sender_id=user_id).all()

    friends = [connection.receiver_id for connection in connections]

    return friends

    
def get_friends(user_id):
    """
    takes in user_id and return a list of friend's user_ids (friends)
    """
    app.logger.info(f"Querying database to obtain friends user_id: {user_id}")

    connections = Friend.query.filter_by(sender_id=user_id).all()

    friends = [connection.receiver_id for connection in connections]

    # Temporary code to remove duplicates
    friends = list(set(friends))

    return friends

