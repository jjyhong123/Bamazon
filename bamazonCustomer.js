var mysql = require('mysql');
var inquirer = require('inquirer');
require("dotenv").config();

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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {

    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error;
        printTable(response);
        ask(response);

    });
};

function printTable(table) {
    console.log("\nStore Inventory:\n------------------------");
    for (var i = 0; i < table.length; i++) {
        console.log("Product ID: " + table[i].item_id + " || Product name: " + table[i].product_name + " || Price: $" + table[i].price);
    }
    console.log("------------------------\n");
}

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
        var selectedId = parseInt(answers.ID);
        var selectedQuantity = parseInt(answers.quantity);
        var selectedIndex = selectedId - 1;
        var quantityAvailable = response[selectedIndex].stock_quantity;

        if (selectedQuantity <= quantityAvailable) {
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: quantityAvailable - selectedQuantity
                    },
                    {
                        item_id: selectedId
                    }
                ],
                function (err) {
                    if (err) throw err;
                }
            )
            var total = selectedQuantity * response[selectedIndex].price;
            console.log("\nYour $" + total + " transanction was completed successfully.\n");

            connection.query("SELECT * FROM products", function (error, response) {
                if (error) throw error;
                ask(response);
            });

        }
        else {
            console.log("\nInsufficient quantity!\n");
            ask(response);
        }

    });
};