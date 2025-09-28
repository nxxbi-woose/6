// 🎵 Sound toggle
const sound = document.getElementById("backgroundSound");
const soundToggle = document.getElementById("soundToggle");

if (sound && soundToggle) {
  soundToggle.addEventListener("click", () => {
    if (sound.paused) {
      sound.play();
      soundToggle.textContent = "🔊";
    } else {
      sound.pause();
      soundToggle.textContent = "🔇";
    }
  });
}

// 🦋 Butterfly cursor effect with minimum distance spacing
function createButterfly(x, y) {
  const butterfly = document.createElement('div');
  butterfly.classList.add('butterfly');
  butterfly.style.left = x + 'px';
  butterfly.style.top = y + 'px';
  document.body.appendChild(butterfly);

  butterfly.addEventListener('animationend', () => {
    butterfly.remove();
  });
}

let lastX = 0;
let lastY = 0;
const minDistance = 50; // pixels

window.addEventListener('mousemove', e => {
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > minDistance) {
    createButterfly(e.clientX, e.clientY);
    lastX = e.clientX;
    lastY = e.clientY;
  }
});

window.addEventListener('touchmove', e => {
  for (let touch of e.touches) {
    createButterfly(touch.clientX, touch.clientY);
  }
});

// 🌟 Overlay logic (updated - no video, no button)
const overlay = document.getElementById("overlay");

if (overlay) {
  overlay.addEventListener("click", () => {
    // Play sound on tap if available
    if (sound) {
      sound.play().then(() => {
        if (soundToggle) soundToggle.textContent = "🔊";
      }).catch(err => {
        console.log("Autoplay blocked, will start after click:", err);
      });
    }

    // Fade out overlay
    overlay.classList.add("hidden");

    // Optional: remove totally after fade
    setTimeout(() => {
      overlay.remove();
    }, 1000);
  });
}

// 💬 Typewriter effect
const username = "yanawoose"; // permanent name
const quotes = [
  "Nag kaon kana lab?.",
];

let quoteIndex = 0;
let charIndex = 0;
let isDeleting = false;
const usernameElement = document.getElementById("username");
const quotesElement = document.getElementById("quotes");

// Type username once
function typeUsername(text, i = 0) {
  if (i < text.length) {
    usernameElement.textContent += text.charAt(i);
    setTimeout(() => typeUsername(text, i + 1), 120);
  } else {
    typeQuote(); // start quotes after username
  }
}

// Typewriter effect for quotes
function typeQuote() {
  let currentQuote = quotes[quoteIndex];

  if (isDeleting) {
    quotesElement.textContent = currentQuote.substring(0, charIndex--);
  } else {
    quotesElement.textContent = currentQuote.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentQuote.length) {
    isDeleting = true;
    setTimeout(typeQuote, 1700); // pause before deleting
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    quoteIndex = (quoteIndex + 1) % quotes.length; // next quote
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(typeQuote, speed);
}

// Start typing username first
document.addEventListener("DOMContentLoaded", () => {
  typeUsername(username);
});
