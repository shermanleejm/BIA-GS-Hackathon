from app import app, db

class Watchlist(db.Model):

    watchlist_id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.String())
    product = db.Column(db.String())

    def __init__(self, user_id, product):        
        
        self.user_id = user_id
        self.product = product

def toggle_add_to_watchlist(user_id, product):

    app.logger.info(f" Toggling watchlist status for {product} by {user_id}")

    current_status = Watchlist.query.filter_by(user_id = user_id, product = product).first()

    if current_status is None:
        item_to_add = Watchlist(user_id = user_id, product = product)
        db.session.add(item_to_add)

        app.logger.info(f" SUCCESS: {user_id} has added {product} to the watchlist")
        
    else:
        db.session.delete(current_status)

        app.logger.info(f" SUCCESS: {user_id} is no longer having {product} on the watchlist")
        
    db.session.commit()
    db.session.close()
    
    return {
        "is_successful_toggle": True
    }

def get_watchlist(user_id):

    app.logger.info(f"Querying watchlist table for products followed by {user_id}")
    queryList = Watchlist.query.filter_by(user_id = user_id).all()
    
    return [row.product for row in queryList]


