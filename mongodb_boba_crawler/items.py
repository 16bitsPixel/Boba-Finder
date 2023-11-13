# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class MongodbBobaCrawlerItem(scrapy.Item):
    # Tea Flavors found at this restaurant
    teaFlavors = scrapy.Field()
    # Toppings found at this restaurant
    toppings = scrapy.Field()
    # Name of Restaraunt
    name = scrapy.Field()
    # Address of Restaraunt
    address = scrapy.Field()
