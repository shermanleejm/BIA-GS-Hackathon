import pandas as pd
from os.path import dirname, join
import json
import requests
import sys

ticker = sys.argv[1]
current_dir = dirname(__file__)
file_path = join(current_dir, "./{}.csv".format(ticker))

df = pd.read_csv(file_path)
df['ticker'] = ticker

# print(df.values)
data = df.values
endpoint = 'http://127.0.0.1:5000/add_stockprice'

for row in data:
    x = {
        "ticker": row[7],
        "date": row[0],
        "openn": row[1],
        "high": row[2],
        "low": row[3],
        "close": row[4],
        "adjclose": row[5],
        "volume": row[6],
    }

    resp = requests.post(endpoint, json=json.dumps(x))
    if resp.ok:
        print('success')
    else:
        print('fail')