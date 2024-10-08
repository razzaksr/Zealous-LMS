const request = require('supertest');
const express = require('express');
const McqQuestion = require('../models/McqQuestions');
const mcqRoutes = require('../controllers/mcqQuestionController');

// Initialize Express App and Middleware
const app = express();
app.use(express.json());
app.use('/mcqQuestions', mcqRoutes);

// Mock the McqQuestion model
jest.mock('../models/McqQuestions');

describe('MCQ Question Controller', () => {
  let mockMcqQuestion;

  beforeEach(() => {
    mockMcqQuestion = {
      _id: 'mockedId',
      question_text: 'What is the capital of France?',
      option_a: 'Berlin',
      option_b: 'Madrid',
      option_c: 'Paris',
      option_d: 'Lisbon',
      correct_option: 'option_c',
    };

    jest.clearAllMocks();
  });

  // Test for creating a new MCQ question (POST)
  it('should create a new MCQ question', async () => {
    McqQuestion.prototype.save.mockResolvedValue(mockMcqQuestion);

    const res = await request(app).post('/mcqQuestions/addMcqQuestion').send(mockMcqQuestion);

    expect(res.statusCode).toBe(201);
    expect(res.body.question_text).toBe(mockMcqQuestion.question_text);
    expect(res.body.correct_option).toBe(mockMcqQuestion.correct_option);
  });

  // Test for getting all MCQ questions (GET)
  it('should fetch all MCQ questions', async () => {
    McqQuestion.find.mockResolvedValue([mockMcqQuestion]);

    const res = await request(app).get('/mcqQuestions/getAllMcqQuestions');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].question_text).toBe(mockMcqQuestion.question_text);
  });

  // Test for fetching MCQ question by ID (GET)
  it('should fetch MCQ question by ID', async () => {
    McqQuestion.findById.mockResolvedValue(mockMcqQuestion);

    const res = await request(app).get(`/mcqQuestions/getAllMcqQuestions/${mockMcqQuestion._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.question_text).toBe(mockMcqQuestion.question_text);
    expect(res.body._id).toBe(mockMcqQuestion._id);
  });

  // Test for updating an MCQ question (PUT)
  it('should update an MCQ question by ID', async () => {
    const updatedQuestion = {
      ...mockMcqQuestion,
      question_text: 'Updated question text',
    };

    McqQuestion.findByIdAndUpdate.mockResolvedValue(updatedQuestion);

    const res = await request(app)
      .put(`/mcqQuestions/updateMcqQuestion/${mockMcqQuestion._id}`)
      .send(updatedQuestion);

    expect(res.statusCode).toBe(200);
    expect(res.body.question_text).toBe('Updated question text');
  });

  // Test for deleting an MCQ question (DELETE)
  it('should delete MCQ question by ID', async () => {
    McqQuestion.findByIdAndDelete.mockResolvedValue(mockMcqQuestion);

    const res = await request(app).delete(`/mcqQuestions/deleteMcqQuestion/${mockMcqQuestion._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('MCQ Question deleted');
  });

  // Test for handling non-existent MCQ question in DELETE
  it('should return 404 if MCQ question not found during deletion', async () => {
    McqQuestion.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app).delete('/mcqQuestions/deleteMcqQuestion/nonExistentId');

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('MCQ Question not found');
  });

  // Test for handling non-existent MCQ question in GET by ID
  it('should return 404 if MCQ question not found by ID', async () => {
    McqQuestion.findById.mockResolvedValue(null);

    const res = await request(app).get('/mcqQuestions/getAllMcqQuestions/nonExistentId');

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('MCQ Question not found');
  });

  // Test for handling server errors
  it('should return 500 on server error for creating a new MCQ question', async () => {
    McqQuestion.prototype.save.mockRejectedValue(new Error('Database error'));

    const res = await request(app).post('/mcqQuestions/addMcqQuestion').send(mockMcqQuestion);

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Database error');
  });
});
