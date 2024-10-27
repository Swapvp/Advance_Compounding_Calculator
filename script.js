document.getElementById("add-period").addEventListener("click", () => {
  const container = document.getElementById("rate-periods-container");

  // Create a new rate-period input section
  const periodDiv = document.createElement("div");
  periodDiv.classList.add("rate-period");
  periodDiv.innerHTML = `
      <input type="number" class="rate" placeholder="Interest rate (%)" required>
      <input type="number" class="years" placeholder="Years" required>
      <button type="button" class="delete-period"><i class="fa-solid fa-xmark fa-lg" style="color: #ffffff;"></i></button>
    `;

  // Add event listener to the delete button of the new row
  periodDiv.querySelector(".delete-period").addEventListener("click", () => {
    periodDiv.remove();
  });

  container.appendChild(periodDiv);
});

document
  .getElementById("compounding-form")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const principal = parseFloat(document.getElementById("principal").value);
    const ratePeriods = document.querySelectorAll(".rate-period");

    let totalAmount = principal;

    ratePeriods.forEach((period) => {
      const rate = parseFloat(period.querySelector(".rate").value);
      const years = parseInt(period.querySelector(".years").value);

      // Calculate compound interest for the given period
      totalAmount *= Math.pow(1 + rate / 100, years);
    });

    document.getElementById(
      "result"
    ).textContent = `Final Amount: ₹${totalAmount.toFixed(2)}`;
  });

// Add delete functionality to existing rows on page load
document.querySelectorAll(".delete-period").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.target.closest(".rate-period").remove();
  });
});
