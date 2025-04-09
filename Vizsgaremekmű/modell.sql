CREATE DATABASE introcafe;
USE introcafe;

CREATE TABLE users(
  Uid BIGINT(20) NOT NULL AUTO_INCREMENT,
  FullName VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  IntroPoints BIGINT(20),
  PRIMARY KEY (Uid)
);

CREATE TABLE upload_orders(
  UploadedOrderId INT(11) NOT NULL,
  UploadedItems VARCHAR(255) NOT NULL,
  UploadedTakeway VARCHAR(255) NOT NULL,
  UploadedTotalCost VARCHAR(20) NOT NULL,
  UploadedOrderTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (UploadedOrderId)
);


CREATE TABLE items (
  ItemId INT(11) NOT NULL,
  Name VARCHAR(255) NOT NULL,
  Price BIGINT(20) NOT NULL,
  PRIMARY KEY (ItemId)
);


INSERT INTO items (ItemId,Name,Price) VALUES
(1, 'Espresso', 500),
(2, 'Latte', 700),
(3, 'Cappuccino', 750),
(4, 'Americano', 600),
(5, 'Matcha Latte', 800),
(6, 'Pisztáciás muffin', 750),
(7, 'Forró csoki', 750),
(8, 'Forró csoki (fehércsoki)', 800),
(9, 'Fekete tea', 600),
(10, 'Zöld tea', 600),
(11, 'Caramel Frappucino', 1300),
(12, 'Csokoládés Croissant', 850),
(13, 'Sajtos-Sonkás Szendvics', 1000),
(14, 'Tojásos-Baconös Szendvics', 1000),
(15, 'Cortado', 700),
(16, 'Ír kávé', 950),
(17, 'Jeges Kávé Vanília Fagylaltal', 900),
(18, 'Dupla Espresso', 850),
(19, 'Bodzás Limonádé', 900),
(20, 'Levendula-Áfonyás Limonádé', 900),
(21, 'Narancsos Limonádé', 900),
(22, 'Eper-Bazsalikomos Limonádé', 900),
(23, 'Citrom-Limeos Limonádé', 900),
(24, 'Mangó-Maracujás Limonádé', 900),
(25, 'Pepsi Cola 330ml', 400),
(26, 'Pepsi Cola 500ml', 550);


