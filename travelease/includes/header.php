<?php
/**
 * TravelEase – Header Include File
 * Shared across Customer & Admin views
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Determine base URL path so links work from both root and /admin/ directories
$is_admin_folder = strpos($_SERVER['SCRIPT_NAME'], '/admin/') !== false;
$path_prefix = $is_admin_folder ? '../' : './';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? htmlspecialchars($page_title) . " – TravelEase" : "TravelEase – Travel Package Booking System"; ?></title>
    <link rel="stylesheet" href="<?php echo $path_prefix; ?>css/style.css">
</head>
<body>
    <header class="navbar">
        <div class="nav-container">
            <a href="<?php echo $path_prefix; ?>index.php" class="brand-logo">
                <span class="logo-icon">✈️</span>
                <span>Travel<span class="accent">Ease</span></span>
            </a>

            <nav>
                <ul class="nav-links">
                    <li><a href="<?php echo $path_prefix; ?>index.php">Home</a></li>
                    <li><a href="<?php echo $path_prefix; ?>packages.php">Packages</a></li>

                    <?php if (isset($_SESSION['user_id'])): ?>
                        <?php if ($_SESSION['user_role'] === 'admin'): ?>
                            <!-- Admin specific navigation links -->
                            <li><a href="<?php echo $path_prefix; ?>admin/dashboard.php" class="nav-badge">Admin Panel</a></li>
                            <li><a href="<?php echo $path_prefix; ?>admin/bookings.php">All Bookings</a></li>
                            <li><span class="nav-badge">👤 <?php echo htmlspecialchars($_SESSION['user_name']); ?></span></li>
                            <li><a href="<?php echo $path_prefix; ?>logout.php" class="btn btn-outline btn-sm">Logout</a></li>
                        <?php else: ?>
                            <!-- Customer specific navigation links -->
                            <li><a href="<?php echo $path_prefix; ?>my_bookings.php">My Bookings</a></li>
                            <li><span class="nav-badge">👤 <?php echo htmlspecialchars($_SESSION['user_name']); ?></span></li>
                            <li><a href="<?php echo $path_prefix; ?>logout.php" class="btn btn-outline btn-sm">Logout</a></li>
                        <?php endif; ?>
                    <?php else: ?>
                        <!-- Guest visitor links -->
                        <li><a href="<?php echo $path_prefix; ?>login.php" class="btn-nav-outline">Login</a></li>
                        <li><a href="<?php echo $path_prefix; ?>register.php" class="btn btn-primary btn-sm">Register</a></li>
                    <?php endif; ?>
                </ul>
            </nav>
        </div>
    </header>
    <main>
        <div class="container">
