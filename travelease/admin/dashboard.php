<?php
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

// Fetch dashboard statistics
$stat_packages = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS total FROM packages"))['total'] ?? 0;
$stat_bookings = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS total FROM bookings"))['total'] ?? 0;
$stat_customers = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS total FROM users WHERE role = 'customer'"))['total'] ?? 0;
$stat_revenue = mysqli_fetch_assoc(mysqli_query($conn, "SELECT SUM(total_price) AS total FROM bookings WHERE status = 'Confirmed'"))['total'] ?? 0;

// Fetch all packages for management table
$packages_sql = "SELECT * FROM packages ORDER BY id DESC";
$packages_result = mysqli_query($conn, $packages_sql);

// Notifications
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

<!-- Packages Management Table -->
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

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
