# Menu Scraper
Goal of the web scraper is to locate all boba shops in a given location. From there, it goes through each boba shop and scrapes the following information:
- Name of shop
- Address
- Tea Flavors
- Toppings
- Coordinates

## Python Libraries
- BeautifulSoup
- Selenium (Need chromedriver and chrome installed)
- Time
- Pymongo

## How To Use:
- Windows:
Install all dependencies localy, then run the web scraper:
```
py .\menu-scraper\grubhub_scrape.py
```
- Linux:
Install all dependencies localy, then run the web scraper:
```
python3 ./menu-scraper/grubhub_scrape.py
```

Enter the name of a city, will store all restaurants that sell tea and boba
in that city into the mongo database.
Ex:
Enter City Name: San Jose
