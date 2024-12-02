const calendarContainer = document.getElementById("calendar");
const christmasIcons = [
  "fa-gift",
  "fa-tree",
  "fa-star",
  "fa-snowflake",
  "fa-candy-cane",
  "fa-bell",
  "fa-holly-berry",
  "fa-sleigh",
  "fa-snowman",
  "fa-cookie",
];
const gifts = [
  { name: "Chocolate", icon: "fa-chocolate" },
  { name: "Candy Cane", icon: "fa-candy-cane" },
  { name: "Ornament", icon: "fa-golf-ball-tee" },
  { name: "Toy Car", icon: "fa-car-side" },
  { name: "Teddy Bear", icon: "fa-paw" },
  { name: "Socks", icon: "fa-socks" },
  { name: "Brush", icon: "fa-brush" },
  { name: "Mittens", icon: "fa-mitten" },
  { name: "Hot Cocoa", icon: "fa-mug-hot" },
  { name: "Cookie", icon: "fa-cookie" },
  { name: "Gingerbread", icon: "fa-cookie-bite" },
  { name: "Candle", icon: "fa-fire" },
  { name: "Book", icon: "fa-book" },
  { name: "Puzzle", icon: "fa-puzzle-piece" },
  { name: "Keychain", icon: "fa-key" },
  { name: "Mug", icon: "fa-mug-saucer" },
  { name: "Pen", icon: "fa-pen" },
  { name: "Notebook", icon: "fa-book" },
  { name: "Scarf", icon: "fa-ribbon" },
  { name: "Hand Cream", icon: "fa-hand-holding-heart" },
  { name: "Tea", icon: "fa-mug-saucer" },
  { name: "Bookmark", icon: "fa-bookmark" },
  { name: "Stickers", icon: "fa-note-sticky" },
  { name: "Earrings", icon: "fa-gem" },
];
const colors = [
  "var(--color-red-1)",
  "var(--color-red-2)",
  "var(--color-red-3)",
  "var(--color-green-1)",
  "var(--color-green-2)",
  "var(--color-green-3)",
  "var(--color-gold)",
];

let calendarState =
  JSON.parse(localStorage.getItem("adventCalendarState")) ||
  Array(24).fill(false);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCalendar() {
  const shuffledColors = shuffleArray([
    ...colors,
    ...colors,
    ...colors,
    ...colors,
  ]);
  const shuffledIcons = shuffleArray([
    ...christmasIcons,
    ...christmasIcons,
    ...christmasIcons,
  ]);
  const shuffledGifts = shuffleArray([...gifts]);

  for (let i = 1; i <= 24; i++) {
    const box = document.createElement("div");
    box.classList.add("calendar-box");
    if (calendarState[i - 1]) {
      box.classList.add("opened");
    }

    const borderColor = shuffledColors[i - 1];
    box.style.borderColor = borderColor;

    const number = document.createElement("p");
    number.textContent = i;

    const icon = document.createElement("i");
    icon.classList.add("fas", shuffledIcons[i - 1]);
    icon.style.color = borderColor;

    const openText = document.createElement("span");
    openText.classList.add("open-text");
    openText.textContent = "Open me!";

    const giftReveal = document.createElement("div");
    giftReveal.classList.add("gift-reveal");

    const giftIcon = document.createElement("i");
    giftIcon.classList.add("fas", "fa-gift", "gift-icon");
    giftIcon.style.color = borderColor;

    const giftSpecificIcon = document.createElement("i");
    giftSpecificIcon.classList.add(
      "fas",
      shuffledGifts[i - 1].icon,
      "gift-specific-icon"
    );
    giftSpecificIcon.style.color = borderColor;

    const giftText = document.createElement("p");
    giftText.textContent = shuffledGifts[i - 1].name;

    giftReveal.appendChild(giftIcon);
    giftReveal.appendChild(giftSpecificIcon);
    giftReveal.appendChild(giftText);

    box.appendChild(number);
    box.appendChild(icon);
    box.appendChild(openText);
    box.appendChild(giftReveal);

    box.addEventListener("click", () => toggleBox(i - 1, box));

    calendarContainer.appendChild(box);
  }
}

function toggleBox(index, box) {
  if (!calendarState[index]) {
    calendarState[index] = true;
    box.classList.add("opened");
    box.classList.add("pop-out");
    saveState();

    // Remove pop-out effect after animation
    setTimeout(() => {
      box.classList.remove("pop-out");
    }, 500); // Match this to the animation duration
  }
}

function saveState() {
  localStorage.setItem("adventCalendarState", JSON.stringify(calendarState));
}

createCalendar();

// Accessibility: Add keyboard navigation
calendarContainer.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    if (e.target.classList.contains("calendar-box")) {
      e.preventDefault();
      e.target.click();
    }
  }
});

// Add ARIA labels for screen readers
const boxes = calendarContainer.querySelectorAll(".calendar-box");
boxes.forEach((box, index) => {
  box.setAttribute("role", "button");
  box.setAttribute("aria-label", `Day ${index + 1}`);
  box.setAttribute("tabindex", "0");
});
