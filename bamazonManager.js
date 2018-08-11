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
    console.log("connected as id " + connection.threadId + "\n");
    ask();
});

function ask() {
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View products for sale",
                "View low inventory",
                "Add to inventory",
                "Add new product"
            ]

        }
    ).then(function (answer) {
        switch (answer.action) {
            case "View products for sale":
                viewProducts();
                break;

            case "View low inventory":
                viewLowInventory();
                break;

            case "Add to inventory":
                addInventory();
                break;

            case "Add new product":
                addProduct();
                break;
        }

    });
};

function viewProducts() {
    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error;
        console.log("\nStore Inventory:\n------------------------");
        for (var i = 0; i < response.length; i++) {
            console.log("Product ID: " + response[i].item_id + " || Product name: " + response[i].product_name + " || Department: " + response[i].department_name + " || Price: $" + response[i].price + " || Stock quantity: " + response[i].stock_quantity);
        }
        console.log("------------------------\n");
        ask();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (error, response) {
        if (error) throw error;

        if (response.length === 0) {
            console.log("\nThere are no items in low stock!\n");
        }
        else {
            console.log("\nStore Inventory:\n------------------------");
            for (var i = 0; i < response.length; i++) {
                if (response[i].stock_quantity < 5) {
                    console.log("Product ID: " + response[i].item_id + " || Product name: " + response[i].product_name + " || Department: " + response[i].department_name + " || Price: $" + response[i].price + " || Stock quantity: " + response[i].stock_quantity);
                }
            }
            console.log("------------------------\n");
        }
        ask();
    });
}

function addInventory() {
    connection.query("SELECT product_name, stock_quantity FROM products", function (error, response) {
        if (error) throw error;
        console.log("\n");
        inquirer.prompt([
            {
                name: "choice",
                type: "list",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < response.length; i++) {
                        choiceArray.push(response[i].product_name);
                    }
                    return choiceArray;
                },
                message: "Which item would you like to restock?"
            },
            {
                name: "additional_amount",
                type: "input",
                message: "How much would you like to add to this item's inventory?"
            }
        ]).then(function (answer) {
            var chosenIndex;
            for (var i = 0; i < response.length; i++) {
                if (response[i].product_name === answer.choice) {
                    chosenIndex = i;
                }
            }
            var selectedId = chosenIndex + 1;
            connection.query(
                "UPDATE products SET ? where ?",
                [
                    {
                        stock_quantity: response[chosenIndex].stock_quantity + parseInt(answer.additional_amount)
                    },
                    {
                        product_name: answer.choice
                    }
                ],
                function (error) {
                    if (error) throw error;
                    console.log("\nItem successfully restocked!\n");
                    ask();
                }
            )
        });
    })
};

function addProduct() {
        inquirer.prompt([
            {
                name: "product_name",
                type: "input",
                message: "What item would you like to add?"
            },
            {
                name: "department_name",
                type: "input",
                message: "What department does the item fall under?"
            },
            {
                name: "price",
                type: "input",
                message: "How much will the item sell for, in dollars? (Omit the dollar sign):",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "How many items of this product will you stock?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?",
                    {
                        product_name: answer.product_name,
                        department_name: answer.department_name,
                        price: answer.price,
                        stock_quantity: answer.stock_quantity,
                    }
                ,
                function (error) {
                    if (error) throw error;
                    console.log("\nItem successfully added!\n");
                    ask();
                }
            )
        });
};