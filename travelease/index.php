<?php
/**
 * TravelEase – Home Page (index.php)
 * Landing page displaying featured travel packages and system overview
 */
$page_title = "Explore Beautiful Destinations";
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/header.php';

// Fetch first 4 featured travel packages
$sql = "SELECT * FROM packages ORDER BY id ASC LIMIT 4";
$result = mysqli_query($conn, $sql);
?>

<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <h1>Discover Your Next Journey with TravelEase</h1>
        <p>Book curated holiday packages across India with transparent pricing, instant confirmation, and flexible scheduling.</p>
        <div class="hero-actions">
            <a href="packages.php" class="btn btn-accent">View All Packages 🌴</a>
            <?php if (!isset($_SESSION['user_id'])): ?>
                <a href="register.php" class="btn btn-outline" style="color: white; border-color: rgba(255,255,255,0.6);">Create Free Account</a>
            <?php else: ?>
                <a href="my_bookings.php" class="btn btn-outline" style="color: white; border-color: rgba(255,255,255,0.6);">My Bookings</a>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- Featured Packages Section -->
<section>
    <div class="section-header">
        <h2>Popular Travel Packages</h2>
        <p>Handpicked destinations with all-inclusive itineraries and verified accommodations</p>
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
                                <span class="label">Starting From</span>
                                <span class="amount">₹<?php echo number_format($row['price'], 2); ?></span>
                            </div>
                            <a href="package_details.php?id=<?php echo $row['id']; ?>" class="btn btn-primary btn-sm">View Details &rarr;</a>
                        </div>
                    </div>
                </div>
            <?php endwhile; ?>
        <?php else: ?>
            <p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No packages available currently. Check back soon!</p>
        <?php endif; ?>
    </div>

    <div style="text-align: center; margin-top: 35px;">
        <a href="packages.php" class="btn btn-outline">Explore All Travel Packages &rarr;</a>
    </div>
</section>

<!-- How It Works Section for Viva/Project Demonstration -->
<section style="margin-top: 60px; padding: 40px 0; border-top: 1px solid var(--border-color);">
    <div class="section-header">
        <h2>How TravelEase Works</h2>
        <p>Simple 3-step booking workflow designed for reliability and ease</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; text-align: center;">
        <div style="background: white; padding: 25px; border-radius: 8px; border: 1px solid var(--border-color);">
            <div style="font-size: 2.2rem; margin-bottom: 10px;">1️⃣</div>
            <h3 style="margin-bottom: 8px; font-size: 1.15rem;">Select Package</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted);">Browse through destination packages, inspect itineraries, durations, and pricing.</p>
        </div>
        <div style="background: white; padding: 25px; border-radius: 8px; border: 1px solid var(--border-color);">
            <div style="font-size: 2.2rem; margin-bottom: 10px;">2️⃣</div>
            <h3 style="margin-bottom: 8px; font-size: 1.15rem;">Enter Travelers &amp; Date</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted);">Choose your travel date and number of persons. Real-time dynamic total price is calculated.</p>
        </div>
        <div style="background: white; padding: 25px; border-radius: 8px; border: 1px solid var(--border-color);">
            <div style="font-size: 2.2rem; margin-bottom: 10px;">3️⃣</div>
            <h3 style="margin-bottom: 8px; font-size: 1.15rem;">Instant Confirmation</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted);">Confirm your booking and view your booking receipt with Booking ID in "My Bookings".</p>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
