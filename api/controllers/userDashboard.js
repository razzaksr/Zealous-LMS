const express = require('express');
const router = express.Router();

const User = require("../models/Users");
const CodingTest = require("../models/CodingTests");
const McqTest = require("../models/McqTests");
const Problem = require("../models/Problems");
const Testcase = require("../models/Testcase");
const auth = require("../middleware/authMiddleware");

// Microservices for coding tests

router.get('/getCodingTestsToUsers/:id', auth, async (req, res) => {
    try{
        const loggedUser = await User.findById(req.params.id);
        if (!loggedUser.codingTestsAssigned || loggedUser.codingTestsAssigned.length === 0) {
            res.status(404).json({ msg: "No coding tests assigned to the user" });
        }
        const codingTests = await CodingTest.find({ _id: { $in: loggedUser.codingTestsAssigned } });
        res.status(200).json(codingTests);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

router.get('/getProblemsByCodingTestsId/:id', auth, async (req, res) => {
    try{
        const codingTest = await CodingTest.findById(req.params.id);
        if (!codingTest.problem_id || codingTest.problem_id.length === 0) return res.status(404).json({ msg: 'Problems not found' });
        const problems = await Problem.find({ _id: { $in: codingTest.problem_id } });
        res.status(200).json(problems);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

router.get('/getTestcasesByProblemId/:id', auth, async (req, res) => {
    try{
        const problem = await Problem.findById(req.params.id);
        if (!problem.testcase_id || problem.testcase_id.length === 0) return res.status(404).json({ msg: 'Test cases not found' });
        const testcase = await Testcase.find({ _id: { $in: problem.testcase_id } });
        res.status(200).json(testcase);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Microservices for mcq tests

router.get('/getMcqTestsToUsers/:id', auth, async (req, res) => {
    try{
        const loggedUser = await User.findById(req.params.id);
        if (!loggedUser.mcqTestsAssigned || loggedUser.mcqTestsAssigned.length === 0) {
            res.status(404).json({ msg: "No mcq tests assigned to the user" });
        }
        const mcqTests = await McqTest.find({ _id: { $in: loggedUser.mcqTestsAssigned } });
        res.status(200).json(mcqTests);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;