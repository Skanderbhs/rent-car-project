// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const navbar = document.querySelector(".navbar")

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Animate hamburger menu
    const spans = navToggle.querySelectorAll("span")
    spans.forEach((span, index) => {
      if (navMenu.classList.contains("active")) {
        if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)"
        if (index === 1) span.style.opacity = "0"
        if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        span.style.transform = "none"
        span.style.opacity = "1"
      }
    })
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      const spans = navToggle.querySelectorAll("span")
      spans.forEach((span) => {
        span.style.transform = "none"
        span.style.opacity = "1"
      })
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// Booking form functionality
document.addEventListener("DOMContentLoaded", () => {
  const tabBtns = document.querySelectorAll(".tab-btn")
  const searchBtn = document.querySelector(".search-btn")

  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      tabBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Set default dates
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const pickupDate = document.getElementById("pickup-date")
  const returnDate = document.getElementById("return-date")

  if (pickupDate) pickupDate.value = today.toISOString().split("T")[0]
  if (returnDate) returnDate.value = tomorrow.toISOString().split("T")[0]

  // Search button animation
  if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault()

      // Add loading animation
      const originalText = this.innerHTML
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Recherche en cours...'
      this.disabled = true

      // Simulate search
      setTimeout(() => {
        this.innerHTML = originalText
        this.disabled = false
        alert("Recherche effectuée ! Redirection vers les résultats...")
      }, 2000)
    })
  }
})

// Vehicle filtering
document.addEventListener("DOMContentLoaded", () => {
  const categoryBtns = document.querySelectorAll(".category-btn")
  const vehicleCards = document.querySelectorAll(".vehicle-card")

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.dataset.category

      // Update active button
      categoryBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      // Filter vehicles with animation
      vehicleCards.forEach((card) => {
        const cardCategory = card.dataset.category

        if (category === "all" || cardCategory === category) {
          card.style.display = "block"
          card.style.animation = "fadeInUp 0.5s ease forwards"
        } else {
          card.style.animation = "fadeOut 0.3s ease forwards"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Reserve button functionality
  document.querySelectorAll(".reserve-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const vehicleName = this.closest(".vehicle-card").querySelector("h3").textContent
      const price = this.closest(".vehicle-card").querySelector(".price").textContent

      // Animation effect
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
        alert(`Réservation initiée pour ${vehicleName} à ${price}/jour`)
      }, 150)
    })
  })
})

// Contact form functionality
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      // Loading animation
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...'
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        submitBtn.textContent = "✓ Message envoyé !"
        submitBtn.style.background = "#27ae60"

        setTimeout(() => {
          submitBtn.textContent = originalText
          submitBtn.style.background = ""
          submitBtn.disabled = false
          contactForm.reset()
        }, 2000)
      }, 1500)
    })
  }
})

// Scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add animation classes to elements
  document.querySelectorAll(".service-card").forEach((el, index) => {
    el.classList.add("fade-in")
    el.style.transitionDelay = `${index * 0.1}s`
    observer.observe(el)
  })

  document.querySelectorAll(".vehicle-card").forEach((el, index) => {
    el.classList.add("fade-in")
    el.style.transitionDelay = `${index * 0.1}s`
    observer.observe(el)
  })

  document.querySelectorAll(".stat-item").forEach((el, index) => {
    el.classList.add("slide-in-left")
    el.style.transitionDelay = `${index * 0.2}s`
    observer.observe(el)
  })

  document.querySelectorAll(".contact-item").forEach((el, index) => {
    el.classList.add("slide-in-right")
    el.style.transitionDelay = `${index * 0.1}s`
    observer.observe(el)
  })
})

// Counter animation for stats
document.addEventListener("DOMContentLoaded", () => {
  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    function updateCounter() {
      start += increment
      if (start < target) {
        element.textContent = Math.floor(start).toLocaleString() + "+"
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target.toLocaleString() + "+"
      }
    }

    updateCounter()
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number")
        const targetValue = Number.parseInt(statNumber.textContent.replace(/\D/g, ""))
        animateCounter(statNumber, targetValue)
        statsObserver.unobserve(entry.target)
      }
    })
  })

  document.querySelectorAll(".stat-item").forEach((stat) => {
    statsObserver.observe(stat)
  })
})

// Parallax effect for hero section
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero")
  const heroBackground = document.querySelector(".hero-background")

  if (hero && heroBackground) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      heroBackground.style.transform = `translateY(${rate}px)`
    })
  }
})

// Add CSS animation keyframes dynamically
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`
document.head.appendChild(style)
