const express = require("express");
const { workWithCheatSheet } = require("../utils/FlowDataToFile");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { question, answer } = req.body;

  try {
    await workWithCheatSheet(question, answer);
    res.redirect("/");
  } catch (err) {
    console.error("Error processing the request:", err);
    next(err); // Pass the error to an error-handling middleware
  }
});

module.exports = router;

