DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone", "Electronics", 199.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bananas", "Produce", 1.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Windex", "Home", 4.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bagel Bites", "Frozen", 3.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook", "Electronics", 799.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas sweatpants", "Clothing", 35.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sporting goods", 3.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nike Air", "Shoes", 49.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sofa", "Furniture", 499.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Guitar", "Music", 199.99, 100);