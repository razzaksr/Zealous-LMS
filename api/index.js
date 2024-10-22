require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const adminDashboardMetricController = require("./controllers/adminDashboardMetricController");
const codingTestController = require("./controllers/codingTestController");
const languageController = require("./controllers/languageController");
const leaderboardController = require("./controllers/leaderboardController");
const mcqQuestionController = require("./controllers/mcqQuestionController");
const mcqTestController = require('./controllers/mcqTestController');
const problemController = require("./controllers/problemController");
const submissionController = require('./controllers/submissionController');
const tagController = require('./controllers/tagController');
const testcaseController = require('./controllers/testcaseController');
const userController = require("./controllers/userController");
const userTestResultController = require('./controllers/userTestResultController');

const userDashboardApi = require('./controllers/userDashboard');
const codeRoute = require('./controllers/codeController'); 
// const authController=require('./controllers/authController');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use Routes
app.use("/adminMetrics", adminDashboardMetricController);
app.use("/codingTests", codingTestController);
app.use("/languages", languageController);
app.use("/leaderboards", leaderboardController);
app.use("/mcqQuestions", mcqQuestionController);
app.use("/mcqTest", mcqTestController);
app.use("/problems", problemController);
app.use("/submissions", submissionController);
app.use("/tags", tagController);
app.use("/testcases", testcaseController);
app.use("/users", userController);
app.use("/userTestResults", userTestResultController);
// app.use("/auth",authController);
app.use("/userDashboardApi", userDashboardApi);
app.use('/api', codeRoute);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});