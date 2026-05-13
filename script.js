const counter = document.getElementById("revenueCounter");

const base = 300045320;
const startDate = new Date("2025-01-01T00:00:00");

function getDailyRate(day) {
  if (day >= 1 && day <= 4) return 45000;
  if (day === 5 || day === 6) return 65000;
  return 50000;
}

function calculateRevenue() {
  const now = new Date();
  let total = base;
  const current = new Date(startDate);

  while (current < now) {
    const day = current.getDay();
    const rate = getDailyRate(day);

    const nextDay = new Date(current);
    nextDay.setDate(current.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    const end = nextDay > now ? now : nextDay;
    const fractionOfDay = (end - current) / (1000 * 60 * 60 * 24);

    total += rate * fractionOfDay;

    current.setDate(current.getDate() + 1);
    current.setHours(0, 0, 0, 0);
  }

  return total;
}

function updateCounter() {
  if (!counter) return;

  const value = calculateRevenue();

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
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => observer.observe(el));

const mapData = {
  "Los Angeles": {
    title: "Culture, Media & Influence",
    copy: "Brand positioning, content gravity, and cultural relevance built into operational systems."
  },
  "Las Vegas": {
    title: "Retail, Hospitality & High-Volume Execution",
    copy: "Systems built for fast-moving teams, revenue consistency, and premium customer experience."
  },
  "Austin": {
    title: "Innovation, Startups & Technology",
    copy: "Lean systems, scalable workflows, and technology-forward growth infrastructure."
  },
  "San Francisco": {
    title: "Infrastructure, Intelligence & Systems",
    copy: "Data-driven operations, tech-enabled execution, and precision performance architecture."
  },
  "New York": {
    title: "Finance, Markets & Strategy",
    copy: "Executive strategy, market expansion, and revenue intelligence for competitive growth."
  }
};

const mapButtons = document.querySelectorAll(".intelligence-map button");
const mapCity = document.getElementById("mapCity");
const mapTitle = document.getElementById("mapTitle");
const mapCopy = document.getElementById("mapCopy");

mapButtons.forEach(button => {
  button.addEventListener("click", () => {
    const city = button.dataset.city;
    mapCity.textContent = city;
    mapTitle.textContent = mapData[city].title;
    mapCopy.textContent = mapData[city].copy;
  });
});
