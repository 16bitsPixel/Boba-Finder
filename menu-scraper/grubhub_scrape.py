from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import pymongo


def get_menu(url: str):
    """ given a valid grubhub url, scrape the menu of a restaurant """

    # Initialize ChromeOptions instance
    chrome_options = initChromeOptions()

    # Initialize Chrome Webdriver instance
    browser = webdriver.Chrome(options=chrome_options)

    # Navigate to specific URL
    browser.get(url)
    time.sleep(2)

    # Retrieve HTML source Code
    innerHTML = browser.page_source

    # Parse text in HTML element
    soup = BeautifulSoup(innerHTML, 'html.parser')

    # Check if menu found
    rName = soup.find('h1', {'data-testid': 'restaurant-nameHeader'}).text
    print(f"Looking for menu of {rName}")
    if not menuCheck(soup):
        return 0

    # Click Pickup Option if available
    try:
        pickup_option = WebDriverWait(browser, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'label[for="PICKUP"]')))
        pickup_option.click()
    except:
        pass
    time.sleep(1)

    previous_height = browser.execute_script('return window.pageYOffset;')
    body = browser.find_element(By.TAG_NAME, 'body')
    body.click()

    menuItems = []
    entry = {}

    # Extract Name
    entry['restaurantName'] = rName
    # Extract Address
    for div in soup.find_all('a', {'class': 'sc-hBxehG flfcph'}):
        link_text = div['href']
        if "http" in link_text:
            entry['gMapsLink'] = link_text
            link_parts = link_text.partition("daddr=")
            entry['address'] = link_parts[2]
            break

    # Scan menu items for key TeaBase and TeaToppings words
    # Load Tea Flavors & Toppings
    teaFlavorsKW = load('../res/tea.txt')
    teaToppingsKW = load('../res/toppings.txt')

    teaFlavors = []
    teaToppings = []

    foundToppings = False
    while True:
        for item in soup.select('.menuItem'):
            # Check drink Name for KeyWords
            drinkName = cleanName(str(item.select_one('h6').get_text()))
            #if scan(drinkName, teaFlavors, teaToppings, teaFlavorsKW, teaToppingsKW) and (not foundToppings):
                # If keywords found, click item to view and extract toppings (only done once per restaurant)
                #foundToppings = findToppings(teaToppingsKW, teaToppings, item, browser)
            scan(drinkName, teaFlavors, teaToppings, teaFlavorsKW, teaToppingsKW)
            # Check drink description for KeyWords
            desc = cleanDesc(str(item.select_one('span[data-testid="menu-item-description"]')))
            if len(desc) > 0:
                scan(desc, teaFlavors, teaToppings, teaFlavorsKW, teaToppingsKW)

        body.send_keys(Keys.PAGE_DOWN)
        time.sleep(1)
        new_height = browser.execute_script('return window.pageYOffset;')
        if new_height == previous_height:
            break
        previous_height = new_height

        # update html
        innerHTML = browser.page_source
        soup = BeautifulSoup(innerHTML, 'html.parser')

    if not teaFlavors:
        print("No tea at this restaurant")
        return 0

    entry['teaBases'] = list(set(teaFlavors))
    entry['teaToppings'] = list(set(teaToppings))
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
    # chrome_options.add_argument("--headless")
    return chrome_options


def menuCheck(soup):
    menu = soup.find("div", {"data-testid": "menu-sections-container"})
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


def cleanDesc(desc):
    desc = desc.replace(
        '<span class="sc-dkrFOg qpMvb menuItemNew-description--truncate-3" color="#6B6B83" '
        'data-testid="menu-item-description">',
        "")
    desc = desc.replace("</span>", "")
    return desc


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
    found = 0
    if not text:
        return 0
    text = text.lower()
    for i in text.split(' '):
        if i in teaFlavorsKW:
            if i not in teaFlavors:
                teaFlavors.append(i)
                found = 1
        if i in teaToppingsKW:
            if i not in teaToppings:
                teaToppings.append(i)
    return found


def scanToppings(text, teaToppings, teaToppingsKW):
    found = False
    if not text:
        return 0
    text = text.lower()
    for i in text.split(' '):
        if i in teaToppingsKW:
            if i not in teaToppings:
                teaToppings.append(i)
                found = True
    return found


def uploadMongoDB(entry):
    # test db:
    # mongodb+srv://vcasanov:i3DFbeGAHi05CWA0@test.i44ykno.mongodb.net/?retryWrites=true&w=majority

    # production db:
    # mongodb+srv://brandonllanes16:XIPZsFqtcLYtkQ4l@bobacluster.atdxi6u.mongodb.net/?retryWrites=true&w=majority
    client = pymongo.MongoClient(
        "mongodb+srv://brandonllanes16:XIPZsFqtcLYtkQ4l@bobacluster.atdxi6u.mongodb.net/?retryWrites=true&w=majority")
    db = client.db.bobaShop2
    try:
        db.insert_many(entry)
        print(f'Inserted {len(entry)} entries')
    except Exception as e:
        print(f"Error during insertion: \n{e}")
        print("\nNothing was stored to db")


def getNearByRestaurants(loc):
    # Initialize ChromeOptions instance
    chrome_options = initChromeOptions()

    # Initialize Chrome Webdriver instance
    browser = webdriver.Chrome(options=chrome_options)

    # Navigate to specific URL
    browser.get('https://www.grubhub.com/')
    time.sleep(1)

    # Type location into textbox
    text_box = browser.find_element(By.XPATH, "//input[@aria-label='Search Address']")
    text_box.send_keys(loc)
    button = WebDriverWait(browser, 3).until(
        EC.element_to_be_clickable((By.XPATH, "//button[@data-testid='start-order-search-btn']")))

    button.click()

    # Look for restaurants that sell boba nearby
    time.sleep(3)
    input_field = WebDriverWait(browser, 10).until(
        EC.visibility_of_element_located((By.ID, "search-autocomplete-input")))
    input_field.send_keys("Boba")
    input_field.send_keys(Keys.ENTER)

    time.sleep(2)

    # Click See more to get full list if more than 36 nearby
    try:
        button = browser.find_element(By.CSS_SELECTOR, "button.sc-bqWxrE.fJgFJo")
        button.click()
        time.sleep(1)
    except:
        print("Less than 36 nearby restaurants found")

    # Scrape URL link of every Restuarant
    htmlContent = browser.page_source
    soup = BeautifulSoup(htmlContent, 'html.parser')

    # Find the div with data-testid='search-results-list'
    resultsDiv = soup.find('div', {'data-testid': 'search-results-list'})

    # Find all <a> tags with class='restaurant-name' within the div
    restaurantURL = resultsDiv.find_all('a', {'class': 'restaurant-name'})

    # Loop through each <a> tag to get href and text
    restaurantURLTotal = []
    for link in restaurantURL:
        href = link.get('href')
        newLink = 'https://www.grubhub.com'
        newLink += href
        restaurantURLTotal.append(newLink)
    return restaurantURLTotal


def findToppings(teaToppingsKW, teaToppings, item, browser):
    found = False
    # click on item to see available toppings
    button = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-testid="restaurant-menu-item-button"]')))
    time.sleep(2)
    button.click()
    time.sleep(2)

    # Parse text in HTML element
    innerHTML = browser.page_source
    soup = BeautifulSoup(innerHTML, 'html.parser')

    # TODO
    # Handle both types of pop up menus

    try:
        # Scan each element's text in popup for toppings
        drinkOptions = soup.find_all('span', class_='menuItemModal-choice-option-description')
        for options in drinkOptions:
            result = scanToppings(cleanName(options.text.strip()), teaToppings, teaToppingsKW)
            if not found:
                found = result
        if teaToppings:
            print("Toppings Found: ")
            print(teaToppings)
        else:
            print("No toppings found")
        found = True

    except:
        print("Toppings couldnt be scraped")

    # Close pop up
    try:
        button = WebDriverWait(browser, 3).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-testid="close-add-item-modal"]')))
        button.click()
    except:
        # Find the button element by its data-testid attribute
        button = WebDriverWait(browser, 3).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-testid="emi-header-backButton"]')))
        button.click()
    return found


def main():
    # Generate url links of nearby restaurants
    nearByRestaurants = getNearByRestaurants(input('Enter Location: '))
    print(f'Gathering data from {len(nearByRestaurants)} restaurants')

    # Process nearby Restuarant's Data
    for restaurant in nearByRestaurants:

        # scrape data from each URL
        bobaDrinks = get_menu(restaurant)

        # insert data collected into MongoDB if menu and tea found
        if bobaDrinks:
            uploadMongoDB(bobaDrinks)


if __name__ == '__main__':
    main()
