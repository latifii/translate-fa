import fs from "fs";
import { translate } from "@vitalets/google-translate-api";
import parser from "subtitles-parser";

async function translateSubtitle(inputFile, outputFile, excludeWords = []) {
  // Load subtitles
  const fileContent = fs.readFileSync(inputFile, "utf-8");
  const subs = parser.fromSrt(fileContent, { strict: true });

  // Translate each subtitle
  for (let sub of subs) {
    const words = sub.text.split(" ");
    const translatedWords = await Promise.all(
      words.map(async (word) => {
        if (
          excludeWords.map((w) => w.toLowerCase()).includes(word.toLowerCase())
        ) {
          return word;
        } else {
          try {
            const result = await translate(word, { from: "en", to: "fa" });
            return result.text;
          } catch (error) {
            console.error(`Error translating word "${word}":`, error);
            return word; // Return the original word in case of an error
          }
        }
      })
    );
    sub.text = translatedWords.join(" ");
  }

  // Convert subtitles back to SRT format
  const outputContent = parser.toSrt(subs);

  // Save translated subtitles
  fs.writeFileSync(outputFile, outputContent, "utf-8");
}

// Example usage
const inputFile = "input.srt"; // Replace with your input subtitle file path
const outputFile = "output.srt"; // Replace with your desired output subtitle file path

// List of words to exclude from translation
const excludeWords = ["state", "function"];

translateSubtitle(inputFile, outputFile, excludeWords)
  .then(() => console.log("Translation completed!"))
  .catch((err) => console.error("Error during translation:", err));
