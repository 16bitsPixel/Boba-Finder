# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class MongodbBobaCrawlerItem(scrapy.Item):
    tea = scrapy.Field()
    restaurant = scrapy.Field()
