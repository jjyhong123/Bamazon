# Bamazon

## Configuration/installation instructions
To get this application to work properly, the user must install the dependencies listed out in the package.json (i.e., mysql, inquirer, and dotenv). The user must also supply their own .env file containing the password required to connect to bamazon.sql on their local machine.

## Bamazon.sql
A *products* table was created and initialized with 10 items. 

## bamazonCustomer.js 
### Overview
Running this application displays the ids, names, and prices of all the items for sale in the *products* table. The user is then immediately prompted to enter the ID and quantity of the product they would like to buy. If there is enough of the item in stock to meet the user's desired quantity, the application will proceed with the order, updating the SQL database and displaying the total cost of the purchase. It then re-prompts the user to make another purchase.

### Demo
Screenshot of *products* table before purchase:
https://drive.google.com/file/d/17ssK-vm-QuPyRUV-BQLTcsE3O5FmKAcC/view?usp=sharing

Demo (a purchase of two guitars and a declined purchase attempt of 1000 Macbooks):
https://drive.google.com/file/d/133DJc7hZPkqjhr3SIsRob8f1ANknIvES/view?usp=sharing

Screenshot of *products* table after purchase (note the guitar inventory has decreased by two units): 
https://drive.google.com/file/d/1ZAm1VcTH2zMxop6D-497R-fJzgM7IEDE/view?usp=sharing

## bamazonManager.js
### Overview
Running this application displays a list of available actions: 
    * View products for sale
        * Lists the id, name, department, price, and quantity of each item in the *products* table.  
    * View low inventory
        * Lists all items with an inventory count lower than 5. If there are no such items, the application will notify the user that there are no items in low stock.
    * Add to inventory
        * Prompts the user to select by name the item they would like to restock and specify how many units to add to this item's inventory. 
    * Add new product
        * Prompts the user to enter the name, department, price, and quantity of a new item.

Upon completing one of the actions above, the application will prompt the user to perform another action. 

### Demo
Demo (with no items in low stock):
https://drive.google.com/file/d/1BNuvqH9jbAGhci3OVXd0WOx-sMnwY35E/view?usp=sharing

Demo (with an item in low stock): 
https://drive.google.com/file/d/1r5TPovpcrYpSJ5BBteET4lKEeVMuQutf/view?usp=sharing