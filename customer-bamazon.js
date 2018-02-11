//Global declarations and Dependencies
  const inquirer = require('inquirer')
  const mysql = require('mysql');

//Estbalishing a connection to the mySQL database
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "qwerty",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    // console.log('\nYou are connected to the Bamazon database');
    console.log('\n------------------------------------------------------------------------------');
    console.log('Welcome to Bamazon — your one stop shop for all things weird and wonderful.');
    console.log('------------------------------------------------------------------------------\n');
    customerStart();
  });

function customerStart() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What would you like to buy today?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        let itemName = chosenItem.product_name,
            buyQuantity = answer.quantity,
            itemStock = parseInt(chosenItem.quantity),
            newStock = itemStock - buyQuantity,
            itemPrice = chosenItem.price,
            total = buyQuantity * itemPrice;

        // console.log("Items in stock: " + itemStock);
        // console.log("Item Id: " + chosenItem.item_id);

        if (itemStock > buyQuantity || newStock == 0 ) {

          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                quantity: newStock
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;

              if (buyQuantity > 1) {
                console.log("Thanks for your purchase of " + buyQuantity + " " + itemName + "s.");
              } else {
                console.log("Thanks for your purchasing " + buyQuantity + " " + itemName + ".");
              }

              console.log("Your total today is $" + total + ".");
              continueShopping();

            }
          );
        }
        else {
          if (itemStock < buyQuantity && itemStock > 0) {
            console.log("\nSorry, we don't have enough " + itemName + "s for you to buy.");
            if (itemStock > 1) {
            console.log("There are " + itemStock + " " + itemName + "s in stock.\n");
          } else {
            console.log("There is " + itemStock + " " + itemName + " in stock.\n");
          }
            continueShopping();
          } else {
            console.log("\nWe are out of stock on " + itemName + "s.\n");
            continueShopping();
          }
        }
      })
  });
}

function continueShopping() {
  inquirer
    .prompt([
      {
        name: "moreShopping",
        type: "confirm",
        message: "Continue shopping?"
      },
    ])
    .then(function(answer) {

      if(answer.moreShopping) {
        customerStart();
      }
      else {
        console.log('\n----------------------------------------------------');
        console.log('Thanks for shopping at Bamazon. Have a good day!');
        console.log('----------------------------------------------------\n');
        connection.end();
      }

    });
}
