<?php
/**
 * TravelEase – Footer Include File
 */
// Determine base URL path for js/script.js
$is_admin_folder = strpos($_SERVER['SCRIPT_NAME'], '/admin/') !== false;
$path_prefix = $is_admin_folder ? '../' : './';
?>
        </div><!-- /.container -->
    </main>

    <footer>
        <div class="container footer-content">
            <p><strong>TravelEase</strong> – Travel Package Booking System</p>
            <p>Designed for College Software Engineering & Testing Project (Demonstration of SRS, SDLC & Testing)</p>
            <p>&copy; <?php echo date('Y'); ?> TravelEase. Simple PHP &amp; MySQL Modular Architecture.</p>
        </div>
    </footer>

    <script src="<?php echo $path_prefix; ?>js/script.js"></script>
</body>
</html>
