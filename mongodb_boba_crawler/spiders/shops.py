import scrapy
from ..items import MongodbBobaCrawlerItem

class ShopsSpider(scrapy.Spider):
    name = "shops"
    allowed_domains = ["allmenus.com"]
    start_urls = ["https://www.allmenus.com/ca/san-francisco/-/teahouses/"]

    def parse(self, response):
        # Parse each quote div 
        for menuItem in response.css('div.h6.item-main'):
            item = MongodbBobaCrawlerItem()
            item['tea'] = menuItem.css('span.item-title::text').get()
            
            #item['author'] = quote.css('small.author::text').get()
            #item['text'] = quote.css('span.text::text').re(r'“(.+)”')[0]
            #item['tags'] = quote.css('div.tags a.tag::text').getall()
            
            yield item

        # Follow each resaturant link on page to view
        for a in response.css('ul.restaurant-list a'):
            yield response.follow(a, callback=self.parse)
