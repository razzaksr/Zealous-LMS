const express = require('express');
const Problem = require('../models/Problems');

const router = express.Router();

// GET all problems
router.get('/getAllProblems', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST a new problem
router.post('/addProblem', async (req, res) => {
  const { problem_id, title, description, difficulty, input_format, output_format, sample_input, constraints, time_limit, memory_limit, created_by } = req.body;

  if (!problem_id || !title || !description || !difficulty) {
    return res.status(400).json({ msg: 'Problem ID, title, description, and difficulty are required' });
  }

  try {
    const newProblem = new Problem({
      problem_id,
      title,
      description,
      difficulty,
      input_format,
      output_format,
      sample_input,
      constraints,
      time_limit,
      memory_limit,
      created_by,
    });

    const problem = await newProblem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// PUT (update) a problem
router.put('/updateProblem/:id', async (req, res) => {
  const { title, description, difficulty, input_format, output_format, sample_input, constraints, time_limit, memory_limit } = req.body;

  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ msg: 'Problem not found' });
    }

    problem.title = title || problem.title;
    problem.description = description || problem.description;
    problem.difficulty = difficulty || problem.difficulty;
    problem.input_format = input_format || problem.input_format;
    problem.output_format = output_format || problem.output_format;
    problem.sample_input = sample_input || problem.sample_input;
    problem.constraints = constraints || problem.constraints;
    problem.time_limit = time_limit || problem.time_limit;
    problem.memory_limit = memory_limit || problem.memory_limit;

    await problem.save();
    res.json(problem);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// DELETE a problem
router.delete('/deleteProblem/:id', async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);

    if (!problem) {
      return res.status(404).json({ msg: 'Problem not found' });
    }

    res.json({ msg: 'Problem removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
