// Incorporate npm packages
var mysql = require('mysql');
var inquirer = require('inquirer');
require("dotenv").config();

// Connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.PASSWORD,
    database: "bamazon_db"
});

// Connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // Run the start function after the connection is made to prompt the user
    start();
});

// Print and prompt
function start() {
    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error;
        // Initialize the application by printing the available items
        printTable(response);
        // Prompt the user
        ask(response);

    });
};

// Print the products table
function printTable(table) {
    console.log("\nStore Inventory:\n------------------------");
    for (var i = 0; i < table.length; i++) {
        console.log("Product ID: " + table[i].item_id + " || Product name: " + table[i].product_name + " || Price: $" + table[i].price);
    }
    console.log("------------------------\n");
}

// Prompt the user for the identity and quantity of the item they would like to purchase
function ask(response) {
    inquirer.prompt([
        {
            name: "ID",
            message: "What is the ID of the product you would like to purchase?",
            validate: function (value) {
                if (parseInt(value) > 0 && parseInt(value) <= response.length) {
                    return true;
                }
                return false;
            }
        }, {
            name: "quantity",
            message: "How many units of this product would you like to purchase?"
        }
    ]).then(function (answers) {
        // Variables to store user input as integers
        var desiredId = parseInt(answers.ID);
        var desiredQuantity = parseInt(answers.quantity);
        // Semantic variables to condense the code that follows and make it easier to follow
        var desiredIndex = desiredId - 1;
        var quantityAvailable = response[desiredIndex].stock_quantity;

        // If there is enough of the item in stock to meet the quantity desired by user
        if (desiredQuantity <= quantityAvailable) {
            // Update the inventory
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: quantityAvailable - desiredQuantity
                    },
                    {
                        item_id: desiredId
                    }
                ],
                function (err) {
                    if (err) throw err;
                }
            )
            // Display total cost of transaction
            var total = desiredQuantity * response[desiredIndex].price;
            console.log("\nYour $" + total + " transanction was completed successfully.\n");

            // Since ask() requires the database table as a parameter, we get the most recent version of the table and feed it in
            connection.query("SELECT * FROM products", function (error, response) {
                if (error) throw error;
                // Re-prompt the user to make another purchase
                ask(response);
            });

        }
        else {
            console.log("\nInsufficient quantity!\n");
            // Re-prompt the user to make another purchase
            ask(response);
        }

    });
};