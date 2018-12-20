var mysql = require("mysql");
var inquirer = require("inquirer");

var productStock;
var chosenProduct;
var chosenQuantity;
var chosenProductPrice;

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Duckies4$",
  database: "bamazon"
});

//connect to mySQL DB
connection.connect(function(err) {
    if (err) throw err;
    start();
});

// Running this Node application will first display all of the items available for sale.
//Include the ids, names, and prices of products for sale. 

function start() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
        if (err) throw err;
        console.log(JSON.parse(JSON.stringify(results)));
        inquirer
        .prompt([
            {
                name: "selectProduct",
                type: "input", 
                message: "What would you like to buy? Provide iten ID#:"
            },
            {
                name: "selectQuantity",
                type: "input", 
                message: "How many units of product would you like to buy?"
            }
        ])
        // Once the customer has placed the order, check if store has enough of the product to meet the customer's request.
        .then(function(answer) {
            productStock = results[answer.selectProduct - 1].stock_quantity;
            chosenProduct = answer.selectProduct;
            chosenQuantity = answer.selectQuantity;
            chosenProductPrice = results[answer.selectProduct - 1].price;
            // Enough product - fulfill the customer's order.
            if (answer.selectQuantity <= productStock) {
                // Update the SQL database to reflect the remaining quantity.
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: productStock - chosenQuantity
                        },
                        {
                            item_id: chosenProduct
                        }
                    ],
                    function(err) {
                        if (err) throw err;
                        console.log("Success! Your purchase cost totals " + (chosenProductPrice * chosenQuantity));
                    }    
                );
            }
            //if not, logs Insufficient quantity and order does not go through
            else {
                console.log("Insufficient quantity!")
                start();
            }
        });
    });
}


