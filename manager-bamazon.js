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
    console.log('-------------------------------------------\n');
    console.log('Welcome to the Bamazon Manager Portal (BMP)');
    console.log('-------------------------------------------\n');
    managerStart();
  });

function managerStart() {

  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
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
            console.log('In: View Products for Sale');
            viewProducts()
            break;
          case 'View Low Inventory':
            console.log('In: View Low Inventory');
            viewLow()
            break;
          case 'Add to Inventory':
            console.log('In: Add to Inventory');
            reloadStock()
            break;
          case 'Add New Product':
            console.log('In: Add New Product');
            addProduct()
            break;
          default:

        }

      });
  });
};

function viewProducts() {

};

function viewLow() {

};

function reloadStock() {

};

function addProduct() {

};
