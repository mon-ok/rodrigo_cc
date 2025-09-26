window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-text");
  if (window.scrollY > 50) {
    hero.style.opacity = "0.8";
  } else {
    hero.style.opacity = "1";
  }
});
