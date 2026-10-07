/**
 * TravelEase – Client-Side JavaScript
 * Simple & beginner-friendly script for form validation, dynamic price calculation, and confirmations
 */

document.addEventListener("DOMContentLoaded", function () {
    // ----------------------------------------------------
    // Dynamic Price Calculation for Booking Page
    // total_price = package price * number of persons
    // ----------------------------------------------------
    const personsInput = document.getElementById("persons");
    const packagePriceElement = document.getElementById("package-unit-price");
    const dynamicTotalElement = document.getElementById("calc-total-price");
    const hiddenTotalInput = document.getElementById("total_price");

    if (personsInput && packagePriceElement && dynamicTotalElement) {
        function updateTotalPrice() {
            const unitPrice = parseFloat(packagePriceElement.getAttribute("data-price")) || 0;
            let persons = parseInt(personsInput.value, 10);

            // Validation: minimum 1 person, max 20
            if (isNaN(persons) || persons < 1) {
                persons = 1;
            }

            const totalPrice = unitPrice * persons;

            // Update UI display
            dynamicTotalElement.textContent = "₹" + totalPrice.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            // Update hidden form field if present
            if (hiddenTotalInput) {
                hiddenTotalInput.value = totalPrice.toFixed(2);
            }
        }

        // Attach event listeners for real-time recalculation
        personsInput.addEventListener("input", updateTotalPrice);
        personsInput.addEventListener("change", updateTotalPrice);
        
        // Initial calculation on page load
        updateTotalPrice();
    }

    // ----------------------------------------------------
    // Prevent booking dates in the past
    // ----------------------------------------------------
    const travelDateInput = document.getElementById("travel_date");
    if (travelDateInput) {
        const today = new Date();
        // Set minimum date to tomorrow
        today.setDate(today.getDate() + 1);
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        travelDateInput.min = `${yyyy}-${mm}-${dd}`;
    }

    // ----------------------------------------------------
    // Admin Delete Package Confirmation
    // ----------------------------------------------------
    const deleteButtons = document.querySelectorAll(".btn-delete-confirm");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            const packageName = this.getAttribute("data-name") || "this package";
            const confirmed = confirm(`Are you sure you want to delete "${packageName}"?\nThis action cannot be undone.`);
            if (!confirmed) {
                event.preventDefault();
            }
        });
    });
});
