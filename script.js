// VIDEO INTRO FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
  const introScreen = document.getElementById('intro-screen');
  const introVideo = document.getElementById('intro-video');
  const mainContent = document.getElementById('main-content');
  const skipButton = document.getElementById('skip-intro');
  const copyBtn = document.getElementById("copyBtn");
  const contractBox = document.getElementById("contractAddress");

  // Hide main content initially
  mainContent.style.display = 'none';

  // Function to transition to main page
  function showMainContent() {
    introScreen.style.opacity = '0';
    
    setTimeout(() => {
      introScreen.style.display = 'none';
      mainContent.style.display = 'block';
      
      // Fade in main content
      setTimeout(() => {
        mainContent.style.opacity = '1';
        // Initialize scroll functionality after content is visible
        initScrollEffects();
        initCopyButton(); // 🔹 initialize copy after main content is visible
      }, 50);
    }, 500); // Wait for fade out
  }

  // When video ends, show main content
  introVideo.addEventListener('ended', showMainContent);

  // Skip button functionality
  skipButton.addEventListener('click', showMainContent);

  // Optional: Auto-skip if video fails to load
  introVideo.addEventListener('error', function() {
    console.log('Video failed to load, skipping intro');
    showMainContent();
  });

  // Start playing the video
  introVideo.play().catch(err => {
    console.log('Autoplay prevented:', err);
    // If autoplay is blocked, show skip button prominently
    skipButton.style.display = 'block';
  });
});

// SCROLL EFFECTS
function initScrollEffects() {
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
}

// COPY BUTTON FUNCTIONALITY
function initCopyButton() {
  const copyBtn = document.getElementById("copyBtn");
  const contractBox = document.getElementById("contractAddress");

  if (!copyBtn || !contractBox) return;

  copyBtn.addEventListener("click", () => {
    const textToCopy = contractBox.textContent.trim();

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        showCopyPopup(copyBtn, "✅ Copied!");
      })
      .catch(err => {
        console.error("Failed to copy:", err);
        showCopyPopup(copyBtn, "❌ Failed!");
      });
  });

  // helper function for floating popup
  function showCopyPopup(target, message) {
    const popup = document.createElement("div");
    popup.className = "copy-popup";
    popup.textContent = message;

    // place relative to button
    const rect = target.getBoundingClientRect();
    popup.style.left = `${rect.left + rect.width / 2}px`;
    popup.style.top = `${rect.top - 10}px`;

    document.body.appendChild(popup);

    // animate + remove
    setTimeout(() => {
      popup.style.opacity = "0";
      popup.style.transform = "translateY(-20px)";
    }, 50);

    setTimeout(() => {
      popup.remove();
    }, 1500);
  }
}
