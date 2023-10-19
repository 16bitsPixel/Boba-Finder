import scrapy
from ..items import MongodbBobaCrawlerItem

class ShopsSpider(scrapy.Spider):
    name = "shops"
    allowed_domains = ["www.grubhub.com"]
    start_urls = ["https://www.grubhub.com/search?orderMethod=delivery&locationMode=DELIVERY&facetSet=umamiV6&pageSize=36&hideHateos=true&searchMetrics=true&queryText=boba&latitude=37.33866119&longitude=-121.88510895&preciseLocation=true&geohash=9q9k6mmcrngt&includeOffers=true&sortSetId=umamiv3&sponsoredSize=3&countOmittingTimes=true&tab=all"]

    def parse(self, response):
        # Parse each quote div 
        for quote in response.css('div.quote'):
            item = MongodbBobaCrawlerItem()

            item['author'] = quote.css('small.author::text').get()
            item['text'] = quote.css('span.text::text').re(r'“(.+)”')[0]
            item['tags'] = quote.css('div.tags a.tag::text').getall()

            yield item

        # Find the "Next ->" button and follow the link
        for a in response.css('ul.pager a'):
            yield response.follow(a, callback=self.parse)
