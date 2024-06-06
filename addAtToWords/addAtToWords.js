const fs = require("fs");
const parser = require("subtitles-parser");

function addAtToWords(text, words) {
  const wordsSet = new Set(words.map((word) => word.toLowerCase()));
  return text
    .split(" ")
    .map((word) => {
      // Separate word from punctuation
      const match = word.match(/^([a-zA-Z]+)([.,!?]?)$/);
      if (match) {
        const [_, cleanWord, punctuation] = match;
        if (wordsSet.has(cleanWord.toLowerCase())) {
          return `@${cleanWord}@${punctuation}`;
        }
        return word;
      }
      return word;
    })
    .join(" ");
}

async function modifySubtitle(inputFile, outputFile, words) {
  // Load subtitles
  const fileContent = fs.readFileSync(inputFile, "utf-8");
  const subs = parser.fromSrt(fileContent, { strict: true });

  // Add '@' to each word in the subtitles
  for (let sub of subs) {
    sub.text = addAtToWords(sub.text, words);
  }

  // Convert subtitles back to SRT format
  const outputContent = parser.toSrt(subs);

  // Save modified subtitles
  fs.writeFileSync(outputFile, outputContent, "utf-8");
}

// Example usage
const inputFile = "input_with_at.srt"; // Replace with your input subtitle file path
const outputFile = "output_with_at.srt"; // Replace with your desired output subtitle file path

// List of words to add '@' around
const words = ["state", "react", "function", "forms", "refs", "prop", "props"];

modifySubtitle(inputFile, outputFile, words)
  .then(() => console.log("Modification completed!"))
  .catch((err) => console.error("Error during modification:", err));
