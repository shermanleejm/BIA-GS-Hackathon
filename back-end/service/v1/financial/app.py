
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import os
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Stock(db.Model):

    ticker = db.Column(db.String(12), primary_key=True)
    name = db.Column(db.String(24))
    summary = db.Column(db.String(10000))
    sector = db.Column(db.String(100))

    def __init__(self, ticker, name, summary, sector):
        self.ticker = ticker
        self.name = name
        self.summary = summary
        self.sector = sector

    def json(self):
        return {
            "ticker": self.ticker,
            "name": self.name,
            "summary": self.summary,
            "sector": self.sector
        }

@app.route("/")
def index():
    return 'hello world', 200

@app.route("/stocks", methods=["GET"])
def get_loyalty_programs():
    stocks = Stock.query.all()
    return jsonify([stock.json() for stock in stocks]), 200

# For initial adding of Stock
@app.route('/add', methods=['GET'])
def add():
    data = {'ticker': 'AAPL', 'name': 'Apple Inc.', 'sector': 'Technology', 'summary': 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, \
Apple Watch, Beats products, HomePod, iPod touch, and other Apple-branded and third-party accessories. It also provides digital content stores and streaming services; AppleCare support services; and iCloud, a cloud service, which stores music, photos, contacts, calendars, mail, documents, and others. In addition, the company offers various service, such as Apple Arcade, a game subscription service; Apple Card, a co-branded credit card; Apple News+, a subscription news and magazine service; and Apple Pay, a cashless payment service, as well as licenses its intellectual property, and provides other related services. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It sells and delivers third-party applications for its products through the App Store, Mac App Store, and Watch App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. has a collaboration with Google to develop COVID-19 tracking system \
for Android and iOS devices. Apple Inc. was founded in 1977 and is headquartered in Cupertino, California.'}

    stock = Stock(**data)
    db.session.add(stock)
    db.session.commit()
    
    return {"message": f"Stock {stock.name} has been created successfully."}
        
if __name__ == '__main__':
    app.run(debug=True)