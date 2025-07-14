document.addEventListener("DOMContentLoaded", () => {
  // Initialize Support page-specific components
  initSupportForm();
  initTicketFilter();
});

function initSupportForm() {
  const supportForm = document.getElementById("supportForm");

  if (supportForm) {
    supportForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("support-name").value.trim();
      const email = document.getElementById("support-email").value.trim();
      const issue = document.getElementById("support-issue").value.trim();

      if (name && email && issue) {
        const ticketId = `#${Math.floor(10000 + Math.random() * 90000)}`;
        const date = new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        const tableBody = document.querySelector(".ticket-status tbody");
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${ticketId}</td>
          <td>${issue.substring(0, 20)}${issue.length > 20 ? "..." : ""}</td>
          <td class="status-active"><span>Open</span></td>
          <td>${date}</td>
        `;
        tableBody.prepend(newRow);

        // Clear form
        supportForm.reset();
        alert("Ticket submitted successfully! Ticket ID: " + ticketId);
      } else {
        alert("Please fill in all fields.");
      }
    });
  }
}

function initTicketFilter() {
  const searchInput = document.getElementById("input-field");

  if (searchInput) {
    function filterTickets() {
      const filter = searchInput.value.toLowerCase();
      const rows = document.querySelectorAll(".ticket-status tbody tr");

      rows.forEach((row) => {
        const ticketId = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
        const issue = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
        const matchesSearch = ticketId.includes(filter) || issue.includes(filter);
        row.style.display = matchesSearch ? "" : "none";
      });
    }

    // Debounce function for search input
    function debounce(func, wait) {
      let timeout;
      return function () {
        const context = this,
          args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      };
    }

    searchInput.addEventListener("input", debounce(filterTickets, 300));
  }
}