import yfinance as yf
import requests
import json
endpoint = 'http://127.0.0.1:5000/add'

stock = yf.Ticker("MSFT")
stock_info = stock.info
data = {}
data['ticker'] = stock_info['symbol']
data['name'] = stock_info['longName']
data['sector'] = stock_info['sector']
data['summary'] = stock_info['longBusinessSummary']
data['fullTimeEmployees'] = stock_info['fullTimeEmployees']
data['website'] = stock_info['website']
data['industry'] = stock_info['industry']
data['logo_url'] = stock_info['logo_url']

resp = requests.post(endpoint, json=json.dumps(data))
if resp.ok:
    print('success')
else:
    print('fail')



# Get all stocks

# all_stocks = requests.get('https://pkgstore.datahub.io/core/nyse-other-listings/nyse-listed_json/data/e8ad01974d4110e790b227dc1541b193/nyse-listed_json.json').json()
# endpoint = 'http://127.0.0.1:5000/add'
# count = 0
# for index, item in enumerate(all_stocks):
#     symbol = item['ACT Symbol']
#     print("Loading {} - {}".format(index, symbol))
#     try:
#         stock = yf.Ticker(symbol)
#         stock_info = stock.info
#         data = {}
#         data['ticker'] = stock_info['symbol']
#         data['name'] = stock_info['longName']
#         data['sector'] = stock_info['sector']
#         data['summary'] = stock_info['longBusinessSummary']
#         data['fullTimeEmployees'] = stock_info['fullTimeEmployees']
#         data['website'] = stock_info['website']
#         data['industry'] = stock_info['industry']
#         data['logo_url'] = stock_info['logo_url']
#     except:
#         print("error with getting data")
#         continue
#     resp = requests.post(endpoint, json=json.dumps(data))
#     if resp.ok:
#         print('success')
#         count+=1
#     else:
#         print('fail')
    
    



