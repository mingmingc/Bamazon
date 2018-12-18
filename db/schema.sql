DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(15) NOT NULL,
    price DECIMAL(10,2) default 0,
    stock_quantity INT default 0,
    PRIMARY KEY (item_id)
);

SELECT * from products;



