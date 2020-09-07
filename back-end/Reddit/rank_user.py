from app import app, db

class Rank_user(db.Model):

    user_id = db.Column(db.String(), primary_key = True)
    securities = db.Column(db.Integer)
    other_cash = db.Column(db.Integer)
    ex_trade_securities = db.Column(db.Integer)
    otc_securities = db.Column(db.Integer)

    def __init__(self, user_id, securities = 1, other_cash = 1,
            ex_trade_securities = 1, otc_securities = 1):

        self.user_id = user_id
        self.securities = securities
        self.other_cash = other_cash
        self.ex_trade_securities = ex_trade_securities
        self.otc_securities = otc_securities

    def json(self):
        return {
            "user_id": self.user_id,
            "securities": self.securities,
            "other_cash": self.other_cash,
            "ex_trade_securities": self.ex_trade_securities,
            "otc_securities": self.otc_securities
        }

def add_new_user(user_id):

    is_successful_add = False

    try:
        new_user = Rank_user(user_id)
        db.session.add(new_user)
        db.session.commit()
        db.session.close()

        is_successful_add = True
    except:
        app.logger.error("Error adding new user to rank_user table")

    return {
        "is_successful_add": is_successful_add
    }

def get_user_rank_in_int(user_id, product):
    user_all_ranks = Rank_user.query.filter_by(user_id = user_id).first()
    rank_in_int = user_all_ranks.json()[product]

    return rank_in_int

def up_rank(user_id, product):
    user_ranks = Rank_user.query.filter_by(user_id = user_id).first()

    is_successful_modify = False

    new_user_ranks = user_ranks.json()
    new_user_ranks[product] = min(3, new_user_ranks[product] + 1) # 3 is the max rank
    
    db.session.delete(user_ranks)
    db.session.commit()
    db.session.close()

    replaced_user = Rank_user( user_id = new_user_ranks["user_id"],
                            securities = new_user_ranks["securities"],
                            other_cash = new_user_ranks["other_cash"],
                            ex_trade_securities = new_user_ranks["ex_trade_securities"],
                            otc_securities = new_user_ranks["otc_securities"]
                            )
    db.session.add(replaced_user)
    db.session.commit()
    db.session.close()

    is_successful_modify = True

    return {
        "success": is_successful_modify
    }


