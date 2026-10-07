<?php
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

// Fetch current package data
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

// Initialize form variables with existing package details
$name = $package['name'];
$destination = $package['destination'];
$days = $package['days'];
$price = $package['price'];
$description = $package['description'];

// Handle update form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $destination = trim($_POST['destination'] ?? '');
    $days = trim($_POST['days'] ?? '');
    $price = trim($_POST['price'] ?? '');
    $description = trim($_POST['description'] ?? '');

    // Validation
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

    // Execute update statement
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

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
