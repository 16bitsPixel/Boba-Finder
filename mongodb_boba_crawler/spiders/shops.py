import scrapy
from ..items import MongodbBobaCrawlerItem

class ShopsSpider(scrapy.Spider):
    name = "shops"
    allowed_domains = ["allmenus.com"]
    start_urls = ["https://www.allmenus.com/ca/san-francisco/-/teahouses/"]

    # Load Tea Flavors
    f = open('tea.txt', mode='r+')

    line = f.readline()

    teaFlavors = set()
    while line:
        line = line.rstrip()
        teaFlavors.add(line.lower())
        line = f.readline() 

    def parse(self, response):
        # Follow each resaturant link on page to view
        for a in response.css('ul.restaurant-list a'):
            yield response.follow(a, callback=self.process)
    
    def process(self, response):

        # Scan all text to see if tea/boba is sold there

            # Use an XPath selector to extract all the text from the webpage
        text = response.xpath('//text()').extract()

            # Combine the extracted text into a single string
        text = ' '.join(text)

        teaSoldHere = False
        for word in text:
            if word.lower() == 'tea' or word.lower() == 'boba' or word.lower() == 'tapioca':
                teaSoldHere = True
        
        if teaSoldHere == False:
            yield None
        
        # Parse each menu item div
        item = MongodbBobaCrawlerItem()

        # Caputure Restaurant name and Address
        item['name'] = response.css('div.menu-header span::text').get()
        item['address'] = response.css('div.right-content.pull-right ul.info-list li a::text').get()

        # capture menu item name
        for menuItem in response.css('li.menu-items'):
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

            item['menuItem'] = teaClean
            
            # add what flavors item has
            teaClean = teaClean.split(" ")
            flavors = []

            # check menu name
            for i in teaClean:
                if i.lower() in self.teaFlavors:
                    flavors.append(i)   
            # check menu description
            description = menuItem.css('p.description::text').get()
            if description:
                description = description.split(" ")
                for i in description:
                    if i.lower() in self.teaFlavors:
                        if i.lower() not in flavors:
                            flavors.append(i)
            item['teaFlavors'] = flavors


            yield item        