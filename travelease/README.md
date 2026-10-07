# TravelEase – Travel Package Booking System
### College Software Engineering & Testing Project

A simple, modular, and beginner-friendly full-stack web application built using **PHP, MySQL, HTML5, CSS3, and JavaScript**, designed for local deployment using **XAMPP**.

---

## 🌟 User Roles & Capabilities

### 1. Customer
- **Register**: New customers can create an account with name, email, and password.
- **Login & Logout**: Secure session-based authentication (`$_SESSION`).
- **Browse Packages**: View curated travel packages with destinations, duration, and prices.
- **Package Details**: View detailed itinerary, hotel inclusions, and pricing.
- **Book a Package**: Select upcoming travel date and number of persons.
- **Dynamic Price Calculation**: `Total Price = Package Unit Price × Number of Persons` (e.g. ₹5,000 × 2 = ₹10,000).
- **Booking Confirmation**: Instant confirmation receipt with reference ID.
- **My Bookings**: View history of confirmed personal bookings.

### 2. Admin
- **Secure Admin Login**: Dedicated administrator access.
- **Management Dashboard**: Key metrics (Total Packages, Total Bookings, Customers, Revenue).
- **Add Travel Package**: Publish new tour packages with form validation.
- **Edit Travel Package**: Update pricing, duration, destinations, or descriptions.
- **Delete Travel Package**: Remove obsolete packages with foreign key cascading.
- **View All Bookings**: Master view of all customer reservations across the system.

---

## 🗂️ Project Directory Structure

```text
travelease/
│
├── config/
│   └── database.php         # MySQL database connection (mysqli)
│
├── includes/
│   ├── header.php           # Common navigation bar & session state
│   └── footer.php           # Common footer layout & script inclusions
│
├── css/
│   └── style.css            # Responsive travel-themed styling
│
├── js/
│   └── script.js            # Dynamic price calculation & delete alerts
│
├── admin/
│   ├── dashboard.php        # Admin stats & package management table
│   ├── add_package.php      # Form to create new package
│   ├── edit_package.php     # Form to modify existing package
│   ├── delete_package.php   # Backend handler to delete package
│   └── bookings.php         # Master table of all customer bookings
│
├── index.php                # Landing page with hero & popular packages
├── register.php             # Customer registration page
├── login.php                # Customer & admin login handler
├── logout.php               # Session destruction & sign out
├── packages.php             # Full vacation package catalog
├── package_details.php      # Comprehensive package itinerary view
├── booking.php              # Booking form with real-time price calculation
├── confirmation.php         # Booking receipt page
├── my_bookings.php          # Customer's personal bookings history
│
└── database.sql             # MySQL schema, tables, and sample data
```

---

## 🚀 Step-by-Step XAMPP Setup Instructions

### Step 1: Start XAMPP Control Panel
1. Open the **XAMPP Control Panel** on your computer.
2. Click **Start** next to **Apache**.
3. Click **Start** next to **MySQL**.
4. Ensure both services show green status indicators.

### Step 2: Create & Import the MySQL Database
1. Open your web browser and go to: `http://localhost/phpmyadmin/`
2. Click on the **Databases** tab.
3. In the "Create database" field, enter: `travelease` and click **Create**.
4. Click on the newly created `travelease` database in the left sidebar.
5. Click on the **Import** tab at the top.
6. Click **Choose File** and select `database.sql` from the project folder.
7. Scroll to the bottom and click **Import** (or **Go**).
8. Verify that three tables (`users`, `packages`, `bookings`) are created successfully.

### Step 3: Copy Project Files to `htdocs`
1. Locate your XAMPP installation directory:
   - **Windows**: `C:\xampp\htdocs\`
   - **macOS (XAMPP-VM / Applications)**: `/Applications/XAMPP/htdocs/`
   - **Linux**: `/opt/lampp/htdocs/`
2. Copy the entire `travelease` folder into `htdocs`:
   - Path: `C:\xampp\htdocs\travelease`

### Step 4: Open in Web Browser
1. Open any browser (Chrome, Edge, Firefox).
2. Visit: `http://localhost/travelease/`
3. You will see the TravelEase home page with featured packages!

---

## 🔑 Demo Login Credentials for Evaluation & Viva

| Role | Email Address | Password | Landing Page After Login |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@travelease.com` | `admin123` | `http://localhost/travelease/admin/dashboard.php` |
| **Customer** | `rahul@example.com` | `user123` | `http://localhost/travelease/packages.php` |
| **Customer 2** | `priya@example.com` | `user123` | `http://localhost/travelease/packages.php` |

*(You can also register a brand new customer anytime via the Registration form).*

---

## 🧪 Testing & Software Engineering Viva Highlights

1. **Architecture**: 3-Tier Architecture (Presentation Layer: HTML/CSS/JS, Application Layer: PHP scripts, Database Layer: MySQL).
2. **Session Handling**: Uses standard PHP native sessions (`session_start()`) with role-based redirection.
3. **Security Measures**:
   - `password_hash()` and `password_verify()` using `PASSWORD_DEFAULT` (Bcrypt).
   - `mysqli_prepare()` and `mysqli_stmt_bind_param()` to eliminate SQL Injection risks.
   - `htmlspecialchars()` on outputs to prevent Cross-Site Scripting (XSS).
4. **Formula for Booking**:
   `Total Price = Unit Price × Number of Persons`
   Demonstrated in `booking.php` with dual-layer calculation (client-side JavaScript for UX, server-side PHP for business logic validation).
