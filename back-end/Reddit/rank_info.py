from app import app, db

class Rank_info(db.Model):

    level = db.Column(db.String(), primary_key = True)
    rank_name = db.Column(db.String())


    def __init__(self, level, rank_name):

        self.level = level
        self.rank_name = rank_name

    def json(self):
        return {
            "level": self.level,
            "rank_name": self.rank_name
        }

def get_rank_name(level):
    rank = Rank_info.query.filter_by(level = level).first()

    return rank.rank_name
