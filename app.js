// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initMobileMenu();
  initSmoothScrolling();
  initAnimations();
  initServiceCards();
  initScrollToTop();
  initClientsCarousel();
  initTestimonialsCarousel();

  // Smooth scrolling for navigation links
  function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Scroll animations
  function initAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      ".service-card, .portfolio-item, .stat-item, .section-title, .section-text"
    );
    animateElements.forEach((el) => {
      el.classList.add("loading");
      observer.observe(el);
    });

    // Add loaded class after a delay
    setTimeout(() => {
      animateElements.forEach((el) => {
        el.classList.add("loaded");
      });
    }, 100);
  }

  // Service cards interaction
  function initServiceCards() {
    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });
  }

  // Counter animation for statistics
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
      const target = parseInt(counter.textContent);
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current) + "+";
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + "+";
        }
      };

      updateCounter();
    });
  }

  // Trigger counter animation when about section is visible
  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(aboutSection);
  }

  // Add loading animation to images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";
  });

  // Add scroll progress indicator
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });

  // Add parallax effect to hero section
  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    // Reset any previous transform to avoid layout gaps
    heroSection.style.transform = "";

    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      // Move only the background, not the element itself (prevents white gaps)
      heroSection.style.backgroundPosition = `center ${scrolled * 0.4}px`;
    });
  }

  // Add smooth typing effect to hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 30); // Faster typing speed
      }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 800);
  }

  // Mobile menu functionality
  function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMenu = document.getElementById("closeMenu");

    // Remove auto open - let user control it
    // setTimeout(() => {
    //     mobileMenu.classList.add('active');
    //     document.body.style.overflow = 'hidden';
    // }, 1000);

    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      mobileMenu.classList.add("active");
      document.body.classList.add("menu-active");
      console.log("Menu toggle clicked!");
    });

    closeMenu.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      mobileMenu.classList.remove("active");
      document.body.classList.remove("menu-active");
    });

    // Close menu when clicking on menu links
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-active");
      }
    });
  }

  // Add hover effects to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add lazy loading for images
  const imageObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  // Observe images with data-src attribute
  const lazyImages = document.querySelectorAll("img[data-src]");
  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });

  // Scroll to top functionality
  function initScrollToTop() {
    const scrollToTopBtn = document.getElementById("scrollToTop");

    // Show button when user scrolls down
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }





  // Clients Carousel functionality
  function initClientsCarousel() {
    const carousel = document.querySelector(".clients-logos");
    const indicators = document.querySelectorAll(".indicator");

    if (!carousel) return;

    let currentSlide = 0;
    const totalSlides = 4; // 4 slides: 2 logos per slide
    const logoWidth = 265; // Width of each logo
    const gap = 0; // Gap between logos
    const logosPerSlide = 2; // Number of logos visible per slide
    const slideWidth = (logoWidth + gap) * logosPerSlide; // Calculate slide width
    let isTransitioning = false;

    // Function to update carousel position
    function updateCarousel() {
      const translateX = -currentSlide * slideWidth;
      carousel.style.transform = `translateX(${translateX}px)`;

      // Update indicators
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentSlide);
      });
    }

    // Function to go to next slide with seamless loop
    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;

      currentSlide++;

      // If we're at the end of the first set, jump to the beginning of the second set
      if (currentSlide >= totalSlides) {
        setTimeout(() => {
          carousel.style.transition = "none";
          currentSlide = 0;
          updateCarousel();
          setTimeout(() => {
            carousel.style.transition = "transform 0.5s ease";
            isTransitioning = false;
          }, 10);
        }, 500);
      } else {
        updateCarousel();
        setTimeout(() => {
          isTransitioning = false;
        }, 500);
      }
    }

    // Function to go to previous slide with seamless loop
    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;

      currentSlide--;

      // If we're at the beginning, jump to the end of the first set
      if (currentSlide < 0) {
        setTimeout(() => {
          carousel.style.transition = "none";
          currentSlide = totalSlides - 1;
          updateCarousel();
          setTimeout(() => {
            carousel.style.transition = "transform 0.5s ease";
            isTransitioning = false;
          }, 10);
        }, 500);
      } else {
        updateCarousel();
        setTimeout(() => {
          isTransitioning = false;
        }, 500);
      }
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", function () {
        currentSlide = index;
        updateCarousel();
      });
    });

    // Add keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    });

    // Add touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    carousel.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", function (e) {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        // Minimum swipe distance
        if (diff > 0) {
          nextSlide(); // Swipe left
        } else {
          prevSlide(); // Swipe right
        }
      }
    });

    // Initialize first slide
    updateCarousel();

    // Auto-scroll disabled
    // setInterval(function() {
    //     nextSlide();
    // }, 4000);
  }
  console.log("Glint website initialized successfully!");
});




// Testimonials Carousel Functionality
function initTestimonialsCarousel() {
  const prevBtn = document.querySelector(".testimonial-nav.prev-btn");
  const nextBtn = document.querySelector(".testimonial-nav.next-btn");

  if (!prevBtn || !nextBtn) return;

  const testimonials = [
    {
      text: "Excepturi nam cupiditate culpa doloremque deleniti repellat. Veniam quos repellat voluptas animi adipisci. Nisi eaque consequatur. Quasi voluptas eius distinctio. Atque eos maxime. Qui ipsam temporibus quisquam vel. Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit.",
      name: "Satya Nadella",
      title: "CEO, Microsoft",
      image:
        "https://preview.colorlib.com/theme/glint/images/avatars/user-01.jpg.webp",
    },
    {
      text: "Perspiciatis hic praesentium nesciunt. Et neque a dolorum voluptatem porro iusto sequi veritatis libero enim. Iusto id suscipit veritatis neque reprehenderit. Quasi voluptas eius distinctio. Atque eos maxime. Qui ipsam temporibus quisquam vel. Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit.",
      name: "Tim Cook",
      title: "CEO, Apple",
      image:
        "	https://preview.colorlib.com/theme/glint/images/avatars/user-05.jpg",
    },
    {
      text: "Nemo cupiditate ab quibusdam quaerat impedit magni. Earum suscipit ipsum laudantium. Quo delectus est. Maiores voluptas ab sit natus veritatis ut. Debitis nulla cumque veritatis. Sunt suscipit voluptas ipsa in tempora esse soluta sint. Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit.",
      name: "Sundar Pichai",
      title: "CEO, Google",
      image:
        "https://preview.colorlib.com/theme/glint/images/avatars/user-02.jpg.webp",
    },
     {
      text: "Perspiciatis hic praesentium nesciunt. Et neque a dolorum voluptatem porro iusto sequi veritatis libero enim. Iusto id suscipit veritatis neque reprehenderit. Quasi voluptas eius distinctio. Atque eos maxime. Qui ipsam temporibus quisquam vel. Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit.",
      name: "Tim Cook",
      title: "CEO, Apple",
      image:
        "https://preview.colorlib.com/theme/glint/images/avatars/user-02.jpg.webp",
    },
  ];

  let currentTestimonial = 0;

  function updateTestimonial(direction = "left") {
    const slideWrapper = document.querySelector(".testimonial-slide-wrapper");
    const testimonialText = slideWrapper.querySelector(".testimonial-text p");
    const authorName = slideWrapper.querySelector(".author-name");
    const authorTitle = slideWrapper.querySelector(".author-title");
    const authorImage = slideWrapper.querySelector(".author-image img");

    if (
      !slideWrapper ||
      !testimonialText ||
      !authorName ||
      !authorTitle ||
      !authorImage
    )
      return;

    // Slide out in current direction
    slideWrapper.classList.remove("show");
    slideWrapper.classList.add(`slide-out-${direction}`);

    setTimeout(() => {
      // Reset position from opposite direction for slide-in
      slideWrapper.classList.remove(`slide-out-${direction}`);
      slideWrapper.classList.add(
        `slide-in-${direction === "left" ? "right" : "left"}`
      );

      // Update content
      testimonialText.textContent = testimonials[currentTestimonial].text;
      authorName.textContent = testimonials[currentTestimonial].name;
      authorTitle.textContent = testimonials[currentTestimonial].title;
      authorImage.src = testimonials[currentTestimonial].image;
      authorImage.alt = testimonials[currentTestimonial].name;

      // Trigger reflow for transition
      void slideWrapper.offsetWidth;

      // Show new content with animation
      slideWrapper.classList.remove(
        `slide-in-${direction === "left" ? "right" : "left"}`
      );
      slideWrapper.classList.add("show");
    }, 500); // Match with CSS transition duration
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll(".testimonial-indicator");
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentTestimonial);
    });
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial("left");
    updateIndicators();
  }

  function prevTestimonial() {
    currentTestimonial =
      (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial("right");
    updateIndicators();
  }

  nextBtn.addEventListener("click", nextTestimonial);
  prevBtn.addEventListener("click", prevTestimonial);

  const indicators = document.querySelectorAll(".testimonial-indicator");
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      const direction = index > currentTestimonial ? "left" : "right";
      currentTestimonial = index;
      updateTestimonial(direction);
      updateIndicators();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      nextTestimonial();
    } else if (e.key === "ArrowLeft") {
      prevTestimonial();
    }
  });

  updateTestimonial();
  updateIndicators();
}
