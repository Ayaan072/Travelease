<?php
/**
 * TravelEase – Travel Packages Catalog (packages.php)
 * Lists all active vacation packages available for booking
 */
$page_title = "Travel Packages";
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/header.php';

// Fetch all packages ordered by ID
$sql = "SELECT * FROM packages ORDER BY id ASC";
$result = mysqli_query($conn, $sql);
?>

<div style="margin-bottom: 30px;">
    <h2>Explore All Travel Packages</h2>
    <p style="color: var(--text-muted);">Choose from our handpicked destinations and plan your dream vacation today</p>
</div>

<div class="packages-grid">
    <?php if ($result && mysqli_num_rows($result) > 0): ?>
        <?php while ($row = mysqli_fetch_assoc($result)): ?>
            <div class="package-card">
                <div class="card-header-badge">
                    <span class="card-destination">📍 <?php echo htmlspecialchars($row['destination']); ?></span>
                    <span class="card-duration">⏱️ <?php echo htmlspecialchars($row['days']); ?> Days</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title"><?php echo htmlspecialchars($row['name']); ?></h3>
                    <p class="card-desc"><?php echo htmlspecialchars($row['description']); ?></p>
                    <div class="card-footer">
                        <div class="card-price">
                            <span class="label">Per Person</span>
                            <span class="amount">₹<?php echo number_format($row['price'], 2); ?></span>
                        </div>
                        <a href="package_details.php?id=<?php echo $row['id']; ?>" class="btn btn-primary btn-sm">
                            View Details &rarr;
                        </a>
                    </div>
                </div>
            </div>
        <?php endwhile; ?>
    <?php else: ?>
        <div style="grid-column: 1/-1; background: white; padding: 40px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color);">
            <h3>No Packages Found</h3>
            <p style="color: var(--text-muted); margin-top: 6px;">There are no packages in the system yet. Please check back later or ask Admin to add packages.</p>
        </div>
    <?php endif; ?>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
