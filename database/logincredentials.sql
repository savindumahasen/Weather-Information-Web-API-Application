-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2025 at 12:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `logincredentials`
--

-- --------------------------------------------------------

--
-- Table structure for table `testcredentials`
--

CREATE TABLE `testcredentials` (
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testcredentials`
--

INSERT INTO `testcredentials` (`username`, `password`) VALUES
('careers@fidenz.com ', 'Pass#fidenz ');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(32) NOT NULL,
  `email` varchar(345) DEFAULT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`) VALUES
('1246f0f2bba14f56889c7f804323d5e3', 'sandun@gmail.com', '$2b$12$jq28EUexyC9jjoQh5LtM0uyN0esQy3kRM56mDUo8GZ3sziYV1okGy'),
('5d89d3a310da45fb9a6dea36adedefd5', '123@gmail.com', '$2b$12$KqH.DKAgv3XkUxeTT1O4QuW.whsJ8f/KMXEc9QMTbF4gVIV0Lsxh2'),
('7c96a07c9e4e4f5c967688ee05067af6', 'sirisenaruhunuhewa@gmail.com', 'sirisena@123'),
('967b36d1afbf46a4b9b835fe6d135703', 'wewee@gmail.com', '$2b$12$0fbeaQRKXJ6R1R1acOniP.q4SdEeitj6WWBM94MQP/7JvhiDu5blK'),
('a3a71ed2c15641eca9a92a1b689ec267', 'kamal@gmail.com', 'kamal@123'),
('d437f2044864496382bc3399e5cd5b02', 'savinduruhunuhewa@gmail.com', '$2b$12$xEEzLMkLJdF53C8cl8OHCuv5y5nldumKcBRhK/qOoRvsjUq9CXfB6'),
('e8e62844fcca47cea6dcdf38b72e8bab', 'kushanpahasaradarmawamsha@gmail.com', '$2b$12$bHOatLk39x1oAd0OF41Oc.zXB6emIvicBBcs9LQ8FxtcEkTfflYBq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
