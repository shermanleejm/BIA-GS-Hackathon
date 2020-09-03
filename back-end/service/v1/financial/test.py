import yfinance as yf

stock = yf.Ticker("AAPL")
stock_info = stock.info
data = {}
data['symbol'] = stock_info['symbol']
data['longName'] = stock_info['longName']
data['sector'] = stock_info['sector']
data['longBusinessSummary'] = stock_info['longBusinessSummary']
# print(stock.info)

print(data)

# Get the list of Stock's ticker
# Call through all of it
# Store in Database for Rendering in Frontend