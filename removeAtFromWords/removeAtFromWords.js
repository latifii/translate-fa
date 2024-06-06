const fs = require("fs");
const parser = require("subtitles-parser");

function removeAllAtSymbols(text) {
  return text.replace(/@/g, "");
}

async function restoreSubtitle(inputFile, outputFile) {
  // Load subtitles
  const fileContent = fs.readFileSync(inputFile, "utf-8");
  const subs = parser.fromSrt(fileContent, { strict: true });

  // Remove '@' from each word in the subtitles
  for (let sub of subs) {
    sub.text = removeAllAtSymbols(sub.text);
  }

  // Convert subtitles back to SRT format
  const outputContent = parser.toSrt(subs);

  // Save restored subtitles
  fs.writeFileSync(outputFile, outputContent, "utf-8");
}

// Example usage
const inputFile = "output_at.srt"; // Replace with your input subtitle file path
const outputFile = "output_restored.srt"; // Replace with your desired

restoreSubtitle(inputFile, outputFile)
  .then(() => console.log("Restoration completed!"))
  .catch((err) => console.error("Error during restoration:", err));
