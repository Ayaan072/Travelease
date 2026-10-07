<?php
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

    // Insert package into database
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
            <span class="form-help">Enter package price in INR</span>
        </div>

        <div class="form-group">
            <label for="description">Detailed Description &amp; Itinerary <span style="color: var(--danger-color);">*</span></label>
            <textarea id="description" name="description" class="form-control" rows="5" placeholder="Detail the attractions, resort accommodations, inclusions, activities..." required><?php echo htmlspecialchars($description); ?></textarea>
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

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
