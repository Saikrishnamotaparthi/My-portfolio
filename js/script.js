// js/script.js (CORRECTED AND REORGANIZED V3)

document.addEventListener("DOMContentLoaded", () => {
  // =================================================================
  // UTILITY FUNCTIONS (Defined first for clarity)
  // =================================================================

  // --- Function to initialize Particle.js ---
  function initParticles() {
    const particleDiv = document.getElementById("particles-js");
    const currentTheme = document.documentElement.getAttribute("data-theme");

    // Only run particles on the index page and in dark mode
    if (particleDiv && currentTheme === 'dark') {
      particlesJS("particles-js", {
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } },
          color: { value: "#4e3579" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }},
          size: { value: 2, random: true },
          line_linked: { enable: true, distance: 150, color: "#8A2BE2", opacity: 0.2, width: 1},
          move: { enable: true, speed: 1, direction: "none", out_mode: "out", bounce: false}
        },
        interactivity: {
          detect_on: "canvas",
          events: { onhover: { enable: true, mode: "grab" } },
          modes: { grab: { distance: 140, line_opacity: 0.5 } }
        },
        retina_detect: true,
      });
    }
  }

  // --- Function to destroy Particle.js instance ---
  function destroyParticles() {
    if (window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window.pJSDom = [];
    }
  }


  // =================================================================
  // EVENT LISTENERS & INITIALIZATIONS (Numbered for order)
  // =================================================================

  // --- 1. Universal: Theme Toggler ---
  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeBtn.textContent = savedTheme === "dark" ? "🌙" : "☀️";

    themeBtn.addEventListener("click", () => {
      const html = document.documentElement;
      const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", newTheme);
      themeBtn.textContent = newTheme === "dark" ? "🌙" : "☀️";
      localStorage.setItem("theme", newTheme);

      if (newTheme === 'dark') {
        initParticles(); // Re-initialize particles when switching to dark mode
      } else {
        destroyParticles(); // Destroy particles when switching to light mode to save resources
      }
    });
  }

  // --- 2. Universal: Terminal Time Update ---
  const timeElements = document.querySelectorAll(".terminal-time");
  if (timeElements.length > 0) {
    function updateTime() {
      const now = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
      timeElements.forEach((el) => (el.textContent = now));
    }
    updateTime();
    setInterval(updateTime, 30000); // Update every 30s is fine
  }

  // --- 3. Universal: Mobile Navigation Logic ---
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const closeNavBtn = document.getElementById("close-nav-btn");
  if (hamburgerBtn && mobileNav && closeNavBtn) {
    const toggleNav = () => {
      mobileNav.classList.toggle("is-open");
      document.body.classList.toggle("no-scroll");
    };
    hamburgerBtn.addEventListener("click", toggleNav);
    closeNavBtn.addEventListener("click", toggleNav);
    document.querySelectorAll("#mobile-nav a").forEach(link => {
      link.addEventListener("click", () => {
        if (mobileNav.classList.contains("is-open")) toggleNav();
      });
    });
  }

  // --- 4. Home Page Only: Typed.js ---
  if (document.getElementById("typed")) {
    new Typed("#typed", {
      strings: ["A VLSI Enthusiast", "A Robotics Explorer", "A Future Tech Architect", "An Embedded Systems Dev"],
      typeSpeed: 40,
      backSpeed: 25,
      backDelay: 1800,
      loop: true,
    });
  }

  // --- 5. Home Page Only: Smooth Scrolling for Nav Links ---
  if (document.querySelector('nav.terminal-nav')) {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute("href"));
        if (targetElement) {
          const offset = window.innerWidth < 900 ? 65 : 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      });
    });
  }

  // --- 6. Pages with Projects: Project Toggling ---
  document.querySelectorAll(".toggle-option").forEach((btn) => {
    btn.addEventListener("click", function () {
      if(this.classList.contains('active')) return;
      btn.parentElement.querySelector(".active").classList.remove("active");
      this.classList.add("active");
      const typeToShow = this.dataset.type;
      document.querySelectorAll(".project-grid").forEach((grid) => {
        grid.style.display = grid.classList.contains(`${typeToShow}-projects`) ? "grid" : "none";
      });
    });
  });

  // --- 7. Home Page Only: Fade-in on Scroll ---
  const fadeInSections = document.querySelectorAll(".fade-in-section");
  if (fadeInSections.length > 0) {
    const observer = new IntersectionObserver( (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 }
    );
    fadeInSections.forEach((section) => observer.observe(section));
  }

  // --- 8. Home Page Only: Contact Form Logic ---
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const form = event.target;
        const statusDiv = document.getElementById("form-status");
        statusDiv.style.display = 'block';
        statusDiv.className = 'form-status';
        statusDiv.innerHTML = "Transmitting...";
        try {
            const response = await fetch(form.action, { method: form.method, body: new FormData(form), headers: { 'Accept': 'application/json' }});
            if (response.ok) {
                statusDiv.innerHTML = "Signal Received. Thanks!";
                statusDiv.classList.add("success");
                form.reset();
            } else {
                statusDiv.innerHTML = "Transmission error. Please try again.";
                statusDiv.classList.add("error");
            }
        } catch (error) {
            statusDiv.innerHTML = "Network failure. Please try again.";
            statusDiv.classList.add("error");
        }
    });
  }

  // --- 9. Home Page Only: Scroll Down Indicator ---
  const scrollDownContainer = document.getElementById("scrollDownContainer");
  if (scrollDownContainer) {
    scrollDownContainer.addEventListener("click", () => document.querySelector("#about").scrollIntoView({ behavior: "smooth" }));
    window.addEventListener("scroll", () => {
      scrollDownContainer.style.opacity = window.scrollY > 50 ? "0" : "1";
      scrollDownContainer.style.pointerEvents = window.scrollY > 50 ? "none" : "auto";
    });
  }

  // --- 10. Final Initialization on page load ---
  initParticles();
});
