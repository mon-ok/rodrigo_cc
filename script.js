window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-text");
  if (window.scrollY > 50) {
    hero.style.opacity = "0.8";
  } else {
    hero.style.opacity = "1";
  }
});

// Animate roadmap items based on scroll direction
const items = document.querySelectorAll(".timeline-item");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;

    if (inView) {
      // Scrolling down → fade in
      if (currentScrollY > lastScrollY) {
        item.classList.add("active");
      }
      // Scrolling up → fade out
      else {
        item.classList.remove("active");
      }
    }
  });

  lastScrollY = currentScrollY;
});
