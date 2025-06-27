document.addEventListener("DOMContentLoaded", () => {
    
    // --- Theme Toggler ---
    const themeBtn = document.getElementById("theme-btn");
    if (themeBtn) {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
        themeBtn.textContent = savedTheme === "dark" ? "🌙" : "☀️";
        
        themeBtn.onclick = () => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            html.setAttribute("data-theme", newTheme);
            themeBtn.textContent = newTheme === "dark" ? "🌙" : "☀️";
            localStorage.setItem("theme", newTheme);
        };
    }

 // REPLACE the old time update block in projects.js with this one:

// --- Terminal Time Update ---
const desktopTimeElement = document.querySelector('.terminal-panel .terminal-time');
const mobileTimeElement = document.querySelector('.mobile-header .terminal-time');

if (desktopTimeElement && mobileTimeElement) {
    function updateTime() {
        const now = new Date().toLocaleTimeString('en-US', { hour12: true });
        desktopTimeElement.textContent = now;
        mobileTimeElement.textContent = now;
    }
    updateTime();
    setInterval(updateTime, 1000);
}
    
    // --- Project Type Toggle Logic ---
    const toggleButtons = document.querySelectorAll('.toggle-option');
    if (toggleButtons.length > 0) {
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                // Remove active class from all sibling buttons
                btn.parentElement.querySelectorAll('.toggle-option').forEach(b => b.classList.remove('active'));
                
                // Add active class to the clicked button
                this.classList.add('active');
                
                const typeToShow = this.dataset.type;
                
                document.querySelectorAll('.project-grid').forEach(grid => {
                    grid.style.display = 'none';
                });
                
                const gridToShow = document.querySelector(`.${typeToShow}-projects`);
                if (gridToShow) {
                    gridToShow.style.display = 'grid';
                }
            });
        });
    }
});

// ADD THIS BLOCK TO projects.js

// --- Mobile Navigation Logic ---
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');
const closeNavBtn = document.getElementById('close-nav-btn');
const mobileNavLinks = document.querySelectorAll('#mobile-nav .mobile-nav-links a');

if (hamburgerBtn && mobileNav) {
  const toggleNav = () => {
    mobileNav.classList.toggle('is-open');
    document.body.classList.toggle('no-scroll');
  };

  hamburgerBtn.addEventListener('click', toggleNav);
  closeNavBtn.addEventListener('click', toggleNav);

  // Close nav when a link is clicked (for external links)
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('is-open')) {
        toggleNav();
      }
    });
  });
}