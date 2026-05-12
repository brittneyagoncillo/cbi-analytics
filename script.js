const counter = document.getElementById("revenueCounter");

const base = 120045320;
const startDate = new Date("2025-01-01T00:00:00");
const ratePerDay = 45000;

function updateCounter() {
  if (!counter) return;

  const now = new Date();
  const daysPassed = (now - startDate) / (1000 * 60 * 60 * 24);
  const value = base + daysPassed * ratePerDay;

  counter.textContent = value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

updateCounter();
setInterval(updateCounter, 1000);

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  if (!glow) return;
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => observer.observe(el));
