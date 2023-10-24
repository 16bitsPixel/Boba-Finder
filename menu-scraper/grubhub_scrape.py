from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import time
import json
import pymongo


def get_item(browser, id):
    """ given an id, scrape a menu item and all of its options """
    button = browser.find_element_by_id(id)
    browser.execute_script("arguments[0].click();", button)
    time.sleep(1)

    innerHTML = browser.page_source
    html = BeautifulSoup(innerHTML, 'html.parser')

    _options = {}
    options = html.find_all('div', class_='menuItemModal-options') # menuItemModal-choice-option-description
    for option in options:
        name = option.find(class_='menuItemModal-choice-name').text
        choices = option.find_all('span', class_='menuItemModal-choice-option-description')
        if ' + ' in choices[0].text:
            _choices = {choice.text.split(' + ')[0]:choice.text.split(' + ')[1] for choice in choices}
        else:
            _choices = [choice.text for choice in choices]
        _options[name] = _choices
    return _options

def get_menu(url):
    """ given a valid grubhub url, scrape the menu of a restaurant """
    print('Running...')
    chrome_options = Options()
    chrome_options.add_argument("start-maximized")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')
    # To disable headless mode (for debugging or troubleshooting), comment out the following line:
    #chrome_options.add_argument("--headless")

    browser = webdriver.Chrome(options=chrome_options)
    browser.get(url)

    time.sleep(5)  

    innerHTML = browser.page_source

    soup = BeautifulSoup(innerHTML, 'html.parser')

    menu = soup.find("div", {"data-testid" : "menu-sections-container"})
    if menu is None:
        print('menu fail')
        get_menu(url)
        return
    else:
        print('found menu')

    menuItems = []
    for item in soup.select('div[data-testid="menu-item"]'):
            boba = {}
            boba['Drink Name'] = item.select_one('h6').get_text()
            boba['Description'] = item.select_one('span[data-testid="menu-item-description"]').get_text()
            boba['Price'] = item.select_one('span[data-testid="menu-item-price"]').get_text()
            menuItems.append(boba)

    return menuItems

    for item in soup.select(".menuItem"):
        print(item.select_one("h6").get_text())

    """
    cats = menu.find_all('ghs-restaurant-menu-section')
    cats = cats[1:]

    cat_titles = [cat.find('h3', class_='menuSection-title').text for cat in cats]
    cat_items = [[itm.text for itm in cat.find_all('a', class_='menuItem-name')] for cat in cats]
    prices = [[p.text for p in cat.find_all('span', class_='menuItem-displayPrice')] for cat in cats]

    ids = []
    for cat in cats:
        cat_ids = []
        items = cat.find_all('div', class_='menuItem-inner')
        for item in items:
            cat_ids.append(item.get('id'))
        ids.append(cat_ids)

    full_menu = {}
    for ind, title in enumerate(cat_titles):
        all_items = []
        for ind2, itm_name in enumerate(cat_items[ind]):
            item = {}
            item['name'] = itm_name
            item['price'] = prices[ind][ind2]
            item['options'] = get_item(browser, ids[ind][ind2])
            all_items.append(item)
        full_menu[title] = all_items

    path = r"C:\\Users\\xbran\\repos\\Boba-Finder\\menu-scraper"
    with open(f'{path}/data.json', 'w') as f:
        json.dump(full_menu, f, indent=4)
    """

    print('[Finished]')

# insert data collected into MongoDB
shopMenus = get_menu(input('Grubhub Link?  '))
client = pymongo.MongoClient("mongodb+srv://brandonllanes16:XIPZsFqtcLYtkQ4l@bobacluster.atdxi6u.mongodb.net/?retryWrites=true&w=majority")
db = client.db.bobaShops
try:
    db.insert_many(shopMenus)
    print(f'inserted {len(shopMenus)} boba shop menus')
except:
    print('an error occurred quotes were not stored to db')
#example link: 'https://www.grubhub.com/restaurant/ume-tea-milpitas-272-barber-ct-milpitas/2642037'
