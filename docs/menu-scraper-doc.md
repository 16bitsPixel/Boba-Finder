# Menu Scraper
Goal of the web scraper is to locate all boba shops in a given location. From there, it goes through each boba shop and scrapes the following information:
- Name of shop
- Location
- Tea Flavors
- Toppings

## Python Libraries
- BeautifulSoup
- Selenium (Need chromedriver and chrome installed)
- Time
- Pymongo

## How To Use:
- Windows:
Activate the python environment w/
```
.\venv\Scripts\activate
```
Then run the web scraper
```
py .\menu-scraper\grubhub_scrape.py
```
- Linux:
Activate the python environment w/
```
source ./venv/bin/activate
```
Then run the web scraper
```
python3 ./menu-scraper/grubhub_scrape.py
```

Enter the name of a city, will store all restaurants that sell tea and boba
in that city into the mongo database.
Ex:
Enter City Name: San Jose
