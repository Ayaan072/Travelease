<?php
/**
 * TravelEase – Database Configuration
 * Connects to MySQL database using PHP mysqli extension
 * Default XAMPP settings: host = localhost, user = root, password = ""
 */

$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "travelease";

// Establish MySQL connection
$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

// Check connection
if (!$conn) {
    die("Database Connection Failed: " . mysqli_connect_error());
}

// Set character set to UTF-8
mysqli_set_charset($conn, "utf8mb4");
?>
