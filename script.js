const hero = document.querySelector(".hero-text");
const items = document.querySelectorAll(".timeline-item");
const header = document.querySelector("header");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // === Hero opacity effect ===
  if (currentScrollY > 50) {
    hero.style.opacity = "0.8";
  } else {
    hero.style.opacity = "1";
  }

  // === Roadmap animation ===
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight * 0.8 &&
      rect.bottom > window.innerHeight * 0.2;

    if (inView) {
      if (currentScrollY > lastScrollY) {
        // scrolling down → fade in
        item.classList.add("active");
      } else {
        // scrolling up → fade out
        item.classList.remove("active");
      }
    }
  });

  // === Header hide/show ===
  if (currentScrollY > lastScrollY) {
    // scrolling down
    header.classList.add("hide");
  } else {
    // scrolling up
    header.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});
