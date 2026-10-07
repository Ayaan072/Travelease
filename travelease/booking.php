<?php
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

// Admin restriction: Admins cannot book customer packages
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

// Fetch package details
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

// Default values
$travel_date = $_POST['travel_date'] ?? '';
$persons = isset($_POST['persons']) ? (int)$_POST['persons'] : 1;
$unit_price = (float)$package['price'];
$initial_total = $unit_price * max(1, $persons);

// Handle Booking Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $travel_date = trim($_POST['travel_date'] ?? '');
    $persons = isset($_POST['persons']) ? (int)$_POST['persons'] : 0;

    // Validation
    if (empty($travel_date)) {
        $errors[] = "Please select a preferred travel start date.";
    } else {
        $selected_timestamp = strtotime($travel_date);
        $today_timestamp = strtotime(date('Y-m-d'));
        if ($selected_timestamp < $today_timestamp) {
            $errors[] = "Travel date cannot be in the past. Please select an upcoming date.";
        }
    }

    if ($persons < 1) {
        $errors[] = "Number of persons must be at least 1.";
    } elseif ($persons > 50) {
        $errors[] = "For group bookings larger than 50 persons, please contact our helpline.";
    }

    // Save booking if validations pass
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

            // Redirect to booking confirmation receipt
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
    <div style="background: var(--bg-light); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: gap;">
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

        <!-- Customer Identity Info (Read-only display for clarity) -->
        <div class="form-group">
            <label>Customer Name</label>
            <input type="text" class="form-control" value="<?php echo htmlspecialchars($_SESSION['user_name']); ?> (<?php echo htmlspecialchars($_SESSION['user_email']); ?>)" readonly style="background: #f1f5f9; cursor: not-allowed;">
        </div>

        <!-- Travel Date Input -->
        <div class="form-group">
            <label for="travel_date">Travel Date <span style="color: var(--danger-color);">*</span></label>
            <input type="date" id="travel_date" name="travel_date" class="form-control" value="<?php echo htmlspecialchars($travel_date); ?>" required>
            <span class="form-help">Please select your preferred departure date</span>
        </div>

        <!-- Number of Persons Input -->
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

<?php require_once __DIR__ . '/includes/footer.php'; ?>
