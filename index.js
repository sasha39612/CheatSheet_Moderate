const fs = require("fs");

function workWithCheatSheet() {
  const questionInput = document.getElementById("question");
  const answerInput = document.getElementById("answer");

  const pathToFile = "./README.md";

  // Check if the file exists
  fs.stat(pathToFile, (err, stats) => {
    if (err) {
      console.log(`The file at '${pathToFile}' does not exist. Creating it...`);
      fs.writeFile(pathToFile, "", (writeErr) => {
        if (writeErr) {
          console.error("Error creating the file:", writeErr);
        } else {
          console.log("File created successfully.");
        }
      });
    } else {
      console.log(`The file at '${pathToFile}' exists.`);
    }
  });

  function addQuestionToFile(input) {
    const question = input.value;
    fs.appendFile(pathToFile, `Question: ${question}\n`, (err) => {
      if (err) {
        console.error("Error writing the question to the file:", err);
      } else {
        console.log("Question added to the file.");
      }
    });
  }

  function addAnswerToFile(input) {
    const answer = input.value;
    fs.appendFile(pathToFile, `Answer: ${answer}\n`, (err) => {
      if (err) {
        console.error("Error writing the answer to the file:", err);
      } else {
        console.log("Answer added to the file.");
      }
    });
  }

  // Add content to the file
  addQuestionToFile(questionInput);
  addAnswerToFile(answerInput);
}
