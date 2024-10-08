const request = require('supertest');
const express = require('express');
const Submission = require('../models/Submissions');
const submissionRoutes = require('../controllers/submissionController');

// Initialize Express App and Middleware
const app = express();
app.use(express.json());
app.use('/submissions', submissionRoutes);

// Mock the Submission model
jest.mock('../models/Submissions');

describe('Submission Controller', () => {
  let mockSubmission;

  beforeEach(() => {
    mockSubmission = {
      _id: 'mockedSubmissionId',
      studentId: 'mockedStudentId',
      testId: 'mockedTestId',
      answers: ['answer1', 'answer2', 'answer3'],
      score: 80,
    };

    jest.clearAllMocks();
  });

  // Test for creating a new Submission (POST)
  it('should create a new Submission', async () => {
    Submission.prototype.save.mockResolvedValue(mockSubmission);

    const res = await request(app).post('/submissions/addSubmission').send(mockSubmission);

    expect(res.statusCode).toBe(201);
    expect(res.body.studentId).toBe(mockSubmission.studentId);
    expect(res.body.testId).toBe(mockSubmission.testId);
    expect(res.body.answers).toEqual(mockSubmission.answers);
    expect(res.body.score).toBe(mockSubmission.score);
  });

  // Test for getting all Submissions (GET)
  it('should fetch all Submissions', async () => {
    Submission.find.mockResolvedValue([mockSubmission]);

    const res = await request(app).get('/submissions/getAllSubmission');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].studentId).toBe(mockSubmission.studentId);
  });

  // Test for fetching Submission by ID (GET)
  it('should fetch Submission by ID', async () => {
    Submission.findById.mockResolvedValue(mockSubmission);

    const res = await request(app).get(`/submissions/getSubmissionById/${mockSubmission._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(mockSubmission._id);
    expect(res.body.studentId).toBe(mockSubmission.studentId);
  });

  // Test for updating a Submission (PUT)
  it('should update a Submission by ID', async () => {
    const updatedSubmission = {
      ...mockSubmission,
      score: 90,
    };

    Submission.findByIdAndUpdate.mockResolvedValue(updatedSubmission);

    const res = await request(app)
      .put(`/submissions/updateSubmission/${mockSubmission._id}`)
      .send(updatedSubmission);

    expect(res.statusCode).toBe(200);
    expect(res.body.score).toBe(90);
  });

  // Test for deleting a Submission (DELETE)
  it('should delete Submission by ID', async () => {
    Submission.findByIdAndDelete.mockResolvedValue(mockSubmission);

    const res = await request(app).delete(`/submissions/deleteSubmission/${mockSubmission._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('Submission deleted');
  });

  // Test for handling non-existent Submission in DELETE
  it('should return 404 if Submission not found during deletion', async () => {
    Submission.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app).delete('/submissions/deleteSubmission/nonExistentId');

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Submission not found');
  });

  // Test for handling non-existent Submission in GET by ID
  it('should return 404 if Submission not found by ID', async () => {
    Submission.findById.mockResolvedValue(null);

    const res = await request(app).get('/submissions/getSubmissionById/nonExistentId');

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Submission not found');
  });

  // Test for handling server errors
  it('should return 500 on server error for creating a new Submission', async () => {
    Submission.prototype.save.mockRejectedValue(new Error('Database error'));

    const res = await request(app).post('/submissions/addSubmission').send(mockSubmission);

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Database error');
  });
});
