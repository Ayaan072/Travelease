<?php
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

// Fetch all bookings joined with users and packages
$sql = "SELECT b.id AS booking_id, b.travel_date, b.persons, b.total_price, b.status, b.created_at,
               u.id AS user_id, u.name AS customer_name, u.email AS customer_email,
               p.id AS package_id, p.name AS package_name, p.destination, p.days, p.price AS unit_price
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN packages p ON b.package_id = p.id
        ORDER BY b.id DESC";

$result = mysqli_query($conn, $sql);
$total_bookings_count = $result ? mysqli_num_rows($result) : 0;

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

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
