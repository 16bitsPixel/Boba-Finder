from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import pymongo
from geopy.geocoders import Nominatim


class Scraper:

    def scrapeMenu(self, url):

        # Scrape tea and topping options from restaurant's menu found at given URL

        # Initialize Chrome Webdriver instance
        browser = webdriver.Chrome(options=self.initializeChromeOptions())

        # Navigate to specific URL
        browser.get(url)
        time.sleep(3)

        # Parse text in HTML element
        soup = BeautifulSoup(browser.page_source, 'html.parser')

        # Check if menu found
        rName = soup.find('h1', {'data-testid': 'restaurant-nameHeader'}).text
        if not self.checkMenuExists(soup, rName):
            return 0

        # Click Pickup Option if available
        try:
            pickup_option = WebDriverWait(browser, 3).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'label[for="PICKUP"]')))
            pickup_option.click()
        except:
            pass
        time.sleep(2)

        # Check if Closed at this time:
        try:
            button = WebDriverWait(browser, 2).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-testid="close-cart-edit-modal"]'))
            )
            button.click()
            button = WebDriverWait(browser, 2).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-testid="close-cart-edit-modal"]'))
            )
            button.click()
            time.sleep(2)
        except:
            pass

        previous_height = browser.execute_script('return window.pageYOffset;')
        body = browser.find_element(By.TAG_NAME, 'body')
        body.click()

        menuItems = []
        entry = {}

        # Extract Name
        entry['restaurantName'] = rName

        # Extract Address
        self.getAddress(soup, entry)

        # Scan menu items for key TeaBase and TeaToppings words
        # Load Tea Flavors & Toppings
        teaFlavorsKW = self.loadKeyWordsFromTextFile('../res/tea.txt')
        teaToppingsKW = self.loadKeyWordsFromTextFile('../res/toppings.txt')

        teaFlavors = []
        teaToppings = []

        foundToppings = False
        while True:
            for item in soup.select('.menuItem'):

                # Check drink Name for KeyWords
                drinkName = self.removeNonAlphaChars(str(item.select_one('h6').get_text()))
                if (self.findAnyKeyWords(drinkName, teaFlavors, teaToppings, teaFlavorsKW, teaToppingsKW) > 1
                        and (not foundToppings)):

                    # If keywords found, click item to view and extract toppings (only done once per restaurant)
                    foundToppings = self.findToppings(teaToppingsKW, teaToppings, item, browser)
                    time.sleep(2)

                # Check drink description for KeyWords
                desc = self.extractDescriptionFromHMTML(str(item.select_one('span[data-testid="menu-item-description"]')))
                if len(desc) > 0:
                    self.findAnyKeyWords(desc, teaFlavors, teaToppings, teaFlavorsKW, teaToppingsKW)

            body.send_keys(Keys.PAGE_DOWN)
            time.sleep(1)
            new_height = browser.execute_script('return window.pageYOffset;')
            if new_height == previous_height:
                break
            previous_height = new_height

            # update html
            innerHTML = browser.page_source
            soup = BeautifulSoup(innerHTML, 'html.parser')

        if (not teaFlavors) or ('boba' not in teaToppings and 'pearl' not in teaToppings):
            print("Tea and Boba not sold at this restaurant")
            return 0

        print(f"Tea Found:\n{teaFlavors}")
        print(f"Toppings Found:\n{teaToppings}")
        entry['teaBases'] = list(set(teaFlavors))
        entry['teaToppings'] = list(set(teaToppings))
        menuItems.append(entry)
        print("[FINISHED SCRAPING]")

        # Generate Coordinates
        coordinates = self.generateCoordinates(entry['address'])
        if coordinates:
            entry['lattitude'] = coordinates[0]
            entry['longitude'] = coordinates[1]
        else:
            print("Could not generate coordinates")

        return menuItems

    def initializeChromeOptions(self):

        # Initialize chrome options for selenium webdriver
        chrome_options = Options()
        chrome_options.add_argument("start-maximized")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        chrome_options.add_argument('--disable-blink-features=AutomationControlled')
        return chrome_options

    def checkMenuExists(self, soup, rName):

        # Check and see if menu of restaurant can be scraped
        print(f"Looking for menu of {rName}")
        menu = soup.find("div", {"data-testid": "menu-sections-container"})
        if menu is None:
            print('[MENU FAIL]')
            return 0
        else:
            print('[FOUND MENU]')
            return 1

    def removeNonAlphaChars(self, rawText):

        # Removes redundant whitespace, numbers and other non-alpha characters
        cleanText = ''
        for char in rawText:
            if char.isalpha() or char == ' ':
                cleanText += char
        if len(cleanText) == 0:
            return ''
        if cleanText[0] == ' ':
            cleanText = cleanText[1:]
        if cleanText[1] == ' ':
            cleanText = cleanText[2:]
        return cleanText

    def extractDescriptionFromHMTML(self, desc):

        # Extracts and returns description text from HTML Element containing it
        desc = desc.replace(
            '<span class="sc-dkrFOg qpMvb menuItemNew-description--truncate-3" color="#6B6B83" '
            'data-testid="menu-item-description">',
            "")
        desc = desc.replace("</span>", "")
        return desc

    def loadKeyWordsFromTextFile(self, path):

        # Loads keywords from text file into hash set and returns it
        f = open(path, mode='r+')
        line = f.readline()
        text = set()
        while line:
            line = line.rstrip()
            text.add(line.lower())
            line = f.readline()
        f.close()
        return text

    def findAnyKeyWords(self, text, teaFlavors, teaToppings, teaFlavorsKW, teaToppingsKW):

        # Scans given text (drink name or description) and returns all tea or topping keywords found
        found = 0
        if not text:
            return 0
        text = text.lower()
        text = text.split(' ')
        for i, n in enumerate(text):
            if n == 'tea':
                found += 1
            if n in teaFlavorsKW:
                if n not in teaFlavors:
                    found += 1
                    teaFlavors.append(n)
            if n in teaToppingsKW:
                if n not in teaToppings:
                    teaToppings.append(n)
            # capture 2 word kw
            if i < len(text) - 1:
                currPlusNext = f'{n} {text[i + 1]}'
                if currPlusNext in teaFlavorsKW:
                    if currPlusNext not in teaFlavors:
                        found += 1
                        teaFlavors.append(currPlusNext)
                if currPlusNext in teaToppingsKW:
                    if currPlusNext not in teaToppings:
                        teaToppings.append(currPlusNext)
            # capture 3 word kw
            if i < len(text) - 2:
                currPlusNext = f'{n} {text[i + 1]} {text[i + 2]}'
                if currPlusNext in teaFlavorsKW:
                    if currPlusNext not in teaFlavors:
                        found += 1
                        teaFlavors.append(currPlusNext)
                if currPlusNext in teaToppingsKW:
                    if currPlusNext not in teaToppings:
                        teaToppings.append(currPlusNext)
        return found

    def findToppingKeyWords(self, text, teaToppings, teaToppingsKW):

        # Scans text for matching topping keywords and returns any found
        found = False
        if not text:
            return 0
        text = text.lower()
        text = text.split(' ')
        for i, n in enumerate(text):
            if n in teaToppingsKW:
                if n not in teaToppings:
                    teaToppings.append(n)
                    found = True
            if i < len(text) - 1:
                currPlusNext = f'{n} {text[i + 1]}'
                if currPlusNext in teaToppingsKW:
                    if currPlusNext not in teaToppings:
                        teaToppings.append(currPlusNext)
                        found = True
        return found

    def uploadMongoDB(self, entry):

        # Uploads an entry into Mongo Database found at set connection string

        # test db:
        # mongodb+srv://vcasanov:i3DFbeGAHi05CWA0@test.i44ykno.mongodb.net/?retryWrites=true&w=majority
        #
        # production db:
        # mongodb+srv://brandonllanes16:XIPZsFqtcLYtkQ4l@bobacluster.atdxi6u.mongodb.net/?retryWrites=true&w=majority
        client = pymongo.MongoClient(
            "mongodb+srv://vcasanov:i3DFbeGAHi05CWA0@test.i44ykno.mongodb.net/?retryWrites=true&w=majority")
        db = client.db.BobaShops
        try:
            db.insert_many(entry)
            print(f'Inserted {len(entry)} entries')
        except Exception as e:
            print(f"Error during insertion: \n{e}")
            print("\nNothing was stored to db")

    def getNearByRestaurants(self, cityName):

        # Find all boba restaurants in and around a city

        # Initialize Chrome Webdriver instance
        browser = webdriver.Chrome(options=self.initializeChromeOptions())

        # Navigate to specific URL
        browser.get('https://www.grubhub.com/')
        time.sleep(1)

        # Type location into textbox
        text_box = browser.find_element(By.XPATH, "//input[@aria-label='Search Address']")
        text_box.send_keys(cityName)
        button = WebDriverWait(browser, 3).until(
            EC.element_to_be_clickable((By.XPATH, "//button[@data-testid='start-order-search-btn']")))

        button.click()

        # Look for restaurants that sell boba nearby
        time.sleep(3)
        input_field = WebDriverWait(browser, 10).until(
            EC.visibility_of_element_located((By.ID, "search-autocomplete-input")))
        input_field.send_keys("Boba")
        input_field.send_keys(Keys.ENTER)

        time.sleep(3)

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

    def findToppings(self, teaToppingsKW, teaToppings, item, browser):
        found = False

        # parse item div for unique identifier
        soup = BeautifulSoup(str(item), 'html.parser')
        specific_div = soup.find('div', class_='menuItem')
        data_test_id = specific_div.get('data-testid')
        cssSelector = f'div[data-testid="{data_test_id}"] button[data-testid="restaurant-menu-item-button"]'
        time.sleep(1)
        # click on item to see available toppings or try a different one
        try:
            button = WebDriverWait(browser, 3).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, cssSelector)))
            button.click()
        except:
            return found
        time.sleep(2)

        # Parse text in HTML element
        soup = BeautifulSoup(browser.page_source, 'html.parser')
        found = True
        try:

            # Menu type 1
            exitButton = WebDriverWait(browser, 3).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-testid="close-add-item-modal"]')))
            drinkOptions = soup.find_all('span', class_='menuItemModal-choice-option-description')
            for options in drinkOptions:
                result = self.findToppingKeyWords(self.removeNonAlphaChars(options.text.strip()), teaToppings, teaToppingsKW)
                if not found:
                    found = result
            exitButton.click()
            print("Menu type 1")

        except:

            # Menu type 2
            print("Menu type 2")
            try:

                # Find additional toppings element
                element = WebDriverWait(browser, 10).until(
                    EC.element_to_be_clickable(
                        (
                            By.XPATH,
                            "//h5[text()='Add Toppings' or text()='Add-Ons' or text()='Add-ons' or text()='Toppings' or text()='DRINKS ADD-ONS:' or text()='Additional Toppings' or text()='Topping' or text()='Add toppings']"
                        )
                    )
                )

                # Open toppings menu
                element.click()
                time.sleep(3)
                soup = BeautifulSoup(browser.page_source, 'html.parser')
                drinkOptions = soup.find_all('span', {'class': 'u-stack-x-3'})
                if drinkOptions:
                    for options in drinkOptions:
                        result = self.findToppingKeyWords(self.removeNonAlphaChars(options.text.strip()), teaToppings, teaToppingsKW)
                        if not found:
                            found = result
                else:
                    soup = BeautifulSoup(browser.page_source, 'html.parser')
                    drinkOptions = soup.find_all('div', class_='emi-list-cell')
                    for options in drinkOptions:
                        result = self.findToppingKeyWords(self.removeNonAlphaChars(options.text.strip()), teaToppings, teaToppingsKW)
                        if not found:
                            found = result

                # Close Toppings Menu
                element.click()
            except:
                print("Toppings couldn't be scraped")

            # Close Drink item pop up
            exitButton = WebDriverWait(browser, 6).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-testid="emi-header-backButton"]')))
            exitButton.click()
        return found

    def getAddress(self, soup, entry):
        for div in soup.find_all('a', {'class': 'sc-hBxehG flfcph'}):
            link_text = div['href']
            if "http" in link_text:
                entry['gMapsLink'] = self.extractGmapLink(link_text)
                link_parts = link_text.partition("daddr=")
                entry['address'] = link_parts[2]
                break

    def extractGmapLink(self, link):
        newLink = 'http://maps.google.com/maps/place/'
        index = link.rfind('daddr=')
        newLink += link[index + 6:]
        return newLink

    def generateCoordinates(self, address):
        # Generate coordinates from address
        geolocator = Nominatim(user_agent="boba-finder")
        location = geolocator.geocode(address)
        if location:
            coordinates = [location.latitude, location.longitude]
            return coordinates
        else:
            return []
