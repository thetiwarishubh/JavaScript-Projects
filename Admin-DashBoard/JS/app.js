document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initTheme();
  initSidebar();
  initStats();
  initModals();
  initTableFilter();
  initProfileEdit();
  initCharts();
  initTypedJS();
});

// Theme Management
function initTheme() {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Load saved theme and set initial icon
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.textContent = "light_mode"; // Sun icon for dark mode
  } else {
    themeIcon.textContent = "dark_mode"; // Moon icon for light mode
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Update icon based on current mode
    if (document.body.classList.contains("dark-mode")) {
      themeIcon.textContent = "light_mode";
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.textContent = "dark_mode";
      localStorage.setItem("theme", "light");
    }
  });
}

// Sidebar Management
function initSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  const sidebarMenuButton = document.querySelector(".sidebar-menu-button");

  const toggleDropdown = (dropdown, menu, isOpen) => {
    dropdown.classList.toggle("open", isOpen);
    menu.style.height = isOpen ? `${menu.scrollHeight}px` : "0";
  };

  const closeAllDropdowns = () => {
    document
      .querySelectorAll(".dropdown-container.open")
      .forEach((openDropdown) => {
        toggleDropdown(
          openDropdown,
          openDropdown.querySelector(".dropdown-menu"),
          false
        );
      });
  };

  document.querySelectorAll(".dropdown-toggle").forEach((dropdownToggle) => {
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const dropdown = e.target.closest(".dropdown-container");
      const menu = dropdown.querySelector(".dropdown-menu");
      const isOpen = dropdown.classList.contains("open");
      closeAllDropdowns();
      toggleDropdown(dropdown, menu, !isOpen);
    });
  });

  function handleSidebarToggle() {
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle("open");
    } else {
      sidebar.classList.toggle("collapsed");
    }
    closeAllDropdowns();
  }

  sidebarToggle.addEventListener("click", handleSidebarToggle);
  sidebarMenuButton.addEventListener("click", handleSidebarToggle);

  // Close sidebar when clicking on links (mobile)
  document.querySelectorAll(".sidebar-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("open");
      }
    });
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("open");
    }
  });
}

// Stats Management
function initStats() {
  function updateAllStats() {
    updateStatBox(0, {
      baseValue: 87300,
      increment: 50,
      basePercentage: 1.09,
      valueElement: "#total-users",
      percentageElement: ".user-stats:nth-child(1) .growth-badge",
    });

    updateStatBox(1, {
      baseValue: 747300,
      increment: 70,
      basePercentage: 1.5,
      valueElement: "#total-earning",
      percentageElement: ".user-stats:nth-child(3) .growth-badge",
    });

    updateStatBox(2, {
      baseValue: 85367,
      increment: 7,
      basePercentage: 0.15,
      valueElement: "#my-earning",
      percentageElement: ".user-stats:nth-child(4) .growth-badge",
    });
  }

  function updateStatBox(index, config) {
    const stats = {
      currentValue: config.baseValue,
      currentPercentage: config.basePercentage,
      baseValue: config.baseValue,
    };

    setInterval(() => {
      const randomFactor = 0.8 + Math.random() * 0.4;
      stats.currentValue += Math.floor(config.increment * randomFactor);

      const growthDirection = config.basePercentage < 0 ? -1 : 1;
      const percentageChange =
        growthDirection * (0.00005 + Math.random() * 0.001);
      stats.currentPercentage += percentageChange;

      if (
        (config.basePercentage > 0 && stats.currentPercentage < 0) ||
        (config.basePercentage < 0 && stats.currentPercentage > 0)
      ) {
        stats.currentPercentage = config.basePercentage;
      }

      updateDisplay(
        config.valueElement,
        config.percentageElement,
        stats.currentValue,
        stats.currentPercentage,
        config.basePercentage < 0
      );
    }, 500 + index * 300);
  }

  function updateDisplay(
    valueElement,
    percentageElement,
    value,
    percentage,
    isNegativeGrowth
  ) {
    const valueEl = document.querySelector(valueElement);
    if (valueEl) {
      valueEl.textContent = value.toLocaleString("en-IN");
    }

    const percentageEl = document.querySelector(percentageElement);
    if (percentageEl) {
      const formattedPercentage = Math.abs(percentage).toFixed(2);
      percentageEl.innerHTML = `
        <span class="percentage-text">${
          percentage >= 0 ? "+" : ""
        }${formattedPercentage}%</span>
        <i>${isNegativeGrowth ? "↘" : "↗"}</i>
      `;

      percentageEl.classList.toggle("neg-growth", isNegativeGrowth);
    }
  }

  updateAllStats();
}

// Modal Management
// Update your initModals() function with this improved version
function initModals() {
  const modal = document.getElementById("logoutModal");
  const confirmLogout = modal.querySelector(".modal-btn.confirm");
  const cancelLogout = modal.querySelector(".modal-btn.cancel");
  const loginMainContainer = document.querySelector(".login-main-container");

  // Get all logout buttons
  const logoutButtons = [
    document.getElementById("logout-btn"),
    document.getElementById("profile-logout"),
    document.getElementById("sidebar-logout-btn"),
  ];

  function showLogoutModal() {
    modal.style.display = "flex";
    document.querySelector(".main-body").classList.add("blur");
    document.querySelector(".navbar").classList.add("blur");
    document.querySelector(".sidebar").classList.add("blur");
    document.body.style.overflow = "hidden";
  }

  function hideLogoutModal() {
  modal.style.display = "none";
  document.querySelector(".main-body").classList.remove("blur");
  document.querySelector(".navbar").classList.remove("blur");
  document.querySelector(".sidebar").classList.remove("blur");
  document.body.style.overflow = "auto";
}


  // Add event listeners to all logout buttons
  logoutButtons.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        showLogoutModal();
      });
    }
  });

  confirmLogout.addEventListener("click", () => {
    // Hide all dashboard elements
    document.querySelector(".main-body").style.display = "none";
    document.querySelector(".navbar").style.display = "none";
    document.querySelector(".sidebar").style.display = "none";
    document.querySelector(".home-page").style.display = "none";
    loginMainContainer.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Hide other elements
    document.querySelector(".about").style.display = "none";
    hideLogoutModal();
  });

  cancelLogout.addEventListener("click", hideLogoutModal);

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideLogoutModal();
    }
  });
}

// Table Filter Management
function initTableFilter() {
  const searchInput = document.getElementById("input-field");
  const statusFilter = document.getElementById("status-filter");

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

  function filterTable() {
    const filter = searchInput.value.toLowerCase();
    const status = statusFilter.value;
    const rows = document.querySelectorAll(".table tbody tr");

    rows.forEach((row) => {
      const name = row
        .querySelector(".table-profiles p")
        .textContent.toLowerCase();
      const email = row
        .querySelector("td:nth-child(2)")
        .textContent.toLowerCase();
      const statusText = row.querySelector("td:nth-child(4) span").textContent;
      const matchesSearch = name.includes(filter) || email.includes(filter);
      const matchesStatus = status === "all" || statusText === status;
      row.style.display = matchesSearch && matchesStatus ? "" : "none";
    });
  }

  // Use debounced filter for search input
  searchInput.addEventListener("input", debounce(filterTable, 300));
  statusFilter.addEventListener("change", filterTable);
}

// Profile Edit Management
function initProfileEdit() {
  const editProfileName = document.getElementById("edit-profile-name");
  const profileUsername = document.getElementById("profile-username");
  let originalName = profileUsername.textContent.trim();

  function enableEditMode() {
    editProfileName.textContent = "Save";

    const input = document.createElement("input");
    input.type = "text";
    input.value = originalName;
    input.className = "profile-name-input";

    profileUsername.textContent = "";
    profileUsername.appendChild(input);
    input.focus();
    input.select();

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") saveProfileName();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cancelEdit();
    });
  }

  function saveProfileName() {
    const input = profileUsername.querySelector("input");
    const newName = input ? input.value.trim() : originalName;

    if (!newName) {
      alert("Name cannot be empty");
      return;
    }

    profileUsername.textContent = newName;
    editProfileName.textContent = "Edit";
    originalName = newName;
  }

  function cancelEdit() {
    profileUsername.textContent = originalName;
    editProfileName.textContent = "Edit";
  }

  editProfileName.addEventListener("click", function () {
    if (this.textContent === "Save") {
      saveProfileName();
    } else {
      enableEditMode();
    }
  });

  // Save when clicking outside
  document.addEventListener("click", (e) => {
    if (
      editProfileName.textContent === "Save" &&
      !profileUsername.contains(e.target) &&
      e.target !== editProfileName
    ) {
      saveProfileName();
    }
  });
}

// Chart Initialization
function initCharts() {
  // User Growth Chart
  const userGrowthCtx = document
    .getElementById("userGrowthChart")
    .getContext("2d");
  new Chart(userGrowthCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "New Users",
          data: [12009, 190877, 270100, 101768, 21867, 29598, 280000],
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79, 70, 229, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Active Users",
          data: [88000, 99500, 110000, 102576, 171987, 116267, 189738],
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Net Worth",
          data: [47089, 89633, 149687, 298743, 397897, 226875, 787823],
          borderColor: "#f59e0b",
          backgroundColor: "rgba(229, 195, 70, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        tooltip: { mode: "index", intersect: false },
      },
      scales: { y: { beginAtZero: false } },
    },
  });

  // Revenue Chart
  const revenueCtx = document.getElementById("revenueChart").getContext("2d");
  new Chart(revenueCtx, {
    type: "doughnut",
    data: {
      labels: ["Services", "Products", "Subscriptions", "Consulting"],
      datasets: [
        {
          data: [480000, 120000, 40000, 107000],
          backgroundColor: ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
      cutout: "70%",
    },
  });

  // Activity Chart
  const activityCtx = document.getElementById("activityChart").getContext("2d");
  new Chart(activityCtx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Page Views",
          data: [65000, 90000, 150000, 160000, 180000, 200000, 250000],
          backgroundColor: "rgba(79, 70, 229, 0.7)",
        },
        {
          label: "Signups",
          data: [130000, 100500, 20400, 160000, 98450, 68700, 110800],
          backgroundColor: "rgba(16, 185, 129, 0.7)",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "top" } },
      scales: {
        x: { stacked: false },
        y: { stacked: false, beginAtZero: true },
      },
    },
  });

  const productCtx = document.getElementById("productChart").getContext("2d");
  new Chart(productCtx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Web Hosting",
          data: [2, 9, 10, 13, 32, 12, 51],
          backgroundColor: "rgba(79, 70, 229, 0.7)",
        },
        {
          label: "CRM Software",
          data: [2, 5, 9, 8, 16, 19, 16],
          backgroundColor: "rgba(16, 185, 129, 0.7)",
        },
        {
          label: "Logo Design",
          data: [52, 20, 82, 76, 122, 62, 142],
          backgroundColor: "rgba(185, 16, 16, 0.7)",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "top" } },
      scales: {
        x: { stacked: false },
        y: { stacked: false, beginAtZero: true },
      },
    },
  });

  const deviceCtx = document.getElementById("deviceChart").getContext("2d");

  new Chart(deviceCtx, {
    type: "pie",
    data: {
      labels: ["Desktop", "Mobile", "Tablet"],
      datasets: [
        {
          data: [44150, 78900, 12230],
          backgroundColor: [
            "rgba(59, 130, 246, 0.7)",
            "rgba(16, 185, 129, 0.7)",
            "rgba(245, 158, 11, 0.7)",
          ],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#111",
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.parsed;
              return `${label}: ${value} users`;
            },
          },
        },
      },
    },
  });
  const ctx = document.getElementById('geoChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['India', 'USA', 'UK', 'Germany', 'Canada', 'Japan', 'Russia', 'Dubai', 'Canada'],
    datasets: [{
      label: 'Users',
      data: [123787, 82837, 62623, 55733, 35376, 28933, 16287, 12843, 12089],
      backgroundColor: [
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6'
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'User Distribution by Country'
      }
    }
  }
});

}

// Typed.js Initialization
function initTypedJS() {
  if (document.querySelector(".auto-type")) {
    new Typed(".auto-type", {
      strings: [
        "Empowering your digital journey",
        "Presents the future of technology",
        "Where innovation meets execution",
        "Your partner in smart solutions",
      ],
      typeSpeed: 40,
      backSpeed: 40,
      loop: true,
    });
  }
}

// Panel Toggle Management
function initPanelToggles() {
  // Message Panel
  const messageIcon = document.querySelector(".message-icon");
  const messagePanel = document.querySelector(".message");
  let messageVisible = false;

  messageIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    messageVisible = !messageVisible;
    messagePanel.style.display = messageVisible ? "block" : "none";
    if (messageVisible) {
      messagePanel.style.position = "fixed";
      messagePanel.style.top = "70px";
      messagePanel.style.zIndex = "999";
      messagePanel.style.right = "65px";
    }
  });

  document.addEventListener("click", (e) => {
    if (!messageIcon.contains(e.target)) {
      messageVisible = false;
      messagePanel.style.display = "none";
    }
  });

  // Notifications Panel
  const notificationsIcon = document.querySelector(".notifications-icon");
  const notificationsPanel = document.querySelector(".notifications");
  let notificationsVisible = false;

  notificationsIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    notificationsVisible = !notificationsVisible;
    notificationsPanel.style.display = notificationsVisible ? "block" : "none";
    if (notificationsVisible) {
      notificationsPanel.style.position = "fixed";
      notificationsPanel.style.top = "70px";
      notificationsPanel.style.zIndex = "999";
      notificationsPanel.style.right = "25px";
    }
  });

  document.addEventListener("click", (e) => {
    if (!notificationsIcon.contains(e.target)) {
      notificationsVisible = false;
      notificationsPanel.style.display = "none";
    }
  });

  // Profile Panel
  const profileIcon = document.querySelector(".user-profile-img");
  const profilePanel = document.querySelector(".about");
  let profileVisible = false;

  profileIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    profileVisible = !profileVisible;
    profilePanel.style.display = profileVisible ? "block" : "none";
    if (profileVisible) {
      profilePanel.style.position = "fixed";
      profilePanel.style.top = "70px";
      profilePanel.style.zIndex = "999";
      profilePanel.style.right = "25px";
    }
  });

  document.addEventListener("click", (e) => {
    if (!profileIcon.contains(e.target)) {
      profileVisible = false;
      profilePanel.style.display = "none";
    }
  });

  // My Profile Panel
  const myProfileBtn = document.getElementById("my-profile-btn");
  const myProfilePanel = document.querySelector(".my-profile-container");
  let myProfileVisible = false;

  myProfileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    myProfileVisible = !myProfileVisible;
    myProfilePanel.style.display = myProfileVisible ? "block" : "none";
    profilePanel.style.display = "none";
    if (myProfileVisible) {
      myProfilePanel.style.position = "fixed";
      myProfilePanel.style.top = "70px";
      myProfilePanel.style.zIndex = "999";
      myProfilePanel.style.right = "25px";
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !myProfileBtn.contains(e.target) &&
      !myProfilePanel.contains(e.target)
    ) {
      myProfileVisible = false;
      myProfilePanel.style.display = "none";
    }
  });

  // Home Button
  const homeBtn = document.getElementById("homeBtn");
  const homePanel = document.querySelector(".home-page");
  const tablePanel = document.querySelector(".table-container");
  const mainPanel = document.querySelector(".main-container");
  const chartPanel = document.querySelector(".chart-container");

  homeBtn.addEventListener("click", () => {
    tablePanel.style.display = "none";
    mainPanel.style.display = "none";
    chartPanel.style.display = "none";
    homePanel.style.display = "flex";
    homePanel.style.justifyContent = "center";
    homePanel.style.alignItems = "center";
  });

  // Dashboard Button
  const dashboardBtn = document.getElementById("dashboard");
  dashboardBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mainPanel.style.display = "none";
    tablePanel.style.display = "none";
    chartPanel.style.display = "grid";
    homePanel.style.display = "none";
  });
};
document.addEventListener("DOMContentLoaded", initPanelToggles);

// document.getElementById("login-time-update").textContent =
//   new Date().toDateString();

//  Update Last Login time
const loginTimeCheck = function() {
  const loginTimeUpdate = document.getElementById('login-time-update');
  const currentTime = new Date();

  const addZero = num => (num < 10 ? `0${num}` : num);

  let hours = currentTime.getHours();
  const minutes = addZero(currentTime.getMinutes());
  const seconds = addZero(currentTime.getSeconds());
  const milliseconds = currentTime.getMilliseconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = addZero(hours);

  loginTimeUpdate.textContent = `${currentTime.toDateString()} ${hours} : ${minutes} : ${seconds} ${ampm} : ${milliseconds}`;
}

setInterval(() => {
  loginTimeCheck();
}, 1);

const allUserBtn = document.getElementById("all-user");

allUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".main-container").style.display = "none";
});


const companyProduct = document.querySelector('.company-product');
const productBtn = document.getElementById('product-lists-all');
const sidebar = document.querySelector('.sidebar');

productBtn.addEventListener('click', (e)=> {
    e.preventDefault()
    sidebar.classList.add('collapsed');
    document.querySelector('.main-body').style.display = 'none';
    companyProduct.style.display = 'block';
});
