var mysql = require("mysql");
var inquirer = require("inquirer");

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
        console.log(results);
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
        // Once the customer has placed the order, your application should check if 
        // your store has enough of the product to meet the customer's request.
        .then(function(answer) {
            console.log(answer.selectProduct); 
            console.log(answer.selectQuantity);
            console.log(results[answer.selectProduct - 1].stock_quantity);
        });
    });
}

// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.











// If not, the app should log a phrase like Insufficient quantity!, 
// and then prevent the order from going through.



// However, if your store does have enough of the product, 
// you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.