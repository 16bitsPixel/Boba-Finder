import requests
from bs4 import BeautifulSoup
import pymongo

def scrape_quotes():
    more_links = True
    page = 1
    quotes = []
    while(more_links):
        markup = requests.get(f'http://quotes.toscrape.com/page/{page}').text
        soup = BeautifulSoup(markup, 'html.parser')
        for item in soup.select('.quote'):
            quote = {}
            quote['text'] = item.select_one('.text').get_text()
            quote['author'] = item.select_one('.author').get_text()
            tags = item.select_one('.tags')
            quote['tags'] = [tag.get_text() for tag in tags.select('.tag')]
            quotes.append(quote)

        next_link = soup.select_one('.next > a')

        # print which page was scraped
        print(f'scraped page {page}')

        # check if the next link element exists
        if(next_link):
            page += 1
        else:
            more_links = False
    return quotes

quotes = scrape_quotes()
client = pymongo.MongoClient("mongodb+srv://brandonllanes16:XIPZsFqtcLYtkQ4l@bobacluster.atdxi6u.mongodb.net/?retryWrites=true&w=majority")
db = client.db.quotes
try:
    db.insert_many(quotes)
    print(f'inserted {len(quotes)} articles')
except:
    print('an error occurred quotes were not stored to db')