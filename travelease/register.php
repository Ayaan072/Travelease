<?php
/**
 * TravelEase – Customer Registration (register.php)
 * Handles customer account creation with validation and secure password hashing
 */
$page_title = "Customer Registration";
require_once __DIR__ . '/config/database.php';

$errors = [];
$success_msg = "";

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
            // Redirect to login page with success notification
            header("Location: login.php?registered=1");
            exit();
        } else {
            $errors[] = "Registration failed due to a system error. Please try again: " . mysqli_error($conn);
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

<?php require_once __DIR__ . '/includes/footer.php'; ?>
