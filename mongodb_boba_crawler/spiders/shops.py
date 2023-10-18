import scrapy
from ..items import MongodbBobaCrawlerItem

class ShopsSpider(scrapy.Spider):
    name = "shops"
    allowed_domains = ["quotes.toscrape.com"]
    start_urls = ["https://quotes.toscrape.com/"]

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
