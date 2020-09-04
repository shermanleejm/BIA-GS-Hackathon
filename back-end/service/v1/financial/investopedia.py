import requests
import json
from bs4 import BeautifulSoup

# Pull all Link out
def get_info(link):
  
  r = requests.get(link, headers=headers)
  soup = BeautifulSoup(r.text, 'html.parser')

  term = title = body = None
  try:
    term = soup.find('h1', id="article-heading_2-0").text.strip()
    title = soup.find('div', id="mntl-sc-page_1-0").h2.text.strip()
    body = soup.find('div', id="mntl-sc-page_1-0").p.text.strip()
  except:
    print('error')

  return (term, title, body)

# Default
endpoint = 'http://127.0.0.1:5000/terms'
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}

alphabets = 'abcdefghijklmnopqrstuvwxyz'
startingnumber = 4769351
links = []
for index, alphabet in enumerate(alphabets):
  url = "https://www.investopedia.com/terms-beginning-with-{}-{}".format(alphabet, startingnumber + index)
  r = requests.get(url, headers=headers)
  soup = BeautifulSoup(r.text, 'html.parser')
  content_div = soup.find(id="dictionary-top300-list_1-0")
  scraped_links = content_div.find_all('a')
  for link in scraped_links:
    links.append(link.get('href'))


for index, link in enumerate(links[1418:]):
    print("scraping {}".format(index))
    term, title, body = get_info(link)
    if None in (term, title, body):
        print('fail')
        continue

    data = {
        "term": term, 
        "link": link,
        "title": title,
        "body": body.replace(u'\xa0', u' ')
    }

    resp = requests.post(endpoint, json=json.dumps(data))
    if resp.ok:
        print('success')
    else:
        print('fail')






