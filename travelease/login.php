<?php
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

// Display registration success notification
if (isset($_GET['registered'])) {
    $success_msg = "Account created successfully! Please login with your credentials.";
}

// Display logout message
if (isset($_GET['logged_out'])) {
    $success_msg = "You have been logged out successfully.";
}

// Handle login form submission
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
        // Prepare SQL statement to prevent SQL injection
        $sql = "SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($user = mysqli_fetch_assoc($result)) {
            // Verify password hash
            if (password_verify($password, $user['password'])) {
                // Initialize session variables
                $_SESSION['user_id'] = (int)$user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_role'] = $user['role'];

                // Role-based redirection
                if ($user['role'] === 'admin') {
                    header("Location: admin/dashboard.php");
                } else {
                    // If user was redirected from a booking attempt, preserve destination
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

<?php require_once __DIR__ . '/includes/footer.php'; ?>
