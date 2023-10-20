import scrapy
from ..items import MongodbBobaCrawlerItem

class ShopsSpider(scrapy.Spider):
    name = "shops"
    allowed_domains = ["allmenus.com"]
    start_urls = ["https://www.allmenus.com/ca/san-francisco/-/teahouses/"]

    def parse(self, response):
        # Parse each menu item div
        item = MongodbBobaCrawlerItem()
        # Caputure Restaurant name and Address
        item['name'] = response.css('div.menu-header span::text').get()
        item['address'] = response.css('div.right-content.pull-right ul.info-list li a::text').get()
        
        for menuItem in response.css('div.h6.item-main'):
            item['tea'] = menuItem.css('span.item-title::text').get()
            
            #item['author'] = quote.css('small.author::text').get()
            #item['text'] = quote.css('span.text::text').re(r'“(.+)”')[0]
            #item['tags'] = quote.css('div.tags a.tag::text').getall()
            
            yield item

        # Follow each resaturant link on page to view
        for a in response.css('ul.restaurant-list a'):
            yield response.follow(a, callback=self.parse)
