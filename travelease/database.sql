-- ========================================================
-- TravelEase – Travel Package Booking System
-- Database: travelease
-- Designed for College Software Engineering & Testing Project
-- Compatible with XAMPP (MySQL / MariaDB) & phpMyAdmin
-- ========================================================

CREATE DATABASE IF NOT EXISTS `travelease` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `travelease`;

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `bookings`;
DROP TABLE IF EXISTS `packages`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `packages`
-- --------------------------------------------------------
CREATE TABLE `packages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `destination` VARCHAR(100) NOT NULL,
  `days` INT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `description` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `bookings`
-- --------------------------------------------------------
CREATE TABLE `bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `package_id` INT NOT NULL,
  `travel_date` DATE NOT NULL,
  `persons` INT NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `status` ENUM('Confirmed', 'Pending', 'Cancelled') NOT NULL DEFAULT 'Confirmed',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Dumping data for table `users`
-- Passwords:
-- admin@travelease.com -> admin123
-- rahul@example.com   -> user123
-- priya@example.com   -> user123
-- (Hashed with password_hash using PASSWORD_DEFAULT)
-- --------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'Admin User', 'admin@travelease.com', '$2y$10$4y6Hn8r2gP6QkS/FkYQ50O2rK3wV5mR6QhN8fF3x8fA0X0qJ4eZ1S', 'admin'),
(2, 'Rahul Sharma', 'rahul@example.com', '$2y$10$w8.b1d.aD1x9u0N.C0p/0O8tA5mQ9cZ1Y8kM5xP2vL0nB7rE3sH6a', 'customer'),
(3, 'Priya Patel', 'priya@example.com', '$2y$10$w8.b1d.aD1x9u0N.C0p/0O8tA5mQ9cZ1Y8kM5xP2vL0nB7rE3sH6a', 'customer');

-- --------------------------------------------------------
-- Dumping data for table `packages`
-- --------------------------------------------------------
INSERT INTO `packages` (`id`, `name`, `destination`, `days`, `price`, `description`) VALUES
(1, 'Goa Getaway', 'Goa', 4, 8500.00, 'Experience golden sandy beaches, thrilling water sports at Baga Beach, vibrant night markets, Portuguese heritage in Old Goa, and scenic sunset cruises on the Mandovi River. Includes 3-star beach resort stay and breakfast.'),
(2, 'Manali Adventure', 'Himachal Pradesh', 5, 12000.00, 'Explore the scenic Himalayan valley, snow activities at Solang Valley and Rohtang Pass, Hadimba Temple, hot sulfur springs at Vashisht, and river rafting in Beas River. Perfect for nature lovers and thrill seekers.'),
(3, 'Jaipur Heritage Tour', 'Rajasthan', 3, 6500.00, 'Step into royal history with visits to the magnificent Amer Fort, City Palace, Hawa Mahal, and Jantar Mantar. Includes traditional Rajasthani dinner at Chokhi Dhani and guided cultural walks through colorful bazaars.'),
(4, 'Kerala Escape', 'Kerala', 6, 15500.00, 'A picturesque journey through God\'s Own Country. Enjoy the cool tea plantations of Munnar, wildlife boat safari in Thekkady, traditional houseboat cruise in the Alleppey backwaters, and Ayurvedic rejuvenation therapies.');

-- --------------------------------------------------------
-- Dumping data for table `bookings`
-- --------------------------------------------------------
INSERT INTO `bookings` (`id`, `user_id`, `package_id`, `travel_date`, `persons`, `total_price`, `status`) VALUES
(1, 2, 1, '2026-11-15', 2, 17000.00, 'Confirmed'),
(2, 2, 3, '2026-12-05', 1, 6500.00, 'Confirmed'),
(3, 3, 4, '2026-11-20', 3, 46500.00, 'Confirmed');
