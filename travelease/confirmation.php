<?php
/**
 * TravelEase – Booking Confirmation Receipt (confirmation.php)
 * Displays successful booking summary and receipt
 */
$page_title = "Booking Confirmation";
require_once __DIR__ . '/config/database.php';

// Authentication check
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$booking_id = isset($_GET['booking_id']) ? (int)$_GET['booking_id'] : 0;

if ($booking_id <= 0) {
    header("Location: my_bookings.php");
    exit();
}

// Fetch booking record with joined package and user details
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

// Ensure the logged-in customer owns this booking (or admin viewing)
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
        <div class="receipt-row">
            <span>Booking Timestamp:</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);"><?php echo htmlspecialchars($booking['created_at']); ?></span>
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

<?php require_once __DIR__ . '/includes/footer.php'; ?>
