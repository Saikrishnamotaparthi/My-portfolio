// js/script.js

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Theme Toggler ---
    const themeBtn = document.getElementById("theme-btn");
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

   // REPLACE the old time update block in script.js with this one:

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
    
    // --- Typed.js Initialization ---
    const typedElement = document.getElementById("typed");
    if (typedElement) {
        new Typed("#typed", {
            strings: ["ECE Undergrad", "Robotics Enthusiast", "VLSI Explorer", "Future Tech Architect"],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true
        });
    }

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Adjust for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Down Button ---
    const scrollDownBtn = document.getElementById('scrollDownBtn');
    const scrollDownContainer = document.getElementById('scrollDownContainer');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (scrollDownContainer) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollDownContainer.style.opacity = '0';
                scrollDownContainer.style.pointerEvents = 'none';
            } else {
                scrollDownContainer.style.opacity = '1';
                scrollDownContainer.style.pointerEvents = 'auto';
            }
        });
    }

    // --- Project Type Toggle ---
    document.querySelectorAll('.toggle-option').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.toggle-option').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const typeToShow = this.dataset.type;
            document.querySelectorAll('.project-grid').forEach(grid => {
                grid.style.display = grid.classList.contains(`${typeToShow}-projects`) ? 'grid' : 'none';
            });
        });
    });
    
    // --- Fade-in on Scroll Animation ---
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Contact Form Submission ---
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            
            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    status.innerHTML = "Thanks for your message! I'll get back to you soon.";
                    status.className = 'form-status success';
                    status.style.display = 'block';
                    form.reset();
                } else {
                    const responseData = await response.json();
                    if (Object.hasOwn(responseData, 'errors')) {
                        status.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "Oops! There was a problem submitting your form.";
                    }
                    status.className = 'form-status error';
                    status.style.display = 'block';
                }
            } catch (error) {
                status.innerHTML = "Oops! There was a problem submitting your form.";
                status.className = 'form-status error';
                status.style.display = 'block';
            }
        });
    }
});

// ADD THIS BLOCK TO script.js

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
  
  // Close nav when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('is-open')) {
        toggleNav();
      }
    });
  });
}