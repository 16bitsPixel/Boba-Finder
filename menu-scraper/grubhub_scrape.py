import time
from scraper import Scraper


def main():
    grubHubScraper = Scraper()

    # Generate url links of nearby restaurants
    nearByRestaurants = grubHubScraper.getNearByRestaurants(input('Enter City Name: '))
    print(f'Gathering data from {len(nearByRestaurants)} restaurants')

    # Process nearby Restaurant's Data
    currRestaurantCount = 0
    start = time.time()
    for restaurantUrl in nearByRestaurants:
        currRestaurantCount += 1
        print(f"\n[{currRestaurantCount}/{len(nearByRestaurants)}]", end=" Minutes Elapsed: ")
        print(round((time.time() - start) / 60, 2))

        # scrape data from each URL
        try:
            bobaDrinks = grubHubScraper.scrapeMenu(restaurantUrl)
            if not bobaDrinks:
                print(f"Restaurant: {restaurantUrl}\n not scraped")
            else:
                grubHubScraper.uploadMongoDB(bobaDrinks)
        except:
            print(f"Restaurant not stored: {restaurantUrl}\n.")


if __name__ == '__main__':
    main()
