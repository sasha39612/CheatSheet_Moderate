const fs = require("fs");
const path = require("path");

const pathToFile = path.join(__dirname, "../README.md");

async function addQuestionToReadme(question) {
  try {
    // Read the current contents of the README.md file
    const data = await fs.promises.readFile(pathToFile, "utf8");

    // Extract the `Content` section or initialize it
    const tableStart = "### Content";
    let newData = data.slice();
    if (!data.includes(tableStart)) {
      newData += `\n\n${tableStart}\n\n| №   | Question |\n| --- | --- | --- |\n`;
    }

    // Extract existing rows to calculate the new question number
    const matchRows = newData.match(/\| (\d+)\s+\|.*\|/g) || [];
    const matchRowsCopy = [...matchRows];
    const lastNumber = matchRows.length
      ? parseInt(matchRows.pop().match(/\| (\d+)/)[1], 10)
      : 0;
    const newNumber = lastNumber + 1;

    // Generate a slug for the link
    const slug = question
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // Remove special characters
      .replace(/\s+/g, "-"); // Replace spaces with dashes

    // Add the new question to the table
    const newRow = `| ${newNumber}   | [${question}](#${slug}) |`;

    if (data.includes(tableStart)) {
      newData = newData.replace(
        matchRowsCopy[matchRowsCopy.length - 1],
        `${matchRowsCopy[matchRowsCopy.length - 1]}\n${newRow}`
      );
    } else {
      newData = newData.replace(
        `${tableStart}\n\n| №   | Question |\n| --- | --- | --- |\n`,
        `${tableStart}\n\n| №   | Question |\n| --- | --- | --- |\n${newRow}`
      );
    }

    // Write the updated contents back to the file
    await fs.promises.writeFile(pathToFile, newData, "utf8");
    console.log(`Question added: ${question}`);
  } catch (err) {
    console.error("Error updating the README.md file:", err);
  }
}

module.exports = { addQuestionToReadme };
