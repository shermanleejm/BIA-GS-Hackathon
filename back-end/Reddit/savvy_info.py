from app import app, db

class Savvy_info(db.Model):

    points = db.Column(db.String(), primary_key = True)
    savvy_rank = db.Column(db.String())


    def __init__(self, points, savvy_rank):

        self.points = points
        self.savvy_rank = savvy_rank

    def json(self):
        return {
            "points": self.points,
            "savvy_rank": self.savvy_rank
        }

def get_savvy_rank(user_points):
    rank = Savvy_info.query.filter(Savvy_info.points <= user_points).order_by(Savvy_info.points.desc()).first()

    return {
        "rank": rank.savvy_rank
    }
