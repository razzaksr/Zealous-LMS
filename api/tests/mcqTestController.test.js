const request = require('supertest');
const express = require('express');
const McqTest = require('../models/McqTests');
const mcqTestRoutes = require('../controllers/mcqTestController');

// Initialize Express App and Middleware
const app = express();
app.use(express.json());
app.use('/mcqTests', mcqTestRoutes);

// Mock the McqTest model
jest.mock('../models/McqTests');

describe('MCQ Test Controller', () => {
  let mockMcqTest;

  beforeEach(() => {
    mockMcqTest = {
      _id: 'mockedTestId',
      title: 'Sample MCQ Test',
      description: 'This is a sample test description',
      questions: ['questionId1', 'questionId2'],
      duration: 30,
    };

    jest.clearAllMocks();
  });

  // Test for creating a new MCQ test (POST)
  it('should create a new MCQ test', async () => {
    McqTest.prototype.save.mockResolvedValue(mockMcqTest);

    const res = await request(app).post('/mcqTests/addMcqTest').send(mockMcqTest);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(mockMcqTest.title);
    expect(res.body.description).toBe(mockMcqTest.description);
    expect(res.body.questions).toEqual(mockMcqTest.questions);
  });

  // Test for getting all MCQ tests (GET)
  it('should fetch all MCQ tests', async () => {
    McqTest.find.mockResolvedValue([mockMcqTest]);

    const res = await request(app).get('/mcqTests/getAllMcqTests');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe(mockMcqTest.title);
  });

  // Test for fetching MCQ test by ID (GET)
  it('should fetch MCQ test by ID', async () => {
    McqTest.findById.mockResolvedValue(mockMcqTest);

    const res = await request(app).get(`/mcqTests/getMcqTestById/${mockMcqTest._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(mockMcqTest.title);
    expect(res.body._id).toBe(mockMcqTest._id);
  });

  // Test for updating an MCQ test (PUT)
  it('should update an MCQ test by ID', async () => {
    const updatedTest = {
      ...mockMcqTest,
      title: 'Updated Test Title',
    };

    McqTest.findByIdAndUpdate.mockResolvedValue(updatedTest);

    const res = await request(app)
      .put(`/mcqTests/updateMcqTest/${mockMcqTest._id}`)
      .send(updatedTest);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Test Title');
  });

  // Test for deleting an MCQ test (DELETE)
  it('should delete MCQ test by ID', async () => {
    McqTest.findByIdAndDelete.mockResolvedValue(mockMcqTest);

    const res = await request(app).delete(`/mcqTests/deleteMcqTest/${mockMcqTest._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('MCQ Test deleted');
  });

  // Test for handling non-existent MCQ test in DELETE
  it('should return 404 if MCQ test not found during deletion', async () => {
    McqTest.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app).delete('/mcqTests/deleteMcqTest/nonExistentId');

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('MCQ Test not found');
  });

  // Test for handling non-existent MCQ test in GET by ID
  it('should return 404 if MCQ test not found by ID', async () => {
    McqTest.findById.mockResolvedValue(null);

    const res = await request(app).get('/mcqTests/getMcqTestById/nonExistentId');

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('MCQ Test not found');
  });

  // Test for handling server errors
  it('should return 500 on server error for creating a new MCQ test', async () => {
    McqTest.prototype.save.mockRejectedValue(new Error('Database error'));

    const res = await request(app).post('/mcqTests/addMcqTest').send(mockMcqTest);

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Database error');
  });
});
