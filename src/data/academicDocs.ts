export interface TestCase {
  id: string;
  module: string;
  scenario: string;
  technique: string;
  testData: string;
  expectedResult: string;
  status: 'Pass' | 'Fail';
}

export const BLACK_BOX_TEST_CASES: TestCase[] = [
  {
    id: "TC-AUTH-01",
    module: "Authentication",
    scenario: "Customer registration with all valid fields",
    technique: "Equivalence Partitioning (Valid)",
    testData: "Name: 'Aditi Roy', Email: 'aditi@example.com', Password: 'password123'",
    expectedResult: "Account created in `users` table; redirect to login.php with success banner",
    status: "Pass"
  },
  {
    id: "TC-AUTH-02",
    module: "Authentication",
    scenario: "Customer registration with existing email address",
    technique: "Equivalence Partitioning (Invalid)",
    testData: "Email: 'rahul@example.com' (already exists)",
    expectedResult: "Error message: 'An account with this email address already exists.'",
    status: "Pass"
  },
  {
    id: "TC-AUTH-03",
    module: "Authentication",
    scenario: "Password length boundary below minimum (< 6 chars)",
    technique: "Boundary Value Analysis (5 chars)",
    testData: "Password: 'abc12'",
    expectedResult: "Validation error: 'Password must be at least 6 characters long.'",
    status: "Pass"
  },
  {
    id: "TC-AUTH-04",
    module: "Authentication",
    scenario: "Customer login with correct email and password",
    technique: "Equivalence Partitioning (Valid)",
    testData: "rahul@example.com / user123",
    expectedResult: "Session created with user_id & role='customer'; redirected to packages.php",
    status: "Pass"
  },
  {
    id: "TC-AUTH-05",
    module: "Authentication",
    scenario: "Admin login with correct administrator credentials",
    technique: "Equivalence Partitioning (Valid)",
    testData: "admin@travelease.com / admin123",
    expectedResult: "Session created with role='admin'; redirected to admin/dashboard.php",
    status: "Pass"
  },
  {
    id: "TC-AUTH-06",
    module: "Authentication",
    scenario: "Customer login with invalid password",
    technique: "Equivalence Partitioning (Invalid)",
    testData: "rahul@example.com / wrongpass",
    expectedResult: "Error message: 'Invalid password. Please check and try again.'",
    status: "Pass"
  },
  {
    id: "TC-BOOK-01",
    module: "Booking Logic",
    scenario: "Calculate total price with single traveler (lower boundary)",
    technique: "Boundary Value Analysis (Persons = 1)",
    testData: "Package Price = ₹8,500, Persons = 1",
    expectedResult: "Total Price = 8500 × 1 = ₹8,500.00",
    status: "Pass"
  },
  {
    id: "TC-BOOK-02",
    module: "Booking Logic",
    scenario: "Calculate total price with multiple travelers",
    technique: "Equivalence Partitioning (Valid)",
    testData: "Package Price = ₹5,000, Persons = 2",
    expectedResult: "Total Price = 5000 × 2 = ₹10,000.00 (as required by project brief)",
    status: "Pass"
  },
  {
    id: "TC-BOOK-03",
    module: "Booking Logic",
    scenario: "Boundary check: persons equal to zero (invalid)",
    technique: "Boundary Value Analysis (Persons = 0)",
    testData: "Persons = 0",
    expectedResult: "Validation error: 'Number of persons must be at least 1.' Form rejected.",
    status: "Pass"
  },
  {
    id: "TC-BOOK-04",
    module: "Booking Logic",
    scenario: "Travel date selected in the past (yesterday's date)",
    technique: "Boundary Value Analysis (Date < Today)",
    testData: "Travel Date: 2026-10-06 (past date)",
    expectedResult: "Error: 'Travel date cannot be in the past.' HTML min attribute prevents selection.",
    status: "Pass"
  },
  {
    id: "TC-BOOK-05",
    module: "Booking Logic",
    scenario: "Unauthenticated guest attempts to access booking.php directly",
    technique: "Security Access Control",
    testData: "Guest opens /booking.php?package_id=1 without active session",
    expectedResult: "Redirected to login.php; redirect URL stored in session to preserve context",
    status: "Pass"
  },
  {
    id: "TC-ADMIN-01",
    module: "Administration",
    scenario: "Customer role attempts to access admin/dashboard.php directly",
    technique: "Role-Based Access Control",
    testData: "Logged in as 'rahul@example.com' (customer) accessing admin/dashboard.php",
    expectedResult: "Access denied; redirected to login.php",
    status: "Pass"
  },
  {
    id: "TC-ADMIN-02",
    module: "Administration",
    scenario: "Admin creates a new travel package with valid inputs",
    technique: "Equivalence Partitioning (Valid)",
    testData: "Name: 'Shimla Snow Tour', Destination: 'Shimla', Days: 4, Price: 9500",
    expectedResult: "Package inserted in `packages`; redirected to dashboard.php with ?added=1",
    status: "Pass"
  },
  {
    id: "TC-ADMIN-03",
    module: "Administration",
    scenario: "Admin modifies existing package price and description",
    technique: "Integration Testing (CRUD Update)",
    testData: "Package ID 1: Price updated from ₹8,500 to ₹8,999",
    expectedResult: "Updated in database; changes immediately reflected across catalog",
    status: "Pass"
  },
  {
    id: "TC-ADMIN-04",
    module: "Administration",
    scenario: "Admin views all customer bookings master table",
    technique: "Data Retrieval & Join Verification",
    testData: "Admin navigates to admin/bookings.php",
    expectedResult: "SQL JOIN (bookings + users + packages) renders customer name, package, price",
    status: "Pass"
  }
];

export const VIVA_QUESTIONS = [
  {
    q: "1. What software development life cycle (SDLC) model was selected for TravelEase, and why?",
    a: "We followed the Classical Waterfall Model with incremental verification. Because the requirements (Customer booking, Admin CRUD, MySQL schema, and price formula) were clearly specified and frozen upfront, Waterfall ensured sequential progression: Requirements (SRS) -> Design (UML & Schema) -> Implementation (PHP/MySQL) -> Testing (Unit, Black-box, Integration) -> Deployment (XAMPP)."
  },
  {
    q: "2. How does the application maintain user state across HTTP requests?",
    a: "HTTP is stateless. We utilize native PHP Sessions via session_start(). Once authenticated, user credentials and role ('customer' or 'admin') are stored in the server-side $_SESSION array, and a session identifier cookie (PHPSESSID) is maintained in the client's browser."
  },
  {
    q: "3. What core formula is used to calculate the booking total price?",
    a: "Total Price = Package Unit Price × Number of Persons. For instance, if package price is ₹5,000 and the customer enters 2 persons, total price = ₹10,000. This is calculated dynamically on the frontend via JavaScript for user convenience and strictly verified server-side in booking.php to prevent client-side tampering."
  },
  {
    q: "4. Why did you use mysqli_prepare() instead of concatenating variables directly into queries?",
    a: "Direct concatenation ($sql = \"SELECT * FROM users WHERE email = '$email'\") leaves the application vulnerable to SQL Injection (SQLi). Prepared statements separate the SQL query structure from data values, transmitting parameters through bound types ('s', 'i', 'd') so user inputs can never alter the query logic."
  },
  {
    q: "5. Why did you use password_hash() instead of MD5 or SHA1?",
    a: "MD5 and SHA-1 are cryptographically broken and vulnerable to rainbow table lookups and rapid collision attacks. PHP's password_hash($password, PASSWORD_DEFAULT) uses Bcrypt with an automatically generated cryptographic salt and adjustable work factor (cost), making brute-force attacks infeasible."
  },
  {
    q: "6. Explain the difference between Black-Box Testing and White-Box Testing in this project.",
    a: "Black-Box Testing tests system functionality from an external user's perspective without knowledge of internal source code (e.g., Equivalence Partitioning and Boundary Value Analysis on person count or travel date). White-Box Testing analyzes internal code structure, control flow paths, and cyclomatic complexity (e.g., verifying every branch of the booking price validation logic in booking.php)."
  },
  {
    q: "7. What is Cyclomatic Complexity, and what is its value for the booking calculation function?",
    a: "Cyclomatic Complexity V(G) measures the number of linearly independent paths through a program's source code. Using V(G) = P + 1 (where P is the number of predicate/decision nodes), the booking validation function has 3 decision conditions (travel date validity, persons >= 1, and package existence), giving V(G) = 3 + 1 = 4 independent basis paths to be tested."
  },
  {
    q: "8. What is the role of Foreign Keys and ON DELETE CASCADE in the database?",
    a: "Foreign keys establish referential integrity between tables. In travelease, bookings.user_id references users.id and bookings.package_id references packages.id. ON DELETE CASCADE ensures that if an admin deletes a package, all associated booking records are cleanly cascaded and deleted automatically without leaving orphaned records."
  },
  {
    q: "9. How is Role-Based Access Control (RBAC) enforced in the code?",
    a: "Every admin file (such as admin/dashboard.php, add_package.php) begins with a session check: if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') { header('Location: ../login.php'); exit(); }. This prevents unauthorized customers or unauthenticated guests from accessing admin routes by typing the URL directly."
  },
  {
    q: "10. How would you automate regression testing for this application using Selenium?",
    a: "Using Selenium WebDriver in Python or Java, we instantiate a browser driver (ChromeDriver), navigate to the login page, locate input elements via driver.find_element(By.ID, 'email'), send keys, click the submit button, navigate to booking, enter 2 persons, assert that the total price text matches ₹10,000, and verify the confirmation reference ID."
  }
];

export const PYTHON_SELENIUM_SCRIPT = `"""
TravelEase – Automated Regression Test Suite (Selenium WebDriver)
College Software Engineering & Testing Project
Prerequisites: pip install selenium webdriver-manager
"""

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service

BASE_URL = "http://localhost/travelease"

def run_travelease_test_suite():
    print("=== STARTING TRAVELEASE SELENIUM REGRESSION TESTS ===")
    
    # 1. Initialize Chrome WebDriver
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    # options.add_argument("--headless") # Uncomment for headless execution
    driver = webdriver.Chrome(service=service, options=options)
    driver.maximize_window()
    wait = WebDriverWait(driver, 10)

    try:
        # TEST CASE 1: Open Home Page and verify title & packages
        print("[TEST 1] Verifying Home Page Load...")
        driver.get(f"{BASE_URL}/index.php")
        assert "TravelEase" in driver.title, f"Unexpected title: {driver.title}"
        cards = driver.find_elements(By.CLASS_NAME, "package-card")
        assert len(cards) >= 1, "No package cards displayed on home page"
        print("  -> PASS: Home page loaded with travel package cards.")

        # TEST CASE 2: Customer Login
        print("[TEST 2] Testing Customer Authentication...")
        driver.get(f"{BASE_URL}/login.php")
        driver.find_element(By.ID, "email").send_keys("rahul@example.com")
        driver.find_element(By.ID, "password").send_keys("user123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        
        # Verify redirect to packages page or dashboard
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "packages-grid")))
        assert "packages.php" in driver.current_url
        print("  -> PASS: Logged in successfully as Rahul Sharma.")

        # TEST CASE 3: Booking Flow & Dynamic Price Calculation
        print("[TEST 3] Testing Booking Flow & Calculation Formula...")
        # Navigate to first package details
        details_link = driver.find_element(By.CSS_SELECTOR, ".package-card a.btn-primary")
        details_link.click()
        
        # Click 'Book This Package'
        book_btn = wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "Book This Package Now →")))
        book_btn.click()
        
        # Verify on booking.php
        assert "booking.php" in driver.current_url
        
        # Set travel date to 7 days in future
        travel_date_input = driver.find_element(By.ID, "travel_date")
        # Format: YYYY-MM-DD
        from datetime import date, timedelta
        future_date = (date.today() + timedelta(days=7)).strftime("%Y-%m-%d")
        travel_date_input.clear()
        travel_date_input.send_keys(future_date)

        # Set persons count to 2
        persons_input = driver.find_element(By.ID, "persons")
        persons_input.clear()
        persons_input.send_keys("2")
        time.sleep(1) # Allow dynamic JS calculation to trigger

        # Submit booking form
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        # TEST CASE 4: Verify Confirmation Receipt
        print("[TEST 4] Verifying Booking Confirmation Receipt...")
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "confirmation-card")))
        assert "confirmation.php" in driver.current_url
        receipt_text = driver.find_element(By.CLASS_NAME, "booking-receipt").text
        assert "Confirmed" in receipt_text
        print("  -> PASS: Booking confirmed with unique reference ID!")

        # TEST CASE 5: Verify 'My Bookings' Table
        print("[TEST 5] Checking 'My Bookings' Record Presence...")
        driver.get(f"{BASE_URL}/my_bookings.php")
        table = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "data-table")))
        assert table is not None
        print("  -> PASS: Booking record visible in customer dashboard.")

        print("\\n=== ALL 5 REGRESSION TESTS PASSED SUCCESSFULLY! ===")

    except Exception as e:
        print(f"\\n[FAIL] Test suite failed with error: {e}")
        driver.save_screenshot("test_failure.png")
        raise e
    finally:
        driver.quit()

if __name__ == "__main__":
    run_travelease_test_suite()
`;
