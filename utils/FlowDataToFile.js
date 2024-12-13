const fs = require("fs");
const path = require("path");
const { addQuestionAnswerToReadme } = require("./addQuestionAnswerToReadme");

const pathToFile = path.join(__dirname, "../README.md");

async function workWithCheatSheet(questionInput, answerInput) {
  try {
    // Check if the file exists
    await fs.promises.stat(pathToFile);
    console.log(`The file at '${pathToFile}' exists.`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`The file at '${pathToFile}' does not exist. Creating it...`);
      try {
        await fs.promises.writeFile(pathToFile, "");
        console.log("File created successfully.");
      } catch (writeErr) {
        console.error("Error creating the file:", writeErr);
        return;
      }
    } else {
      console.error("Error checking the file:", err);
      return;
    }
  }

  // Append the question/answer to the file
  try {
    await fs.promises.appendFile(
      pathToFile,
      addQuestionAnswerToReadme(questionInput, answerInput)
    );
    console.log("Question & answer added to the file.");
  } catch (err) {
    console.error("Error writing the question to the file:", err);
  }
}

module.exports = { workWithCheatSheet };
