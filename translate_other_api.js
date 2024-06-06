const fs = require("fs");
const translate = require("@iamtraction/google-translate");

const inputFile = "input.srt";
const outputFile = "output.srt";
const wordsToKeep = [
  "state",
  "function",
  "effect",
  "components",
  "component",
  "data",
  "prop",
  "props",
  "string",
  "array",
  "object",
  "value",
  "values",
  "type",
  "types",
  "hook",
  "typescript",
  "event",
  "events",
  "custom",
  "react",
  "dynamically",
  "dynamic",
  "goal",
]; // کلماتی که نباید ترجمه شوند

// تابعی برای خواندن فایل SRT
const readSrtFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

// تابعی برای نوشتن فایل SRT
const writeSrtFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, "utf8", (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// تابعی برای بررسی کلمات خاص
const isWordToKeep = (word) => {
  return wordsToKeep.some((keepWord) =>
    new RegExp(`\\b${keepWord}\\b`, "i").test(word)
  );
};

// تابعی برای ترجمه محتویات SRT
const translateSrt = async (content) => {
  const lines = content.split("\n");
  const translatedLines = [];
  for (const line of lines) {
    if (/^[0-9]+$/.test(line) || line.includes("-->") || line.trim() === "") {
      translatedLines.push(line);
    } else {
      const words = line.split(" ");
      const translatedWords = [];
      for (const word of words) {
        if (isWordToKeep(word)) {
          translatedWords.push(word);
        } else {
          try {
            const res = await translate(word, { to: "fa" });
            if (res && res.text) {
              translatedWords.push(res.text);
            } else {
              translatedWords.push(word);
            }
          } catch (err) {
            console.error(`Error translating word "${word}":`, err);
            translatedWords.push(word); // در صورت خطا، کلمه اصلی را اضافه می‌کند
          }
        }
      }
      translatedLines.push(translatedWords.join(" "));
    }
  }
  return translatedLines.join("\n");
};

// تابع اصلی برای خواندن، ترجمه و نوشتن فایل SRT
const processSrtFile = async (inputFile, outputFile) => {
  try {
    const content = await readSrtFile(inputFile);
    const translatedContent = await translateSrt(content);
    await writeSrtFile(outputFile, translatedContent);
    console.log("Translation completed successfully.");
  } catch (err) {
    console.error("Error processing SRT file:", err);
  }
};

// اجرای فرآیند
processSrtFile(inputFile, outputFile);
