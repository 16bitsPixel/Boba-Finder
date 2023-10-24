# Menu Scraper
Goal of the web scraper is to locate all boba shops in a given location. From there, it goes through each boba shop and scrapes the following information:
- Name of shop
- Location
- Rating
- Tea Flavors
- Toppings

## Python Libraries
- BeautifulSoup
- Selenium (Need chromedriver and chrome installed)

## How To Use:
Activate the python environment w/
```
.\env-scrapy-mongodb\Scripts\activate
```

Then run the web scraper
```
py .\menu-scraper\grubhub_scrape.py
```

Enter a link to a grubhub store page when prompted  
Ex: https://www.grubhub.com/restaurant/sharetea-2855-stevens-creek-blvd-santa-clara/547478