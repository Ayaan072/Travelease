<?php
/**
 * TravelEase – Delete Travel Package (admin/delete_package.php)
 * Handles package deletion with foreign key cascading and admin authorization
 */
require_once __DIR__ . '/../config/database.php';

// Strict Role-Based Access Control: Admin only
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    header("Location: ../login.php");
    exit();
}

$package_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($package_id > 0) {
    // Execute prepared DELETE query
    $sql = "DELETE FROM packages WHERE id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "i", $package_id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    header("Location: dashboard.php?deleted=1");
    exit();
}

header("Location: dashboard.php");
exit();
?>
