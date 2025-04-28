CREATE DATABASE introcafe;
USE introcafe;

CREATE TABLE upload_orders(
  uploadedOrderId INT(11) NOT NULL AUTO_INCREMENT,
  uploadedItems VARCHAR(255) NOT NULL,
  uploadedTakeway VARCHAR(255) NOT NULL,
  uploadedTotalCost BIGINT(20) NOT NULL,
  uploadedOrderTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (uploadedOrderId)
);

CREATE TABLE items (
  itemId INT(11) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price BIGINT(20) NOT NULL,
  PRIMARY KEY (itemId)
);

INSERT INTO items (itemId,name,price) VALUES
(1,'Espresso',500),
(2,'Latte',650),
(3,'Matcha Latte',800),
(4,'Americano',600),
(5,'Ír kávé',950),
(6,'Pisztáciás muffin',1000),
(7,'Habtorta',1100),
(8,'Málnás Brownie',1150),
(9,'Meggyes-Csokis Golyó',1050),
(10,'Kávészelet',1200);


