import scrapy
from ..items import MongodbBobaCrawlerItem

class ShopsSpider(scrapy.Spider):
    name = "shops"
    allowed_domains = ["www.grubhub.com"]
    start_urls = ["https://www.grubhub.com/search?orderMethod=delivery&locationMode=DELIVERY&facetSet=umamiV6&pageSize=36&hideHateos=true&searchMetrics=true&queryText=boba&latitude=37.33866119&longitude=-121.88510895&preciseLocation=true&geohash=9q9k6mmcrngt&includeOffers=true&sortSetId=umamiv3&sponsoredSize=3&countOmittingTimes=true&tab=all"]

    def parse(self, response):
        # get links from main page and follow them to individual store page
        store_page_links = response.css("a.restaurant-name")
        yield from response.follow_all(store_page_links, self.parse_menu)
    
    def parse_menu(self, response):
        # parse each menuItem
        for menuItem in response.css("div.menuItem"):
            item = MongodbBobaCrawlerItem()

            # scrape all drinkNames w/ class "menuItemNew-name"
            item['drinkName'] = menuItem.css("h6::text").get()

            yield item
