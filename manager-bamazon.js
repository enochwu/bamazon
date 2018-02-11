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
    console.log('\n-------------------------------------------');
    console.log('Welcome to the Bamazon Manager Portal (BMP)');
    console.log('-------------------------------------------\n');
    managerStart();
  });

function managerStart() {

  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    let itemName = results.product_name;

    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: ['View Products for Sale',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product'],
          message: "What would you like to do today?"
        },
      ])
      .then(function(answer) {

        switch (answer.choice) {
          case 'View Products for Sale':
            viewProducts()
            break;
          case 'View Low Inventory':
            viewLow()
            break;
          case 'Add to Inventory':
            reloadStock()
            break;
          case 'Add New Product':
            addProduct()
            break;
          default:

        }

      });

      function viewProducts() {

        console.log('\nProducts in the Storefront:\n');
        for (var i = 0; i < results.length; i++) {
          console.log('-----------------------');
          console.log(results[i].product_name)
          console.log('-----------------------');
          console.log("Stock: " + results[i].quantity);
          console.log("Price: " + results[i].price);
          console.log("Item ID: " + results[i].item_id + "\n");
        }

        continueWorking();

      };

      function viewLow() {
        console.log('\nProducts that need restocked soon:\n');
        for (var i = 0; i < results.length; i++) {
          if (results[i].quantity < 5) {
          console.log('-----------------------');
          console.log(results[i].product_name)
          console.log('-----------------------');
          console.log("Stock: " + results[i].quantity);
          console.log("Item ID: " + results[i].item_id + "\n");
          }
        }

        continueWorking();
      };

      function reloadStock() {
        console.log('In: Add to Inventory');
      };

      function addProduct() {
        console.log('In: Add New Product');
      };

  });
};

function continueWorking() {
  inquirer
    .prompt([
      {
        name: "moreWork",
        type: "confirm",
        message: "Would you like to do something else?"
      },
    ])
    .then(function(answer) {

      if(answer.moreWork) {
        managerStart();
      }
      else {
        console.log('\n-------------------------------------------');
        console.log('You have been logged out. Get back to work!');
        console.log('-------------------------------------------\n');
        connection.end();
      }

    });
}
