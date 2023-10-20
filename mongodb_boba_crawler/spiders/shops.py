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
            # capture menu item name
            teaRaw = menuItem.css('span.item-title::text').get()

            # clean input string (remove non-alpha characters)
            teaClean = ''
            for char in teaRaw:
                if char.isalpha() or char == ' ':
                    teaClean += char
            # removing leading blank space
            if teaClean[0] == ' ':
                teaClean = teaClean[1:]
            
            # remove initial lone letter ex: "P <tea>" (residual from formatting)
            if teaClean[1] == ' ':
                teaClean = teaClean[2:]

            item['tea'] = teaClean
            yield item

        # Follow each resaturant link on page to view
        for a in response.css('ul.restaurant-list a'):
            yield response.follow(a, callback=self.parse)
