function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");

  // Save state to localStorage
  if (sidebar.classList.contains("collapsed")) {
    localStorage.setItem("sidebarCollapsed", "true");
  } else {
    localStorage.setItem("sidebarCollapsed", "false");
  }
}

function toggleMobileMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
}

function closeMobileMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
}

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const menuToggle = document.querySelector(".menu-toggle");

  // Restore sidebar collapsed state on page load
  if (sidebar && localStorage.getItem("sidebarCollapsed") === "true") {
    sidebar.classList.add("collapsed");
  }

  // Close sidebar when clicking overlay on mobile
  if (overlay) {
    overlay.addEventListener("click", function () {
      closeMobileMenu();
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (event) {
    // Only handle on mobile screens
    if (window.innerWidth <= 968 && sidebar) {
      const isClickInsideSidebar = sidebar.contains(event.target);
      const isClickOnToggle =
        menuToggle && menuToggle.contains(event.target);
      const isClickOnOverlay = overlay && overlay.contains(event.target);

      // If sidebar is open and click is outside sidebar and toggle button, close it
      if (
        sidebar.classList.contains("open") &&
        !isClickInsideSidebar &&
        !isClickOnToggle &&
        !isClickOnOverlay
      ) {
        closeMobileMenu();
      }
    }
  });

  // Close sidebar when clicking on menu links (navigation)
  const navLinks = document.querySelectorAll(".nav-menu a");
  if (navLinks.length > 0) {
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 968) {
          closeMobileMenu();
        }
      });
    });
  }

  // Handle window resize - close mobile menu when resizing to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 968) {
      closeMobileMenu();
    }
  });

  // Initialize Swiper for screenshot gallery
  if (typeof Swiper !== "undefined") {
    const screenshotSwiper = new Swiper("#screenshot-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        968: {
          slidesPerView: 3,
          spaceBetween: 10,
          slidesPerGroup: 1,
          centeredSlides: false,
        },
      },
    });
  }

  // Initialize Viewer.js for image galleries
  if (typeof Viewer !== "undefined") {
    // Initialize viewer for screenshot gallery (after Swiper is initialized)
    const screenshotGallery = document.getElementById("screenshot-gallery");
    if (screenshotGallery) {
      new Viewer(screenshotGallery, {
        inline: false,
        minZoomRatio: 0.1,
        maxZoomRatio: 4,
      });
    }

    // Initialize viewer for canvas image
    const canvasGallery = document.getElementById("canvas-gallery");
    if (canvasGallery) {
      new Viewer(canvasGallery, {
        inline: false,
        minZoomRatio: 0.1,
        maxZoomRatio: 4,
      });
    }
  }
});

