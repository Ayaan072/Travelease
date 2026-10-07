<?php
/**
 * TravelEase – Customer Bookings (my_bookings.php)
 * Lists all reservations made by the currently logged-in customer
 */
$page_title = "My Bookings";
require_once __DIR__ . '/config/database.php';

// Authentication check
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_id = (int)$_SESSION['user_id'];

// Query only the logged-in user's bookings joined with package information
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
?>
