import time
from scraper import Scraper


def main():
    newScraper = Scraper()

    # Generate url links of nearby restaurants
    nearByRestaurants = newScraper.getNearByRestaurants(input('Enter City Name: '))
    print(f'Gathering data from {len(nearByRestaurants)} restaurants')

    # Process nearby Restaurant's Data
    currRestaurantCount = 0
    start = time.time()
    for restaurant in nearByRestaurants:
        currRestaurantCount += 1
        print(f"\n[{currRestaurantCount}/{len(nearByRestaurants)}]", end=" Minutes Elapsed: ")
        print(round((time.time() - start) / 60, 2))

        # scrape data from each URL
        try:
            bobaDrinks = newScraper.scrapeMenu(restaurant)
            if bobaDrinks:
                newScraper.uploadMongoDB(bobaDrinks)
        except:
            print(f"Restaurant: {restaurant}\n could not be scraped or stored to database")


if __name__ == '__main__':
    main()
