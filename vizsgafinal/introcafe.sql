-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2025 at 11:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

CREATE DATABASE introcafe;
USE introcafe;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `introcafe`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `itemId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`itemId`, `name`, `price`) VALUES
(1, 'Espresso', 500),
(2, 'Latte', 650),
(3, 'Matcha Latte', 800),
(4, 'Americano', 600),
(5, 'Ír kávé', 950),
(6, 'Pisztáciás muffin', 1000),
(7, 'Habtorta', 1100),
(8, 'Málnás Brownie', 1150),
(9, 'Meggyes-Csokis Golyó', 1050),
(10, 'Kávészelet', 1200);

-- --------------------------------------------------------

--
-- Table structure for table `upload_orders`
--

CREATE TABLE `upload_orders` (
  `uploadedOrderId` int(11) NOT NULL,
  `uploadedItems` text NOT NULL,
  `uploadedTakeway` varchar(255) NOT NULL,
  `uploadedTotalCost` bigint(20) NOT NULL,
  `uploadedOrderTime` datetime NOT NULL DEFAULT current_timestamp(),
  `uploadedUserId` bigint(20) NOT NULL DEFAULT 0,
  `uploadedUsedIntropoints` bigint(20) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` bigint(20) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `intropoints` bigint(20) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`itemId`);

--
-- Indexes for table `upload_orders`
--
ALTER TABLE `upload_orders`
  ADD PRIMARY KEY (`uploadedOrderId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `upload_orders`
--
ALTER TABLE `upload_orders`
  MODIFY `uploadedOrderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
