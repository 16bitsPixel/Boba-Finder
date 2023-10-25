# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class MongodbBobaCrawlerItem(scrapy.Item):
    menuItem = scrapy.Field()
    teaFlavors = scrapy.Field()
    topping = scrapy.Field()
    name = scrapy.Field()
    address = scrapy.Field()
