<?php
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

// Fetch package details safely using prepared statement
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
    echo '<div class="alert alert-danger" style="margin-top: 30px;">Package not found or may have been removed. <a href="packages.php">Return to packages catalog</a>.</div>';
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
            <span class="badge badge-accent">⏱️ Duration: <?php echo htmlspecialchars($package['days']); ?> Days / <?php echo max(1, (int)$package['days'] - 1); ?> Nights</span>
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
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px;">
                    New customer? <a href="register.php">Register here</a>
                </p>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
