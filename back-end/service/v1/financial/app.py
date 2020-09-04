
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os
import json

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Stock(db.Model):

    ticker = db.Column(db.String(12), primary_key=True)
    name = db.Column(db.String(24))
    summary = db.Column(db.String(10000))
    sector = db.Column(db.String(100))
    fullTimeEmployees = db.Column(db.String(100))
    website = db.Column(db.String(2000))
    industry = db.Column(db.String(500))
    logo_url = db.Column(db.String(2000))


    def __init__(self, ticker, name, summary, sector, fullTimeEmployees, website, industry, logo_url):
        self.ticker = ticker
        self.name = name
        self.summary = summary
        self.sector = sector
        self.fullTimeEmployees = fullTimeEmployees
        self.website = website
        self.industry = industry
        self.logo_url = logo_url

    def json(self):
        return {
            "ticker": self.ticker,
            "name": self.name,
            "summary": self.summary,
            "sector": self.sector,
            "fullTimeEmployees": self.fullTimeEmployees,
            "website": self.website,
            "industry": self.industry,
            "logo_url": self.logo_url
        }

class Term(db.Model):

    termID = db.Column(db.Integer, primary_key=True)
    term = db.Column(db.String(100))
    link = db.Column(db.String(2000))
    title = db.Column(db.String(100))
    body = db.Column(db.String(10000))


    def __init__(self, term, link, title, body):
        self.term = term
        self.link = link
        self.title = title
        self.body = body

    def json(self):
        return {
            "term": self.term,
            "link": self.link,
            "title": self.title,
            "body": self.body
        }

@app.route("/")
def index():
    return 'hello world', 200

@app.route("/stocks", methods=["GET"])
def get_stocks():
    stocks = Stock.query.all()
    return jsonify([stock.json() for stock in stocks]), 200

@app.route("/stock/<symbol>", methods=["GET"])
def get_stock(symbol):
    stock = Stock.query.filter_by(ticker=symbol).first()

    if stock:
        return jsonify(stock.json()), 200
    return "Symbol not found", 400


@app.route("/terms", methods=["GET"])
def get_terms():
    terms = Term.query.all()
    return jsonify([term.json() for term in terms]), 200


@app.route("/term/<term>", methods=["GET"])
def get_term(term):
    term = Term.query.filter_by(term=term).first()

    if term:
        return jsonify(term.json()), 200
    return "Term not found", 400


# Initial

# For initial adding of Stock
@app.route('/add', methods=['POST'])
def add_post():
    data = json.loads(request.get_json())
    stock = Stock(**data)
    db.session.add(stock)
    db.session.commit()
    
    return {"message": f"Stock {stock.name} has been created successfully."}

# For initial adding of Terms
@app.route('/terms', methods=['POST'])
def add_term():
    data = json.loads(request.get_json())
    term = Term(**data)
    db.session.add(term)
    db.session.commit()
    
    return {"message": f"Term {term.term} has been created successfully."}
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)