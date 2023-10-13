# The Idea
The aim of this project is to create a web and/or mobile app that locates nearby restaurant locations that serve the user's created drink. Think of the Starbucks app or Yelp app: you select a store location first, look at the menu, and then order your drink. In this proposed project, we are reversing the process. Instead, the user will create their desired drink first and given drink information will be collected to be used to find nearby stores that sell that boba drink.

# App Flow
Here is a general overview of how the app would work:  

1. A user creates a drink on the app w/ a GUI updating what the drink looks like/contains  
    - Can also have a section to save a user's favorite drink(s) information
2. The drink details form is submitted and used to search in a database for a shop that can serve the specified drink
    - Will need to web scrape this data from Yelp
3. The closest stores (that can provide the drink) nearby the user's given location are detailed in a list
    - We can also have options to sort by rating
4. User can pick any of these and get directions
    - Link to google maps

# The Outline
With this project, three objectives will need to be accomplished:  

1. Web Scraper
    - The idea is to scrape drink menu information from posted menus online (Idea is take from Yelp at the moment)
2. Database
    - Store the drink menu information from the created web scraper to allow searches
3. Front-end App Design
    - Make the app look pretty! This is where users will create the drink and then find nearby store locations
