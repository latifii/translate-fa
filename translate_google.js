const fs = require("fs");
const translate = require("@iamtraction/google-translate");

const inputFile = "/input.srt";
const outputFile = "/output.srt";

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

// تابعی برای ترجمه محتویات SRT
const translateSrt = async (content) => {
  const lines = content.split("\n");
  const translatedLines = [];
  for (const line of lines) {
    if (/^[0-9]+$/.test(line) || line.includes("-->") || line.trim() === "") {
      translatedLines.push(line);
    } else {
      try {
        const res = await translate(line, { to: "fa" });
        translatedLines.push(res.text);
      } catch (err) {
        console.error("Translation error:", err);
        translatedLines.push(line); // در صورت خطا، متن اصلی را اضافه می‌کند
      }
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
