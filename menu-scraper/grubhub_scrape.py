from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import pymongo

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

    time.sleep(3)  

    innerHTML = browser.page_source

    soup = BeautifulSoup(innerHTML, 'html.parser')

    menu = soup.find("div", {"data-testid" : "menu-sections-container"})
    if menu is None:
        print('[MENU FAIL]')
        get_menu(url)
        return
    else:
        print('[FOUND MENU]')

    previous_height = browser.execute_script('return window.pageYOffset;')
    body = browser.find_element(By.TAG_NAME, 'body')
    body.click()

    menuItems = []

    while True:    
        for item in soup.select('.menuItem'):
                boba = {}
                boba['Drink Name'] = item.select_one('h6').get_text()
                desc = item.select_one('span[data-testid="menu-item-description"]')
                if desc is None:
                    boba['Description'] = "Milk Tea"
                else:
                    boba['Description'] = item.select_one('span[data-testid="menu-item-description"]').get_text()
                boba['Price'] = item.select_one('span[data-testid="menu-item-price"]').get_text()

                # append boba drinks
                if boba not in menuItems:
                    menuItems.append(boba)

        body.send_keys(Keys.PAGE_DOWN)
        body.send_keys(Keys.PAGE_DOWN)
        body.send_keys(Keys.PAGE_DOWN)
        time.sleep(3)
        new_height = browser.execute_script('return window.pageYOffset;')
        if new_height == previous_height:
            break
        previous_height = new_height
    print("[FINISHED SCRAPING]")

    return menuItems

# insert data collected into MongoDB
bobaDrinks = get_menu(input('Grubhub Link?  '))
client = pymongo.MongoClient("mongodb+srv://brandonllanes16:XIPZsFqtcLYtkQ4l@bobacluster.atdxi6u.mongodb.net/?retryWrites=true&w=majority")
db = client.db.bobaShop
try:
    db.insert_many(bobaDrinks)
    print(f'inserted {len(bobaDrinks)} boba drinks')
except:
    print('an error occurred quotes were not stored to db')
#example link: 'https://www.grubhub.com/restaurant/ume-tea-milpitas-272-barber-ct-milpitas/2642037'
