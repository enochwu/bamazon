DROP DATABASE IF EXISTS bamazon;
Create DATABASE bamazon;
USE bamazon

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price VARCHAR(45) NULL,
  quantity INT,
  PRIMARY KEY (item_id)
)
