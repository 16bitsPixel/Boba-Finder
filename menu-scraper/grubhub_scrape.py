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

    # Load Tea Flavors
    teaFlavorsKW = load('../res/tea.txt')

    # Load toppings:
    teaToppingsKW = load('../res/toppings.txt')

    # Initialize ChromeOptions instance
    chrome_options = initChromeOptions()

    # Initialize Chrome Webdriver instance
    browser = webdriver.Chrome(options=chrome_options)

    # Navigate to specific URL
    browser.get(url)
    time.sleep(3)  

    # Retrieve HTML source Code
    innerHTML = browser.page_source

    # Parse text in HTML element
    soup = BeautifulSoup(innerHTML, 'html.parser')

    # Check if menu found
    if not menuCheck(soup):
        return 0

    previous_height = browser.execute_script('return window.pageYOffset;')
    body = browser.find_element(By.TAG_NAME, 'body')
    body.click()

    menuItems = []
    entry = {}
    # Extract Name
    entry['Restaurant Name'] = soup.find('h1', {'data-testid': 'restaurant-nameHeader'}).text

    # Extract Address
    button_element = soup.find('button', {'data-testid': 'restaurant-address'})
    entry['Address'] = button_element.find('span', {'class': 'sc-dkrFOg gSBpp'}).text

    teaFlavors = []
    teaToppings = []
    # Scan menu items for key TeaBase and TeaToppings words
    while True:    
        for item in soup.select('.menuItem'):              
                # Check drink Name for KeyWords
                drinkName = cleanName(item.select_one('h6').get_text())
                scan(drinkName, teaFlavors, teaToppings, teaFlavorsKW, teaToppingsKW)
                
                # Check drink description for KeyWords
                desc = item.select_one('span[data-testid="menu-item-description"]')
                scan(str(desc), teaFlavors, teaToppings, teaFlavorsKW, teaToppingsKW)

        body.send_keys(Keys.PAGE_DOWN)
        time.sleep(1)
        new_height = browser.execute_script('return window.pageYOffset;')
        if new_height == previous_height:
            break
        previous_height = new_height

        # update html
        innerHTML = browser.page_source
        soup = BeautifulSoup(innerHTML, 'html.parser')
    if teaFlavors:
        entry['Tea Bases'] = list(set(teaFlavors))
    if teaToppings:
        entry['Tea Toppings'] = list(set(teaToppings))
    menuItems.append(entry)
    print("[FINISHED SCRAPING]")

    return menuItems

def initChromeOptions():
    chrome_options = Options()
    chrome_options.add_argument("start-maximized")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')
    # To disable headless mode (for debugging or troubleshooting), comment out the following line:
    #chrome_options.add_argument("--headless")
    return chrome_options

def menuCheck(soup):
    menu = soup.find("div", {"data-testid" : "menu-sections-container"})
    if menu is None:
        print('[MENU FAIL]')
        return 0
    else:
        print('[FOUND MENU]')
        return 1

def cleanName(teaRaw):
    # clean Menu Item Name
    teaClean = ''
    for char in teaRaw:
        if char.isalpha() or char == ' ':
            teaClean += char
    if teaClean[0] == ' ':
        teaClean = teaClean[1:]
    if teaClean[1] == ' ':
        teaClean = teaClean[2:]
    return teaClean

def load(path):
    f = open(path, mode='r+')
    line = f.readline()
    text = set()
    while line:
        line = line.rstrip()
        text.add(line.lower())
        line = f.readline() 
    f.close()
    return text

def scan(text, teaFlavors, teaToppings, teaFlavorsKW, teaToppingsKW):
    if not text:
        return 0
    for i in text.split(' '):
                    if i in teaFlavorsKW:
                        if i not in teaToppings:
                            teaFlavors.append(i)
                    if i in teaToppingsKW:
                        if i not in teaToppings:
                            teaToppings.append(i)

# insert data collected into MongoDB
bobaDrinks = get_menu(input('Enter Grubhub Link: '))

# test db:
# mongodb+srv://vcasanov:i3DFbeGAHi05CWA0@test.i44ykno.mongodb.net/?retryWrites=true&w=majority

# production db:
# mongodb+srv://brandonllanes16:XIPZsFqtcLYtkQ4l@bobacluster.atdxi6u.mongodb.net/?retryWrites=true&w=majority

client = pymongo.MongoClient("mongodb+srv://brandonllanes16:XIPZsFqtcLYtkQ4l@bobacluster.atdxi6u.mongodb.net/?retryWrites=true&w=majority")
db = client.db.bobaShop
try:
    db.insert_many(bobaDrinks)
    print(f'Inserted {len(bobaDrinks)} entries')
except Exception as e:
    print(f"Error during insertion: {e}")
    print("Nothing was stored to db")
#example link: 'https://www.grubhub.com/restaurant/ume-tea-milpitas-272-barber-ct-milpitas/2642037'
