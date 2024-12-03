const hackedEmojis = {
  angry: "🎁",
  thumbsdown: "👏",
  man_facepalming: "🎅",
  cry: "😄",
  puke: "🤩",
};

const emojiSentiments = {
  "😠": "negative",
  "👎": "negative",
  "🤦": "negative",
  "😭": "negative",
  "🤮": "negative",
  "😡": "negative",
  "😤": "negative",
  "😒": "negative",
  "😩": "negative",
  "😫": "negative",
  "🙄": "negative",
  "😑": "negative",
  "😕": "negative",
  "😟": "negative",
  "😔": "negative",
  "😞": "negative",
  "😖": "negative",
  "😣": "negative",
  "😢": "negative",
  "😥": "negative",
  "😪": "negative",
  "😓": "negative",
  "😨": "negative",
  "😱": "negative",
  "😰": "negative",
  "😵": "negative",
  "🤢": "negative",
  "🤧": "negative",
  "😷": "negative",
  "🤒": "negative",
};

const positiveEmojis = [
  "🎁",
  "👏",
  "🎅",
  "😄",
  "🤩",
  "😊",
  "😃",
  "😀",
  "🥳",
  "🎉",
  "👍",
  "💖",
  "🌟",
  "🦄",
  "🌈",
  "🍕",
  "🍦",
  "🎈",
];

function getPositiveEmoji() {
  return positiveEmojis[Math.floor(Math.random() * positiveEmojis.length)];
}

function isNegativeEmoji(emoji) {
  return emojiSentiments[emoji] === "negative";
}

function emojifyWord(word) {
  if (word.startsWith(":") && word.endsWith(":")) {
    const shortcode = word.slice(1, -1);
    return hackedEmojis[shortcode] || word;
  } else if (isNegativeEmoji(word)) {
    return getPositiveEmoji();
  }
  return word;
}

function emojifyPhrase(phrase) {
  const emojiRegex =
    /:\w+:|[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu;

  return phrase.replace(emojiRegex, (match) => emojifyWord(match));
}

// Test the functions
console.log("emojifyWord tests:");
console.log(emojifyWord(":angry:")); // Should return 🎁
console.log(emojifyWord("😠")); // Should return a random positive emoji

console.log("\nemojifyPhrase tests:");
console.log(emojifyPhrase("Just read your article :thumbsdown:")); // Should return "Just read your article 👏"
console.log(emojifyPhrase("Those shoes :puke:")); // Should return "Those shoes 🤩"
console.log(emojifyPhrase("I'm so :angry: right now! :cry:")); // Should return "I'm so 🎁 right now! 😄"
console.log(emojifyPhrase("I'm so 😠 right now! 😭")); // Should replace both emojis with positive ones
console.log(emojifyPhrase("That's a 👎 from me.")); // Should replace the thumbsdown
console.log(emojifyPhrase("I 😡 this! It makes me want to 😤")); // Should replace both emojis

// Add event listener to emojify text input
document.addEventListener("DOMContentLoaded", () => {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter text with emojis or shortcodes";

  const output = document.createElement("p");
  output.id = "output";

  input.addEventListener("input", () => {
    output.textContent = `Emojified: ${emojifyPhrase(input.value)}`;
  });

  document.body.appendChild(input);
  document.body.appendChild(output);
});
