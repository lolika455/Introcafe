CREATE DATABASE introcafe;
USE introcafe;

CREATE TABLE introcafe.items (
  itemId INT(11) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price BIGINT(20) NOT NULL,
  PRIMARY KEY (itemId)
)

CREATE TABLE introcafe.upload_orders (
  uploadedOrderId INT(11) NOT NULL AUTO_INCREMENT,
  uploadedItems VARCHAR(255) NOT NULL,
  uploadedTakeway VARCHAR(255) NOT NULL,
  uploadedTotalCost BIGINT(20) NOT NULL,
  uploadedOrderTime DATETIME NOT NULL DEFAULT current_timestamp(),
  uploadedUserId BIGINT(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (uploadedOrderId)
)

CREATE TABLE introcafe.users (
  uid BIGINT(20) NOT NULL AUTO_INCREMENT,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  intropoints BIGINT(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (uid)
)

INSERT INTO introcafe.items(itemId, name, price) VALUES
(1, 'Espresso', 500),
(2, 'Latte', 650),
(3, 'Matcha Latte', 800),
(4, 'Americano', 600),
(5, 'Ír kávé', 950),
(6, 'Pisztáciás muffin', 1000),
(7, 'Habtorta', 1100),
(8, 'Málnás Brownie', 1150),
(9, 'Meggyes-Csokis Golyó', 1050),
(10, 'Kávészelet', 1200),