let anagrams = [
  ["Can Assault", "Santa Claus"],
  ["Refreshed Erudite Londoner", "Rudolf the Red Nose Reindeer"],
  ["Frosty The Snowman", "Honesty Warms Front"],
  ["Drastic Charms", "Christmas Cards"],
  ["Congress Liar", "Carol Singers"],
  ["The Tin Glints", "Silent Night"],
  ["Be The Helm", "Bethlehem"],
  ["Is Car Thieves", "Christmas Eve"],
];

// Helper function to normalize and sort characters
function normalizeString(str) {
  return str.toLowerCase().replace(/\s+/g, "").split("").sort().join("");
}

// Separate correct and incorrect anagrams using filter
function findAnagrams(array) {
  const correct = array.filter(
    ([str1, str2]) => normalizeString(str1) === normalizeString(str2)
  );
  const incorrect = array.filter(
    ([str1, str2]) => normalizeString(str1) !== normalizeString(str2)
  );
  return { correct, incorrect };
}

// UI interaction
document.getElementById("checkAnagrams").addEventListener("click", () => {
  const { correct, incorrect } = findAnagrams(anagrams);
  const outputDiv = document.getElementById("output");

  outputDiv.innerHTML = `
    <h3>Correct Anagrams:</h3>
    <ul class="correct">
      ${correct.map((pair) => `<li>${pair[0]} ↔ ${pair[1]}</li>`).join("")}
    </ul>
    <h3>Incorrect Anagrams:</h3>
    <ul class="incorrect">
      ${incorrect.map((pair) => `<li>${pair[0]} ↔ ${pair[1]}</li>`).join("")}
    </ul>
  `;
});
