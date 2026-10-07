export interface SourceFile {
  name: string;
  path: string;
  category: 'database' | 'config' | 'customer' | 'admin' | 'shared';
  language: string;
  description: string;
  content: string;
}

export const PHP_PROJECT_FILES: SourceFile[] = [
  {
    name: "database.sql",
    path: "database.sql",
    category: "database",
    language: "sql",
    description: "MySQL schema creation script, tables (users, packages, bookings), constraints, and sample data.",
    content: `-- ========================================================
-- TravelEase – Travel Package Booking System
-- Database: travelease
-- Designed for College Software Engineering & Testing Project
-- Compatible with XAMPP (MySQL / MariaDB) & phpMyAdmin
-- ========================================================

CREATE DATABASE IF NOT EXISTS \`travelease\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`travelease\`;

-- --------------------------------------------------------
-- Table structure for table \`users\`
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`bookings\`;
DROP TABLE IF EXISTS \`packages\`;
DROP TABLE IF EXISTS \`users\`;

CREATE TABLE \`users\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL UNIQUE,
  \`password\` VARCHAR(255) NOT NULL,
  \`role\` ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table \`packages\`
-- --------------------------------------------------------
CREATE TABLE \`packages\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(150) NOT NULL,
  \`destination\` VARCHAR(100) NOT NULL,
  \`days\` INT NOT NULL,
  \`price\` DECIMAL(10,2) NOT NULL,
  \`description\` TEXT NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table \`bookings\`
-- --------------------------------------------------------
CREATE TABLE \`bookings\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL,
  \`package_id\` INT NOT NULL,
  \`travel_date\` DATE NOT NULL,
  \`persons\` INT NOT NULL,
  \`total_price\` DECIMAL(10,2) NOT NULL,
  \`status\` ENUM('Confirmed', 'Pending', 'Cancelled') NOT NULL DEFAULT 'Confirmed',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`package_id\`) REFERENCES \`packages\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Sample Users Data
-- Passwords:
-- admin@travelease.com -> admin123
-- rahul@example.com   -> user123
-- priya@example.com   -> user123
-- --------------------------------------------------------
INSERT INTO \`users\` (\`id\`, \`name\`, \`email\`, \`password\`, \`role\`) VALUES
(1, 'Admin User', 'admin@travelease.com', '$2y$10$4y6Hn8r2gP6QkS/FkYQ50O2rK3wV5mR6QhN8fF3x8fA0X0qJ4eZ1S', 'admin'),
(2, 'Rahul Sharma', 'rahul@example.com', '$2y$10$w8.b1d.aD1x9u0N.C0p/0O8tA5mQ9cZ1Y8kM5xP2vL0nB7rE3sH6a', 'customer'),
(3, 'Priya Patel', 'priya@example.com', '$2y$10$w8.b1d.aD1x9u0N.C0p/0O8tA5mQ9cZ1Y8kM5xP2vL0nB7rE3sH6a', 'customer');

-- --------------------------------------------------------
-- Sample Packages Data
-- --------------------------------------------------------
INSERT INTO \`packages\` (\`id\`, \`name\`, \`destination\`, \`days\`, \`price\`, \`description\`) VALUES
(1, 'Goa Getaway', 'Goa', 4, 8500.00, 'Experience golden sandy beaches, thrilling water sports at Baga Beach, vibrant night markets, Portuguese heritage in Old Goa, and scenic sunset cruises on the Mandovi River. Includes 3-star beach resort stay and breakfast.'),
(2, 'Manali Adventure', 'Himachal Pradesh', 5, 12000.00, 'Explore the scenic Himalayan valley, snow activities at Solang Valley and Rohtang Pass, Hadimba Temple, hot sulfur springs at Vashisht, and river rafting in Beas River. Perfect for nature lovers and thrill seekers.'),
(3, 'Jaipur Heritage Tour', 'Rajasthan', 3, 6500.00, 'Step into royal history with visits to the magnificent Amer Fort, City Palace, Hawa Mahal, and Jantar Mantar. Includes traditional Rajasthani dinner at Chokhi Dhani and guided cultural walks through colorful bazaars.'),
(4, 'Kerala Escape', 'Kerala', 6, 15500.00, 'A picturesque journey through God\\'s Own Country. Enjoy the cool tea plantations of Munnar, wildlife boat safari in Thekkady, traditional houseboat cruise in the Alleppey backwaters, and Ayurvedic rejuvenation therapies.');

-- --------------------------------------------------------
-- Sample Bookings Data
-- --------------------------------------------------------
INSERT INTO \`bookings\` (\`id\`, \`user_id\`, \`package_id\`, \`travel_date\`, \`persons\`, \`total_price\`, \`status\`) VALUES
(1, 2, 1, '2026-11-15', 2, 17000.00, 'Confirmed'),
(2, 2, 3, '2026-12-05', 1, 6500.00, 'Confirmed'),
(3, 3, 4, '2026-11-20', 3, 46500.00, 'Confirmed');`
  },
  {
    name: "database.php",
    path: "config/database.php",
    category: "config",
    language: "php",
    description: "Database connection parameters using PHP's procedural mysqli extension.",
    content: `<?php
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
?>`
  },
  {
    name: "header.php",
    path: "includes/header.php",
    category: "shared",
    language: "php",
    description: "Common navigation bar, session status checker, and role-based links.",
    content: `<?php
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
        <div class="container">`
  },
  {
    name: "footer.php",
    path: "includes/footer.php",
    category: "shared",
    language: "php",
    description: "Common HTML footer layout and JavaScript file inclusion.",
    content: `<?php
/**
 * TravelEase – Footer Include File
 */
$is_admin_folder = strpos($_SERVER['SCRIPT_NAME'], '/admin/') !== false;
$path_prefix = $is_admin_folder ? '../' : './';
?>
        </div><!-- /.container -->
    </main>

    <footer>
        <div class="container footer-content">
            <p><strong>TravelEase</strong> – Travel Package Booking System</p>
            <p>Designed for College Software Engineering &amp; Testing Project (Demonstration of SRS, SDLC &amp; Testing)</p>
            <p>&copy; <?php echo date('Y'); ?> TravelEase. Simple PHP &amp; MySQL Modular Architecture.</p>
        </div>
    </footer>

    <script src="<?php echo $path_prefix; ?>js/script.js"></script>
</body>
</html>`
  },
  {
    name: "index.php",
    path: "index.php",
    category: "customer",
    language: "php",
    description: "Landing page showing hero section, featured vacation packages, and workflow steps.",
    content: `<?php
/**
 * TravelEase – Home Page (index.php)
 * Landing page displaying featured travel packages and system overview
 */
$page_title = "Explore Beautiful Destinations";
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/header.php';

// Fetch first 4 featured travel packages
$sql = "SELECT * FROM packages ORDER BY id ASC LIMIT 4";
$result = mysqli_query($conn, $sql);
?>

<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <h1>Discover Your Next Journey with TravelEase</h1>
        <p>Book curated holiday packages across India with transparent pricing, instant confirmation, and flexible scheduling.</p>
        <div class="hero-actions">
            <a href="packages.php" class="btn btn-accent">View All Packages 🌴</a>
            <?php if (!isset($_SESSION['user_id'])): ?>
                <a href="register.php" class="btn btn-outline" style="color: white; border-color: rgba(255,255,255,0.6);">Create Free Account</a>
            <?php else: ?>
                <a href="my_bookings.php" class="btn btn-outline" style="color: white; border-color: rgba(255,255,255,0.6);">My Bookings</a>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- Featured Packages Section -->
<section>
    <div class="section-header">
        <h2>Popular Travel Packages</h2>
        <p>Handpicked destinations with all-inclusive itineraries and verified accommodations</p>
    </div>

    <div class="packages-grid">
        <?php if ($result && mysqli_num_rows($result) > 0): ?>
            <?php while ($row = mysqli_fetch_assoc($result)): ?>
                <div class="package-card">
                    <div class="card-header-badge">
                        <span class="card-destination">📍 <?php echo htmlspecialchars($row['destination']); ?></span>
                        <span class="card-duration">⏱️ <?php echo htmlspecialchars($row['days']); ?> Days</span>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title"><?php echo htmlspecialchars($row['name']); ?></h3>
                        <p class="card-desc"><?php echo htmlspecialchars($row['description']); ?></p>
                        <div class="card-footer">
                            <div class="card-price">
                                <span class="label">Starting From</span>
                                <span class="amount">₹<?php echo number_format($row['price'], 2); ?></span>
                            </div>
                            <a href="package_details.php?id=<?php echo $row['id']; ?>" class="btn btn-primary btn-sm">View Details &rarr;</a>
                        </div>
                    </div>
                </div>
            <?php endwhile; ?>
        <?php else: ?>
            <p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No packages available currently. Check back soon!</p>
        <?php endif; ?>
    </div>

    <div style="text-align: center; margin-top: 35px;">
        <a href="packages.php" class="btn btn-outline">Explore All Travel Packages &rarr;</a>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>`
  },
  {
    name: "register.php",
    path: "register.php",
    category: "customer",
    language: "php",
    description: "Customer registration form with field validations and password hashing.",
    content: `<?php
/**
 * TravelEase – Customer Registration (register.php)
 * Handles customer account creation with validation and secure password hashing
 */
$page_title = "Customer Registration";
require_once __DIR__ . '/config/database.php';

$errors = [];

// If user is already logged in, redirect away
if (isset($_SESSION['user_id'])) {
    header("Location: packages.php");
    exit();
}

// Process registration form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    // Validation checks
    if (empty($name)) {
        $errors[] = "Please enter your full name.";
    }

    if (empty($email)) {
        $errors[] = "Please enter your email address.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please enter a valid email address.";
    }

    if (empty($password)) {
        $errors[] = "Please enter a password.";
    } elseif (strlen($password) < 6) {
        $errors[] = "Password must be at least 6 characters long.";
    }

    if ($password !== $confirm_password) {
        $errors[] = "Passwords do not match. Please re-enter.";
    }

    // Check if email already exists
    if (empty($errors)) {
        $check_sql = "SELECT id FROM users WHERE email = ? LIMIT 1";
        $stmt = mysqli_prepare($conn, $check_sql);
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);

        if (mysqli_stmt_num_rows($stmt) > 0) {
            $errors[] = "An account with this email address already exists. Please login instead.";
        }
        mysqli_stmt_close($stmt);
    }

    // Insert new customer if validation passes
    if (empty($errors)) {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $role = 'customer';

        $insert_sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        $insert_stmt = mysqli_prepare($conn, $insert_sql);
        mysqli_stmt_bind_param($insert_stmt, "ssss", $name, $email, $hashed_password, $role);

        if (mysqli_stmt_execute($insert_stmt)) {
            mysqli_stmt_close($insert_stmt);
            header("Location: login.php?registered=1");
            exit();
        } else {
            $errors[] = "Registration failed: " . mysqli_error($conn);
        }
    }
}

require_once __DIR__ . '/includes/header.php';
?>

<div class="form-card">
    <div class="form-header">
        <h2>Create an Account</h2>
        <p>Join TravelEase to book curated tour packages easily</p>
    </div>

    <?php if (!empty($errors)): ?>
        <div class="alert alert-danger">
            <div>
                <strong>Please correct the following:</strong>
                <ul style="margin-left: 20px; margin-top: 6px;">
                    <?php foreach ($errors as $err): ?>
                        <li><?php echo htmlspecialchars($err); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    <?php endif; ?>

    <form action="register.php" method="POST" autocomplete="off">
        <div class="form-group">
            <label for="name">Full Name <span style="color: var(--danger-color);">*</span></label>
            <input type="text" id="name" name="name" class="form-control" placeholder="e.g. Rahul Sharma" value="<?php echo isset($name) ? htmlspecialchars($name) : ''; ?>" required>
        </div>

        <div class="form-group">
            <label for="email">Email Address <span style="color: var(--danger-color);">*</span></label>
            <input type="email" id="email" name="email" class="form-control" placeholder="e.g. rahul@example.com" value="<?php echo isset($email) ? htmlspecialchars($email) : ''; ?>" required>
        </div>

        <div class="form-group">
            <label for="password">Password <span style="color: var(--danger-color);">*</span></label>
            <input type="password" id="password" name="password" class="form-control" placeholder="Minimum 6 characters" required>
            <span class="form-help">Must be at least 6 characters</span>
        </div>

        <div class="form-group">
            <label for="confirm_password">Confirm Password <span style="color: var(--danger-color);">*</span></label>
            <input type="password" id="confirm_password" name="confirm_password" class="form-control" placeholder="Re-enter your password" required>
        </div>

        <button type="submit" class="btn btn-primary btn-block" style="padding: 12px; margin-top: 10px;">
            Register Account &rarr;
        </button>
    </form>

    <div class="form-footer-link">
        Already have an account? <a href="login.php">Login here</a>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>`
  },
  {
    name: "login.php",
    path: "login.php",
    category: "customer",
    language: "php",
    description: "Session-based login handler for both Customer and Admin roles.",
    content: `<?php
/**
 * TravelEase – User Login (login.php)
 * Authenticates Customer & Admin users using PHP Sessions & password_verify
 */
$page_title = "User Login";
require_once __DIR__ . '/config/database.php';

$errors = [];
$success_msg = "";

// If already logged in, redirect based on role
if (isset($_SESSION['user_id'])) {
    if ($_SESSION['user_role'] === 'admin') {
        header("Location: admin/dashboard.php");
    } else {
        header("Location: packages.php");
    }
    exit();
}

if (isset($_GET['registered'])) {
    $success_msg = "Account created successfully! Please login with your credentials.";
}

if (isset($_GET['logged_out'])) {
    $success_msg = "You have been logged out successfully.";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($email)) {
        $errors[] = "Please enter your email address.";
    }
    if (empty($password)) {
        $errors[] = "Please enter your password.";
    }

    if (empty($errors)) {
        $sql = "SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($user = mysqli_fetch_assoc($result)) {
            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = (int)$user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_role'] = $user['role'];

                if ($user['role'] === 'admin') {
                    header("Location: admin/dashboard.php");
                } else {
                    $redirect_target = $_SESSION['redirect_after_login'] ?? 'packages.php';
                    unset($_SESSION['redirect_after_login']);
                    header("Location: " . $redirect_target);
                }
                exit();
            } else {
                $errors[] = "Invalid password. Please check and try again.";
            }
        } else {
            $errors[] = "No account found with this email address.";
        }
        mysqli_stmt_close($stmt);
    }
}

require_once __DIR__ . '/includes/header.php';
?>

<div class="form-card">
    <div class="form-header">
        <h2>Sign In to TravelEase</h2>
        <p>Access your bookings and explore vacation packages</p>
    </div>

    <!-- College Viva / Demo Credentials Callout -->
    <div class="alert alert-info" style="font-size: 0.85rem; flex-direction: column; align-items: flex-start;">
        <div><strong>💡 Demo Credentials for Evaluation &amp; Viva:</strong></div>
        <div style="margin-top: 4px;">
            &bull; <strong>Admin:</strong> admin@travelease.com / <code>admin123</code><br>
            &bull; <strong>Customer:</strong> rahul@example.com / <code>user123</code>
        </div>
    </div>

    <?php if ($success_msg): ?>
        <div class="alert alert-success">
            <span>✅ <?php echo htmlspecialchars($success_msg); ?></span>
        </div>
    <?php endif; ?>

    <?php if (!empty($errors)): ?>
        <div class="alert alert-danger">
            <div>
                <strong>Login Failed:</strong>
                <ul style="margin-left: 20px; margin-top: 4px;">
                    <?php foreach ($errors as $err): ?>
                        <li><?php echo htmlspecialchars($err); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    <?php endif; ?>

    <form action="login.php" method="POST" autocomplete="off">
        <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" class="form-control" placeholder="e.g. rahul@example.com" value="<?php echo isset($email) ? htmlspecialchars($email) : ''; ?>" required autofocus>
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" class="form-control" placeholder="Enter your password" required>
        </div>

        <button type="submit" class="btn btn-primary btn-block" style="padding: 12px; margin-top: 10px;">
            Sign In &rarr;
        </button>
    </form>

    <div class="form-footer-link">
        Don't have an account yet? <a href="register.php">Create an Account</a>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>`
  },
  {
    name: "logout.php",
    path: "logout.php",
    category: "customer",
    language: "php",
    description: "Session termination and secure cookie invalidation script.",
    content: `<?php
/**
 * TravelEase – Logout (logout.php)
 * Destroys active user session and redirects to login page
 */
session_start();

$_SESSION = [];

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

session_destroy();
header("Location: login.php?logged_out=1");
exit();
?>`
  },
  {
    name: "packages.php",
    path: "packages.php",
    category: "customer",
    language: "php",
    description: "Full vacation packages catalog queried dynamically from MySQL.",
    content: `<?php
/**
 * TravelEase – Travel Packages Catalog (packages.php)
 * Lists all active vacation packages available for booking
 */
$page_title = "Travel Packages";
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/header.php';

$sql = "SELECT * FROM packages ORDER BY id ASC";
$result = mysqli_query($conn, $sql);
?>

<div style="margin-bottom: 30px;">
    <h2>Explore All Travel Packages</h2>
    <p style="color: var(--text-muted);">Choose from our handpicked destinations and plan your dream vacation today</p>
</div>

<div class="packages-grid">
    <?php if ($result && mysqli_num_rows($result) > 0): ?>
        <?php while ($row = mysqli_fetch_assoc($result)): ?>
            <div class="package-card">
                <div class="card-header-badge">
                    <span class="card-destination">📍 <?php echo htmlspecialchars($row['destination']); ?></span>
                    <span class="card-duration">⏱️ <?php echo htmlspecialchars($row['days']); ?> Days</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title"><?php echo htmlspecialchars($row['name']); ?></h3>
                    <p class="card-desc"><?php echo htmlspecialchars($row['description']); ?></p>
                    <div class="card-footer">
                        <div class="card-price">
                            <span class="label">Per Person</span>
                            <span class="amount">₹<?php echo number_format($row['price'], 2); ?></span>
                        </div>
                        <a href="package_details.php?id=<?php echo $row['id']; ?>" class="btn btn-primary btn-sm">
                            View Details &rarr;
                        </a>
                    </div>
                </div>
            </div>
        <?php endwhile; ?>
    <?php else: ?>
        <div style="grid-column: 1/-1; background: white; padding: 40px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color);">
            <h3>No Packages Found</h3>
            <p style="color: var(--text-muted); margin-top: 6px;">There are no packages in the system yet.</p>
        </div>
    <?php endif; ?>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>`
  },
  {
    name: "package_details.php",
    path: "package_details.php",
    category: "customer",
    language: "php",
    description: "Detailed itinerary view with highlights, inclusions, and 'Book' CTA.",
    content: `<?php
/**
 * TravelEase – Package Details (package_details.php)
 * Shows comprehensive itinerary and pricing for a single package
 */
require_once __DIR__ . '/config/database.php';

$package_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($package_id <= 0) {
    header("Location: packages.php");
    exit();
}

$sql = "SELECT * FROM packages WHERE id = ? LIMIT 1";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $package_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$package = mysqli_fetch_assoc($result);
mysqli_stmt_close($stmt);

if (!$package) {
    $page_title = "Package Not Found";
    require_once __DIR__ . '/includes/header.php';
    echo '<div class="alert alert-danger" style="margin-top: 30px;">Package not found. <a href="packages.php">Return to catalog</a>.</div>';
    require_once __DIR__ . '/includes/footer.php';
    exit();
}

$page_title = $package['name'];
require_once __DIR__ . '/includes/header.php';
?>

<div style="margin-bottom: 20px;">
    <a href="packages.php" class="btn btn-outline btn-sm">&larr; Back to All Packages</a>
</div>

<div class="package-detail-card">
    <div class="detail-content">
        <h1><?php echo htmlspecialchars($package['name']); ?></h1>

        <div class="detail-badges">
            <span class="badge badge-primary">📍 Destination: <?php echo htmlspecialchars($package['destination']); ?></span>
            <span class="badge badge-accent">⏱️ Duration: <?php echo htmlspecialchars($package['days']); ?> Days</span>
        </div>

        <h3 style="margin-bottom: 10px; font-size: 1.2rem;">Overview &amp; Itinerary</h3>
        <p class="detail-desc"><?php echo nl2br(htmlspecialchars($package['description'])); ?></p>

        <div class="detail-highlights">
            <h4 style="font-size: 1rem; color: var(--primary-dark);">✨ What is Included:</h4>
            <ul>
                <li>✔️ Verified hotel/resort accommodations</li>
                <li>✔️ Daily complimentary breakfast and welcome drinks</li>
                <li>✔️ Guided sightseeing tours with local transportation</li>
                <li>✔️ 24/7 on-tour customer support helpline</li>
            </ul>
        </div>
    </div>

    <div class="detail-sidebar">
        <div class="detail-price-box">
            <div class="price-label">Price per person</div>
            <div class="price-val">₹<?php echo number_format($package['price'], 2); ?></div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Taxes and fees included</p>
        </div>

        <div style="margin-top: 15px;">
            <?php if (isset($_SESSION['user_id'])): ?>
                <?php if ($_SESSION['user_role'] === 'customer'): ?>
                    <a href="booking.php?package_id=<?php echo $package['id']; ?>" class="btn btn-accent btn-block" style="padding: 14px; font-size: 1.05rem;">
                        Book This Package Now &rarr;
                    </a>
                <?php else: ?>
                    <a href="admin/edit_package.php?id=<?php echo $package['id']; ?>" class="btn btn-primary btn-block">
                        ✏️ Edit Package (Admin)
                    </a>
                <?php endif; ?>
            <?php else: ?>
                <a href="login.php" class="btn btn-primary btn-block" style="padding: 12px;">
                    Login to Book &rarr;
                </a>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>`
  },
  {
    name: "booking.php",
    path: "booking.php",
    category: "customer",
    language: "php",
    description: "Core booking logic: total_price = package price * number of persons, validated server-side.",
    content: `<?php
/**
 * TravelEase – Booking Page (booking.php)
 * Handles customer package booking, input validation, and price calculation
 * Booking Logic: total_price = package price × number of persons
 */
$page_title = "Book Travel Package";
require_once __DIR__ . '/config/database.php';

// Authentication check: Customer must be logged in
if (!isset($_SESSION['user_id'])) {
    $target_package = isset($_GET['package_id']) ? (int)$_GET['package_id'] : 0;
    $_SESSION['redirect_after_login'] = "booking.php?package_id=" . $target_package;
    header("Location: login.php");
    exit();
}

// Admins cannot book customer packages
if (isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin') {
    header("Location: admin/dashboard.php");
    exit();
}

$errors = [];
$package_id = isset($_REQUEST['package_id']) ? (int)$_REQUEST['package_id'] : 0;

if ($package_id <= 0) {
    header("Location: packages.php");
    exit();
}

$sql = "SELECT * FROM packages WHERE id = ? LIMIT 1";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $package_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$package = mysqli_fetch_assoc($result);
mysqli_stmt_close($stmt);

if (!$package) {
    header("Location: packages.php");
    exit();
}

$travel_date = $_POST['travel_date'] ?? '';
$persons = isset($_POST['persons']) ? (int)$_POST['persons'] : 1;
$unit_price = (float)$package['price'];
$initial_total = $unit_price * max(1, $persons);

// Handle Booking Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $travel_date = trim($_POST['travel_date'] ?? '');
    $persons = isset($_POST['persons']) ? (int)$_POST['persons'] : 0;

    if (empty($travel_date)) {
        $errors[] = "Please select a preferred travel start date.";
    } else {
        $selected_timestamp = strtotime($travel_date);
        $today_timestamp = strtotime(date('Y-m-d'));
        if ($selected_timestamp < $today_timestamp) {
            $errors[] = "Travel date cannot be in the past.";
        }
    }

    if ($persons < 1) {
        $errors[] = "Number of persons must be at least 1.";
    }

    if (empty($errors)) {
        // Core Booking Formula: total_price = package price * number of persons
        $total_price = $unit_price * $persons;
        $user_id = (int)$_SESSION['user_id'];
        $status = "Confirmed";

        $insert_sql = "INSERT INTO bookings (user_id, package_id, travel_date, persons, total_price, status) 
                       VALUES (?, ?, ?, ?, ?, ?)";
        $insert_stmt = mysqli_prepare($conn, $insert_sql);
        mysqli_stmt_bind_param($insert_stmt, "iisids", $user_id, $package_id, $travel_date, $persons, $total_price, $status);

        if (mysqli_stmt_execute($insert_stmt)) {
            $new_booking_id = mysqli_insert_id($conn);
            mysqli_stmt_close($insert_stmt);
            header("Location: confirmation.php?booking_id=" . $new_booking_id);
            exit();
        } else {
            $errors[] = "Failed to record booking: " . mysqli_error($conn);
        }
    }
}

require_once __DIR__ . '/includes/header.php';
?>

<div style="margin-bottom: 20px;">
    <a href="package_details.php?id=<?php echo $package['id']; ?>" class="btn btn-outline btn-sm">&larr; Back to Package Details</a>
</div>

<div class="form-card form-card-wide">
    <div class="form-header">
        <h2>Confirm Your Booking</h2>
        <p>Complete your reservation details for <strong><?php echo htmlspecialchars($package['name']); ?></strong></p>
    </div>

    <!-- Package Summary Banner -->
    <div style="background: var(--bg-light); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;">
        <div>
            <div style="font-weight: 700; font-size: 1.1rem; color: var(--text-dark);"><?php echo htmlspecialchars($package['name']); ?></div>
            <div style="color: var(--text-muted); font-size: 0.9rem;">📍 <?php echo htmlspecialchars($package['destination']); ?> &bull; ⏱️ <?php echo htmlspecialchars($package['days']); ?> Days</div>
        </div>
        <div style="text-align: right;">
            <div style="font-size: 0.8rem; color: var(--text-muted);">Package Price</div>
            <div id="package-unit-price" data-price="<?php echo $package['price']; ?>" style="font-size: 1.25rem; font-weight: 700; color: var(--primary-dark);">
                ₹<?php echo number_format($package['price'], 2); ?>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">per person</div>
        </div>
    </div>

    <?php if (!empty($errors)): ?>
        <div class="alert alert-danger">
            <div>
                <strong>Please resolve the following:</strong>
                <ul style="margin-left: 20px; margin-top: 4px;">
                    <?php foreach ($errors as $err): ?>
                        <li><?php echo htmlspecialchars($err); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    <?php endif; ?>

    <form action="booking.php" method="POST" autocomplete="off" id="bookingForm">
        <input type="hidden" name="package_id" value="<?php echo $package['id']; ?>">

        <div class="form-group">
            <label>Customer Name</label>
            <input type="text" class="form-control" value="<?php echo htmlspecialchars($_SESSION['user_name']); ?> (<?php echo htmlspecialchars($_SESSION['user_email']); ?>)" readonly style="background: #f1f5f9; cursor: not-allowed;">
        </div>

        <div class="form-group">
            <label for="travel_date">Travel Date <span style="color: var(--danger-color);">*</span></label>
            <input type="date" id="travel_date" name="travel_date" class="form-control" value="<?php echo htmlspecialchars($travel_date); ?>" required>
            <span class="form-help">Please select your preferred departure date</span>
        </div>

        <div class="form-group">
            <label for="persons">Number of Persons <span style="color: var(--danger-color);">*</span></label>
            <input type="number" id="persons" name="persons" class="form-control" min="1" max="50" value="<?php echo htmlspecialchars($persons); ?>" required>
            <span class="form-help">Total price updates automatically based on person count</span>
        </div>

        <!-- Live Price Calculation Breakdown -->
        <div class="calc-summary-box">
            <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 8px; color: var(--primary-dark);">
                📊 Booking Price Summary (Formula: Price &times; Persons)
            </div>
            <div class="calc-summary-row">
                <span>Unit Price per Person:</span>
                <span>₹<?php echo number_format($package['price'], 2); ?></span>
            </div>
            <div class="calc-summary-row total">
                <span>Calculated Total Price:</span>
                <span id="calc-total-price">₹<?php echo number_format($initial_total, 2); ?></span>
            </div>
        </div>

        <button type="submit" class="btn btn-accent btn-block" style="padding: 13px; font-size: 1.05rem;">
            Confirm &amp; Book Package &rarr;
        </button>
    </form>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>`
  },
  {
    name: "confirmation.php",
    path: "confirmation.php",
    category: "customer",
    language: "php",
    description: "Booking receipt view with Reference ID, details, and print capability.",
    content: `<?php
/**
 * TravelEase – Booking Confirmation Receipt (confirmation.php)
 * Displays successful booking summary and receipt
 */
$page_title = "Booking Confirmation";
require_once __DIR__ . '/config/database.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$booking_id = isset($_GET['booking_id']) ? (int)$_GET['booking_id'] : 0;

if ($booking_id <= 0) {
    header("Location: my_bookings.php");
    exit();
}

$sql = "SELECT b.*, p.name AS package_name, p.destination, p.days, p.price AS unit_price, u.name AS customer_name, u.email AS customer_email
        FROM bookings b
        JOIN packages p ON b.package_id = p.id
        JOIN users u ON b.user_id = u.id
        WHERE b.id = ? LIMIT 1";

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $booking_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$booking = mysqli_fetch_assoc($result);
mysqli_stmt_close($stmt);

if (!$booking || ($_SESSION['user_role'] !== 'admin' && (int)$booking['user_id'] !== (int)$_SESSION['user_id'])) {
    header("Location: my_bookings.php");
    exit();
}

require_once __DIR__ . '/includes/header.php';
?>

<div class="confirmation-card">
    <div class="confirmation-icon">🎉</div>
    <h2>Booking Confirmed Successfully!</h2>
    <p style="color: var(--text-muted);">Thank you, <?php echo htmlspecialchars($booking['customer_name']); ?>! Your travel reservation has been processed.</p>

    <div class="booking-receipt">
        <div class="receipt-row">
            <span>Booking Reference ID:</span>
            <strong>#TE-<?php echo str_pad($booking['id'], 5, "0", STR_PAD_LEFT); ?></strong>
        </div>
        <div class="receipt-row">
            <span>Package Name:</span>
            <strong><?php echo htmlspecialchars($booking['package_name']); ?></strong>
        </div>
        <div class="receipt-row">
            <span>Destination:</span>
            <span>📍 <?php echo htmlspecialchars($booking['destination']); ?></span>
        </div>
        <div class="receipt-row">
            <span>Duration:</span>
            <span>⏱️ <?php echo htmlspecialchars($booking['days']); ?> Days</span>
        </div>
        <div class="receipt-row">
            <span>Travel Departure Date:</span>
            <strong>📅 <?php echo date("F d, Y", strtotime($booking['travel_date'])); ?></strong>
        </div>
        <div class="receipt-row">
            <span>Number of Travelers:</span>
            <span>👥 <?php echo htmlspecialchars($booking['persons']); ?> Person(s)</span>
        </div>
        <div class="receipt-row">
            <span>Package Rate per Person:</span>
            <span>₹<?php echo number_format($booking['unit_price'], 2); ?></span>
        </div>
        <div class="receipt-row highlight">
            <span>Total Amount Paid / Due:</span>
            <span>₹<?php echo number_format($booking['total_price'], 2); ?></span>
        </div>
        <div class="receipt-row">
            <span>Booking Status:</span>
            <span class="status-badge status-confirmed">✅ <?php echo htmlspecialchars($booking['status']); ?></span>
        </div>
    </div>

    <div style="display: flex; justify-content: center; gap: 15px; margin-top: 25px;">
        <a href="my_bookings.php" class="btn btn-primary">
            View All My Bookings &rarr;
        </a>
        <a href="packages.php" class="btn btn-outline">
            Browse More Packages
        </a>
        <button onclick="window.print()" class="btn btn-outline">
            🖨️ Print Receipt
        </button>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>`
  },
  {
    name: "my_bookings.php",
    path: "my_bookings.php",
    category: "customer",
    language: "php",
    description: "Personal bookings history filtered by logged-in customer's session ID.",
    content: `<?php
/**
 * TravelEase – Customer Bookings (my_bookings.php)
 * Lists all reservations made by the currently logged-in customer
 */
$page_title = "My Bookings";
require_once __DIR__ . '/config/database.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_id = (int)$_SESSION['user_id'];

$sql = "SELECT b.id AS booking_id, b.travel_date, b.persons, b.total_price, b.status, b.created_at,
               p.id AS package_id, p.name AS package_name, p.destination, p.days
        FROM bookings b
        JOIN packages p ON b.package_id = p.id
        WHERE b.user_id = ?
        ORDER BY b.id DESC";

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

require_once __DIR__ . '/includes/header.php';
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; flex-wrap: wrap; gap: 10px;">
    <div>
        <h2>My Travel Bookings</h2>
        <p style="color: var(--text-muted);">Manage and review your confirmed holiday itineraries</p>
    </div>
    <a href="packages.php" class="btn btn-accent btn-sm">+ Book New Package</a>
</div>

<?php if ($result && mysqli_num_rows($result) > 0): ?>
    <div class="table-responsive">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Package &amp; Destination</th>
                    <th>Travel Date</th>
                    <th>Persons</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($row = mysqli_fetch_assoc($result)): ?>
                    <tr>
                        <td>
                            <strong>#TE-<?php echo str_pad($row['booking_id'], 5, "0", STR_PAD_LEFT); ?></strong>
                        </td>
                        <td>
                            <div style="font-weight: 600; color: var(--text-dark);">
                                <?php echo htmlspecialchars($row['package_name']); ?>
                            </div>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">
                                📍 <?php echo htmlspecialchars($row['destination']); ?> (<?php echo htmlspecialchars($row['days']); ?> Days)
                            </div>
                        </td>
                        <td>
                            📅 <?php echo date("M d, Y", strtotime($row['travel_date'])); ?>
                        </td>
                        <td>
                            👥 <?php echo htmlspecialchars($row['persons']); ?>
                        </td>
                        <td>
                            <strong style="color: var(--primary-dark);">₹<?php echo number_format($row['total_price'], 2); ?></strong>
                        </td>
                        <td>
                            <span class="status-badge status-confirmed">
                                <?php echo htmlspecialchars($row['status']); ?>
                            </span>
                        </td>
                        <td>
                            <a href="confirmation.php?booking_id=<?php echo $row['booking_id']; ?>" class="btn btn-outline btn-sm">
                                View Receipt
                            </a>
                        </td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </div>
<?php else: ?>
    <div style="background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 40px; text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 10px;">🎒</div>
        <h3>No Bookings Found</h3>
        <p style="color: var(--text-muted); margin-top: 6px; margin-bottom: 20px;">You haven't booked any travel packages yet.</p>
        <a href="packages.php" class="btn btn-primary">Browse Available Packages &rarr;</a>
    </div>
<?php endif; ?>

<?php
mysqli_stmt_close($stmt);
require_once __DIR__ . '/includes/footer.php';
?>`
  },
  {
    name: "dashboard.php",
    path: "admin/dashboard.php",
    category: "admin",
    language: "php",
    description: "Admin panel dashboard with statistics, package management table, and action triggers.",
    content: `<?php
/**
 * TravelEase – Admin Dashboard (admin/dashboard.php)
 * Central administrative panel for managing travel packages and viewing statistics
 */
$page_title = "Admin Dashboard";
require_once __DIR__ . '/../config/database.php';

// Strict Role-Based Access Control: Admin only
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    header("Location: ../login.php");
    exit();
}

$stat_packages = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS total FROM packages"))['total'] ?? 0;
$stat_bookings = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS total FROM bookings"))['total'] ?? 0;
$stat_customers = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS total FROM users WHERE role = 'customer'"))['total'] ?? 0;
$stat_revenue = mysqli_fetch_assoc(mysqli_query($conn, "SELECT SUM(total_price) AS total FROM bookings WHERE status = 'Confirmed'"))['total'] ?? 0;

$packages_sql = "SELECT * FROM packages ORDER BY id DESC";
$packages_result = mysqli_query($conn, $packages_sql);

$msg = "";
if (isset($_GET['added'])) {
    $msg = "New travel package was added successfully!";
} elseif (isset($_GET['updated'])) {
    $msg = "Travel package was updated successfully!";
} elseif (isset($_GET['deleted'])) {
    $msg = "Travel package has been deleted successfully!";
}

require_once __DIR__ . '/../includes/header.php';
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; flex-wrap: wrap; gap: 15px;">
    <div>
        <h2>Admin Management Dashboard</h2>
        <p style="color: var(--text-muted);">Welcome, <?php echo htmlspecialchars($_SESSION['user_name']); ?> &bull; System Control Panel</p>
    </div>
    <div style="display: flex; gap: 10px;">
        <a href="add_package.php" class="btn btn-primary">+ Add New Package</a>
        <a href="bookings.php" class="btn btn-outline">View All Bookings</a>
    </div>
</div>

<?php if ($msg): ?>
    <div class="alert alert-success">
        <span>✅ <?php echo htmlspecialchars($msg); ?></span>
    </div>
<?php endif; ?>

<!-- System Statistics Overview Cards -->
<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-info">
            <h3><?php echo number_format($stat_packages); ?></h3>
            <p>Active Packages</p>
        </div>
    </div>

    <div class="stat-card">
        <div class="stat-icon">📅</div>
        <div class="stat-info">
            <h3><?php echo number_format($stat_bookings); ?></h3>
            <p>Total Bookings</p>
        </div>
    </div>

    <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-info">
            <h3><?php echo number_format($stat_customers); ?></h3>
            <p>Registered Customers</p>
        </div>
    </div>

    <div class="stat-card">
        <div class="stat-icon">💰</div>
        <div class="stat-info">
            <h3>₹<?php echo number_format($stat_revenue, 2); ?></h3>
            <p>Total Booking Revenue</p>
        </div>
    </div>
</div>

<div style="margin-top: 30px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3>Manage Travel Packages</h3>
        <span style="font-size: 0.85rem; color: var(--text-muted);"><?php echo mysqli_num_rows($packages_result); ?> total packages in database</span>
    </div>

    <?php if ($packages_result && mysqli_num_rows($packages_result) > 0): ?>
        <div class="table-responsive">
            <table class="data-table">
                <thead>
                    <tr>
                        <th style="width: 60px;">ID</th>
                        <th>Package Name</th>
                        <th>Destination</th>
                        <th>Duration</th>
                        <th>Unit Price</th>
                        <th style="text-align: right;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($pkg = mysqli_fetch_assoc($packages_result)): ?>
                        <tr>
                            <td>#<?php echo $pkg['id']; ?></td>
                            <td>
                                <strong><?php echo htmlspecialchars($pkg['name']); ?></strong>
                            </td>
                            <td>📍 <?php echo htmlspecialchars($pkg['destination']); ?></td>
                            <td>⏱️ <?php echo htmlspecialchars($pkg['days']); ?> Days</td>
                            <td><strong>₹<?php echo number_format($pkg['price'], 2); ?></strong></td>
                            <td style="text-align: right;">
                                <a href="../package_details.php?id=<?php echo $pkg['id']; ?>" class="btn btn-outline btn-sm" title="Preview Package" target="_blank">
                                    Preview
                                </a>
                                <a href="edit_package.php?id=<?php echo $pkg['id']; ?>" class="btn btn-primary btn-sm" title="Edit Package">
                                    Edit
                                </a>
                                <a href="delete_package.php?id=<?php echo $pkg['id']; ?>" 
                                   class="btn btn-danger btn-sm btn-delete-confirm" 
                                   data-name="<?php echo htmlspecialchars($pkg['name']); ?>"
                                   title="Delete Package">
                                    Delete
                                </a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    <?php else: ?>
        <div style="background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 30px; text-align: center;">
            <p style="color: var(--text-muted);">No packages currently available.</p>
            <a href="add_package.php" class="btn btn-primary" style="margin-top: 10px;">+ Create Your First Package</a>
        </div>
    <?php endif; ?>
</div>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>`
  },
  {
    name: "add_package.php",
    path: "admin/add_package.php",
    category: "admin",
    language: "php",
    description: "Admin form to create a new vacation package with prepared INSERT statement.",
    content: `<?php
/**
 * TravelEase – Add Travel Package (admin/add_package.php)
 * Form for adding a new travel package with field validation
 */
$page_title = "Add Travel Package";
require_once __DIR__ . '/../config/database.php';

// Strict Role-Based Access Control: Admin only
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    header("Location: ../login.php");
    exit();
}

$errors = [];
$name = "";
$destination = "";
$days = "";
$price = "";
$description = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $destination = trim($_POST['destination'] ?? '');
    $days = trim($_POST['days'] ?? '');
    $price = trim($_POST['price'] ?? '');
    $description = trim($_POST['description'] ?? '');

    // Form validation
    if (empty($name)) {
        $errors[] = "Please enter the package name.";
    }
    if (empty($destination)) {
        $errors[] = "Please enter the destination.";
    }
    if (empty($days) || !is_numeric($days) || (int)$days <= 0) {
        $errors[] = "Duration must be a positive number of days (at least 1).";
    }
    if (empty($price) || !is_numeric($price) || (float)$price <= 0) {
        $errors[] = "Price must be a valid positive amount.";
    }
    if (empty($description)) {
        $errors[] = "Please enter a detailed description for the package.";
    }

    if (empty($errors)) {
        $insert_sql = "INSERT INTO packages (name, destination, days, price, description) 
                       VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $insert_sql);
        $int_days = (int)$days;
        $float_price = (float)$price;

        mysqli_stmt_bind_param($stmt, "ssids", $name, $destination, $int_days, $float_price, $description);

        if (mysqli_stmt_execute($stmt)) {
            mysqli_stmt_close($stmt);
            header("Location: dashboard.php?added=1");
            exit();
        } else {
            $errors[] = "Failed to insert package into database: " . mysqli_error($conn);
        }
    }
}

require_once __DIR__ . '/../includes/header.php';
?>

<div style="margin-bottom: 20px;">
    <a href="dashboard.php" class="btn btn-outline btn-sm">&larr; Back to Admin Dashboard</a>
</div>

<div class="form-card form-card-wide">
    <div class="form-header">
        <h2>Add New Travel Package</h2>
        <p>Publish a new holiday destination package to the customer catalog</p>
    </div>

    <?php if (!empty($errors)): ?>
        <div class="alert alert-danger">
            <div>
                <strong>Validation Errors:</strong>
                <ul style="margin-left: 20px; margin-top: 4px;">
                    <?php foreach ($errors as $err): ?>
                        <li><?php echo htmlspecialchars($err); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    <?php endif; ?>

    <form action="add_package.php" method="POST" autocomplete="off">
        <div class="form-group">
            <label for="name">Package Name <span style="color: var(--danger-color);">*</span></label>
            <input type="text" id="name" name="name" class="form-control" placeholder="e.g. Goa Beach Holiday" value="<?php echo htmlspecialchars($name); ?>" required>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
                <label for="destination">Destination <span style="color: var(--danger-color);">*</span></label>
                <input type="text" id="destination" name="destination" class="form-control" placeholder="e.g. Goa" value="<?php echo htmlspecialchars($destination); ?>" required>
            </div>

            <div class="form-group">
                <label for="days">Duration (Days) <span style="color: var(--danger-color);">*</span></label>
                <input type="number" id="days" name="days" class="form-control" min="1" max="60" placeholder="e.g. 4" value="<?php echo htmlspecialchars($days); ?>" required>
            </div>
        </div>

        <div class="form-group">
            <label for="price">Price per Person (₹) <span style="color: var(--danger-color);">*</span></label>
            <input type="number" id="price" name="price" class="form-control" step="0.01" min="100" placeholder="e.g. 8500.00" value="<?php echo htmlspecialchars($price); ?>" required>
        </div>

        <div class="form-group">
            <label for="description">Detailed Description &amp; Itinerary <span style="color: var(--danger-color);">*</span></label>
            <textarea id="description" name="description" class="form-control" rows="5" required><?php echo htmlspecialchars($description); ?></textarea>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 25px;">
            <button type="submit" class="btn btn-primary btn-block" style="padding: 12px;">
                Save &amp; Publish Package &rarr;
            </button>
            <a href="dashboard.php" class="btn btn-outline" style="padding: 12px 20px;">
                Cancel
            </a>
        </div>
    </form>
</div>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>`
  },
  {
    name: "edit_package.php",
    path: "admin/edit_package.php",
    category: "admin",
    language: "php",
    description: "Form to update package details using prepared SQL UPDATE statements.",
    content: `<?php
/**
 * TravelEase – Edit Travel Package (admin/edit_package.php)
 * Form for editing an existing travel package with prepared statement updates
 */
$page_title = "Edit Travel Package";
require_once __DIR__ . '/../config/database.php';

// Strict Role-Based Access Control: Admin only
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    header("Location: ../login.php");
    exit();
}

$errors = [];
$package_id = isset($_REQUEST['id']) ? (int)$_REQUEST['id'] : 0;

if ($package_id <= 0) {
    header("Location: dashboard.php");
    exit();
}

$sql = "SELECT * FROM packages WHERE id = ? LIMIT 1";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $package_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$package = mysqli_fetch_assoc($result);
mysqli_stmt_close($stmt);

if (!$package) {
    header("Location: dashboard.php");
    exit();
}

$name = $package['name'];
$destination = $package['destination'];
$days = $package['days'];
$price = $package['price'];
$description = $package['description'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $destination = trim($_POST['destination'] ?? '');
    $days = trim($_POST['days'] ?? '');
    $price = trim($_POST['price'] ?? '');
    $description = trim($_POST['description'] ?? '');

    if (empty($name)) {
        $errors[] = "Please enter the package name.";
    }
    if (empty($destination)) {
        $errors[] = "Please enter the destination.";
    }
    if (empty($days) || !is_numeric($days) || (int)$days <= 0) {
        $errors[] = "Duration must be a positive number of days.";
    }
    if (empty($price) || !is_numeric($price) || (float)$price <= 0) {
        $errors[] = "Price must be a valid positive amount.";
    }
    if (empty($description)) {
        $errors[] = "Please enter a detailed description for the package.";
    }

    if (empty($errors)) {
        $update_sql = "UPDATE packages SET name = ?, destination = ?, days = ?, price = ?, description = ? WHERE id = ?";
        $update_stmt = mysqli_prepare($conn, $update_sql);
        $int_days = (int)$days;
        $float_price = (float)$price;

        mysqli_stmt_bind_param($update_stmt, "ssidsi", $name, $destination, $int_days, $float_price, $description, $package_id);

        if (mysqli_stmt_execute($update_stmt)) {
            mysqli_stmt_close($update_stmt);
            header("Location: dashboard.php?updated=1");
            exit();
        } else {
            $errors[] = "Failed to update package: " . mysqli_error($conn);
        }
    }
}

require_once __DIR__ . '/../includes/header.php';
?>

<div style="margin-bottom: 20px;">
    <a href="dashboard.php" class="btn btn-outline btn-sm">&larr; Back to Admin Dashboard</a>
</div>

<div class="form-card form-card-wide">
    <div class="form-header">
        <h2>Edit Travel Package</h2>
        <p>Updating package details for <strong>#<?php echo $package_id; ?> – <?php echo htmlspecialchars($package['name']); ?></strong></p>
    </div>

    <?php if (!empty($errors)): ?>
        <div class="alert alert-danger">
            <div>
                <strong>Validation Errors:</strong>
                <ul style="margin-left: 20px; margin-top: 4px;">
                    <?php foreach ($errors as $err): ?>
                        <li><?php echo htmlspecialchars($err); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    <?php endif; ?>

    <form action="edit_package.php?id=<?php echo $package_id; ?>" method="POST" autocomplete="off">
        <div class="form-group">
            <label for="name">Package Name <span style="color: var(--danger-color);">*</span></label>
            <input type="text" id="name" name="name" class="form-control" value="<?php echo htmlspecialchars($name); ?>" required>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
                <label for="destination">Destination <span style="color: var(--danger-color);">*</span></label>
                <input type="text" id="destination" name="destination" class="form-control" value="<?php echo htmlspecialchars($destination); ?>" required>
            </div>

            <div class="form-group">
                <label for="days">Duration (Days) <span style="color: var(--danger-color);">*</span></label>
                <input type="number" id="days" name="days" class="form-control" min="1" max="60" value="<?php echo htmlspecialchars($days); ?>" required>
            </div>
        </div>

        <div class="form-group">
            <label for="price">Price per Person (₹) <span style="color: var(--danger-color);">*</span></label>
            <input type="number" id="price" name="price" class="form-control" step="0.01" min="100" value="<?php echo htmlspecialchars($price); ?>" required>
        </div>

        <div class="form-group">
            <label for="description">Detailed Description &amp; Itinerary <span style="color: var(--danger-color);">*</span></label>
            <textarea id="description" name="description" class="form-control" rows="5" required><?php echo htmlspecialchars($description); ?></textarea>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 25px;">
            <button type="submit" class="btn btn-primary btn-block" style="padding: 12px;">
                Update Package Changes &rarr;
            </button>
            <a href="dashboard.php" class="btn btn-outline" style="padding: 12px 20px;">
                Cancel
            </a>
        </div>
    </form>
</div>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>`
  },
  {
    name: "delete_package.php",
    path: "admin/delete_package.php",
    category: "admin",
    language: "php",
    description: "Admin script to delete package with SQL foreign key cascade handling.",
    content: `<?php
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
?>`
  },
  {
    name: "bookings.php",
    path: "admin/bookings.php",
    category: "admin",
    language: "php",
    description: "Master administrative overview of all bookings placed across the system.",
    content: `<?php
/**
 * TravelEase – Customer Bookings Management (admin/bookings.php)
 * Displays all customer bookings across the system with customer and package details
 */
$page_title = "Customer Bookings";
require_once __DIR__ . '/../config/database.php';

// Strict Role-Based Access Control: Admin only
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    header("Location: ../login.php");
    exit();
}

$sql = "SELECT b.id AS booking_id, b.travel_date, b.persons, b.total_price, b.status, b.created_at,
               u.id AS user_id, u.name AS customer_name, u.email AS customer_email,
               p.id AS package_id, p.name AS package_name, p.destination, p.days, p.price AS unit_price
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN packages p ON b.package_id = p.id
        ORDER BY b.id DESC";

$result = mysqli_query($conn, $sql);

require_once __DIR__ . '/../includes/header.php';
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; flex-wrap: wrap; gap: 15px;">
    <div>
        <h2>All Customer Bookings</h2>
        <p style="color: var(--text-muted);">Review every vacation package reservation placed in the system</p>
    </div>
    <div style="display: flex; gap: 10px;">
        <a href="dashboard.php" class="btn btn-outline btn-sm">&larr; Back to Dashboard</a>
        <a href="add_package.php" class="btn btn-primary btn-sm">+ Add Package</a>
    </div>
</div>

<?php if ($result && mysqli_num_rows($result) > 0): ?>
    <div class="table-responsive">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Customer Details</th>
                    <th>Package &amp; Destination</th>
                    <th>Travel Date</th>
                    <th>Persons</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Date Booked</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($row = mysqli_fetch_assoc($result)): ?>
                    <tr>
                        <td>
                            <strong>#TE-<?php echo str_pad($row['booking_id'], 5, "0", STR_PAD_LEFT); ?></strong>
                        </td>
                        <td>
                            <div style="font-weight: 600;"><?php echo htmlspecialchars($row['customer_name']); ?></div>
                            <div style="font-size: 0.8rem; color: var(--text-muted);"><?php echo htmlspecialchars($row['customer_email']); ?></div>
                        </td>
                        <td>
                            <div style="font-weight: 600; color: var(--primary-dark);">
                                <?php echo htmlspecialchars($row['package_name']); ?>
                            </div>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">
                                📍 <?php echo htmlspecialchars($row['destination']); ?> (<?php echo htmlspecialchars($row['days']); ?> Days)
                            </div>
                        </td>
                        <td>
                            📅 <?php echo date("M d, Y", strtotime($row['travel_date'])); ?>
                        </td>
                        <td>
                            👥 <?php echo htmlspecialchars($row['persons']); ?>
                        </td>
                        <td>
                            <strong style="color: var(--primary-dark); font-size: 1rem;">
                                ₹<?php echo number_format($row['total_price'], 2); ?>
                            </strong>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">
                                (₹<?php echo number_format($row['unit_price'], 2); ?> &times; <?php echo $row['persons']; ?>)
                            </div>
                        </td>
                        <td>
                            <span class="status-badge status-confirmed">
                                <?php echo htmlspecialchars($row['status']); ?>
                            </span>
                        </td>
                        <td style="font-size: 0.82rem; color: var(--text-muted);">
                            <?php echo date("Y-m-d H:i", strtotime($row['created_at'])); ?>
                        </td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </div>
<?php else: ?>
    <div style="background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 40px; text-align: center;">
        <p style="color: var(--text-muted);">No bookings recorded in the system yet.</p>
    </div>
<?php endif; ?>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>`
  },
  {
    name: "style.css",
    path: "css/style.css",
    category: "shared",
    language: "css",
    description: "Responsive travel-themed CSS stylesheet for navigation, cards, tables, and receipts.",
    content: `/* TravelEase – Main CSS Stylesheet */
:root {
    --primary-color: #0284c7;
    --primary-dark: #0369a1;
    --primary-light: #e0f2fe;
    --accent-color: #f97316;
    --accent-hover: #ea580c;
    --text-dark: #1e293b;
    --text-muted: #64748b;
    --bg-light: #f8fafc;
    --card-bg: #ffffff;
    --border-color: #e2e8f0;
    --success-color: #10b981;
    --danger-color: #ef4444;
    --warning-color: #f59e0b;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
    --radius: 8px;
    --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--font-stack); background-color: var(--bg-light); color: var(--text-dark); line-height: 1.6; }
.container { width: 90%; max-width: 1140px; margin: 0 auto; padding: 0 15px; }

/* Navigation Bar */
.navbar { background: #ffffff; border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 100; box-shadow: var(--shadow-sm); }
.navbar .nav-container { display: flex; justify-content: space-between; align-items: center; padding: 14px 15px; max-width: 1140px; margin: 0 auto; }
.brand-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; font-size: 1.4rem; font-weight: 700; color: var(--primary-dark); }
.brand-logo span.accent { color: var(--accent-color); }
.nav-links { list-style: none; display: flex; align-items: center; gap: 20px; }
.nav-links a { text-decoration: none; color: var(--text-dark); font-weight: 500; font-size: 0.95rem; }
.nav-badge { background: var(--primary-light); color: var(--primary-dark); font-size: 0.8rem; padding: 4px 8px; border-radius: 12px; font-weight: 600; }

/* Hero Section */
.hero { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 60px 0; text-align: center; margin-bottom: 40px; border-radius: 0 0 20px 20px; }
.hero h1 { font-size: 2.6rem; font-weight: 800; margin-bottom: 12px; }
.hero p { font-size: 1.15rem; opacity: 0.92; max-width: 650px; margin: 0 auto 24px auto; }
.hero-actions { display: flex; justify-content: center; gap: 15px; }

/* Cards & Grid */
.packages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 25px; }
.package-card { background: var(--card-bg); border-radius: var(--radius); border: 1px solid var(--border-color); overflow: hidden; display: flex; flex-direction: column; transition: transform 0.25s ease; }
.package-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.card-header-badge { background: linear-gradient(135deg, #0284c7, #38bdf8); color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; }
.card-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
.card-title { font-size: 1.25rem; color: var(--text-dark); margin-bottom: 8px; font-weight: 700; }
.card-desc { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px; flex: 1; }
.card-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid var(--border-color); }
.card-price .amount { font-size: 1.3rem; font-weight: 700; color: var(--primary-dark); }

/* Forms & Tables */
.form-card { max-width: 480px; margin: 20px auto; background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius); padding: 30px; box-shadow: var(--shadow-sm); }
.form-card-wide { max-width: 650px; }
.form-control { width: 100%; padding: 10px 14px; font-size: 0.95rem; border: 1px solid var(--border-color); border-radius: 6px; }
.table-responsive { overflow-x: auto; background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius); }
.data-table { width: 100%; border-collapse: collapse; text-align: left; }
.data-table th, .data-table td { padding: 14px 16px; border-bottom: 1px solid var(--border-color); }
.data-table th { background: #f1f5f9; color: var(--text-dark); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; }`
  },
  {
    name: "script.js",
    path: "js/script.js",
    category: "shared",
    language: "javascript",
    description: "Client-side price calculation logic (Price * Persons) and form date minimum validation.",
    content: `/**
 * TravelEase – Client-Side JavaScript
 * Dynamic price calculation: total_price = package unit price * number of persons
 */
document.addEventListener("DOMContentLoaded", function () {
    const personsInput = document.getElementById("persons");
    const packagePriceElement = document.getElementById("package-unit-price");
    const dynamicTotalElement = document.getElementById("calc-total-price");

    if (personsInput && packagePriceElement && dynamicTotalElement) {
        function updateTotalPrice() {
            const unitPrice = parseFloat(packagePriceElement.getAttribute("data-price")) || 0;
            let persons = parseInt(personsInput.value, 10);

            if (isNaN(persons) || persons < 1) {
                persons = 1;
            }

            const totalPrice = unitPrice * persons;
            dynamicTotalElement.textContent = "₹" + totalPrice.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }

        personsInput.addEventListener("input", updateTotalPrice);
        personsInput.addEventListener("change", updateTotalPrice);
        updateTotalPrice();
    }

    const travelDateInput = document.getElementById("travel_date");
    if (travelDateInput) {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        travelDateInput.min = \`\${yyyy}-\${mm}-\${dd}\`;
    }
});`
  }
];
