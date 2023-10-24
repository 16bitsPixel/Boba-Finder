#### This program scrapes naukri.com's page and gives our result as a  
#### list of all the job_profiles which are currently present there.  
  
import requests 
from bs4 import BeautifulSoup 
from selenium import webdriver 
from selenium.webdriver.common.keys import Keys 
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
import time 
  
#url of the page we want to scrape 
url = "https://www.grubhub.com/restaurant/sharetea-2855-stevens-creek-blvd-santa-clara/547478"

# create service object
edgeService = Service(
    r"C:\\Users\\xbran\\repos\Boba-Finder\\res\\edgedriver_win64\\msedgedriver.exe")

options = Options()
options.add_argument("start-maximized")
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option('excludeSwitches', ['enable-logging'])
options.add_experimental_option('useAutomationExtension', False)
options.add_argument('--disable-blink-features=AutomationControlled')

# initiating the webdriver. Parameter includes the path of the webdriver. 
driver = webdriver.Edge(service=edgeService, options=options)  
driver.get(url)  
  
# this is just to ensure that the page is loaded 
time.sleep(5)  
  
html = driver.page_source 
  
# this renders the JS code and stores all 
# of the information in static HTML code. 
  
# Now, we could simply apply bs4 to html variable 
soup = BeautifulSoup(html, "html.parser") 
for item in soup.select(".menuItem"):
    print(item.select_one("h6").get_text())