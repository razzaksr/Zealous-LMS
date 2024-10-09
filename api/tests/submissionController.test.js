const request = require('supertest');
const express = require('express');
const Submission = require('../models/Submissions');
const submissionRoutes = require('../controllers/submissionController');

jest.mock('../models/Submissions');

const app = express();
app.use(express.json());
app.use('/submissions', submissionRoutes);

describe('POST /submissions/addSubmission', () => {
  it('should successfully create a new submission', async () => {
    const newSubmission = {
      problem_id: '507f1f77bcf86cd799439011',
      user_id: '507f1f77bcf86cd799439012',
      solution: 'console.log("solution");',
      status: 'Accepted'
    };

    Submission.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(newSubmission),
    }));

    const res = await request(app)
      .post('/submissions/addSubmission')
      .send(newSubmission);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(newSubmission);
  });

  it('should return 500 if there is a server error', async () => {
    Submission.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error('Server Error')),
    }));

    const res = await request(app)
      .post('/submissions/addSubmission')
      .send({ solution: 'sample solution' });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Server Error');
  });
});

describe('GET /submissions/getAllSubmission', () => {
  it('should fetch all submissions', async () => {
    const submissions = [
      { solution: 'console.log("solution 1");', status: 'Accepted' },
      { solution: 'console.log("solution 2");', status: 'Rejected' },
    ];

    Submission.find.mockResolvedValue(submissions);

    const res = await request(app).get('/submissions/getAllSubmission');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].solution).toBe('console.log("solution 1");');
  });

  it('should return 500 if there is a server error', async () => {
    Submission.find.mockRejectedValue(new Error('Server Error'));

    const res = await request(app).get('/submissions/getAllSubmission');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Server Error');
  });
});

describe('GET /submissions/getSubmissionById/:id', () => {
  it('should fetch a submission by ID', async () => {
    const submission = {
      solution: 'console.log("solution 1");',
      status: 'Accepted'
    };

    Submission.findById.mockResolvedValue(submission);

    const res = await request(app).get('/submissions/getSubmissionById/507f1f77bcf86cd799439011');

    expect(res.statusCode).toBe(200);
    expect(res.body.solution).toBe('console.log("solution 1");');
  });

  it('should return 404 if submission is not found', async () => {
    Submission.findById.mockResolvedValue(null);

    const res = await request(app).get('/submissions/getSubmissionById/507f1f77bcf86cd799439011');

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Submission not found');
  });

  it('should return 500 if there is a server error', async () => {
    Submission.findById.mockRejectedValue(new Error('Server Error'));

    const res = await request(app).get('/submissions/getSubmissionById/507f1f77bcf86cd799439011');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Server Error');
  });
});

describe('PUT /submissions/updateSubmission/:id', () => {
  it('should update a submission by ID', async () => {
    const updatedSubmission = {
      solution: 'console.log("updated solution");',
      status: 'Accepted'
    };

    Submission.findByIdAndUpdate.mockResolvedValue(updatedSubmission);

    const res = await request(app)
      .put('/submissions/updateSubmission/507f1f77bcf86cd799439011')
      .send(updatedSubmission);

    expect(res.statusCode).toBe(200);
    expect(res.body.solution).toBe('console.log("updated solution");');
  });

  it('should return 404 if the submission is not found', async () => {
    Submission.findByIdAndUpdate.mockResolvedValue(null);

    const res = await request(app)
      .put('/submissions/updateSubmission/507f1f77bcf86cd799439011')
      .send({ solution: 'new solution' });

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Submission not found');
  });

  it('should return 500 if there is a server error', async () => {
    Submission.findByIdAndUpdate.mockRejectedValue(new Error('Server Error'));

    const res = await request(app)
      .put('/submissions/updateSubmission/507f1f77bcf86cd799439011')
      .send({ solution: 'new solution' });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Server Error');
  });
});

describe('DELETE /submissions/deleteSubmission/:id', () => {
  it('should delete a submission by ID', async () => {
    const submission = { _id: '507f1f77bcf86cd799439011', solution: 'Sample Solution' };

    Submission.findByIdAndDelete.mockResolvedValue(submission);

    const res = await request(app).delete('/submissions/deleteSubmission/507f1f77bcf86cd799439011');

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('Submission deleted');
  });

  it('should return 404 if the submission is not found', async () => {
    Submission.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app).delete('/submissions/deleteSubmission/507f1f77bcf86cd799439011');

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Submission not found');
  });

  it('should return 500 if there is a server error', async () => {
    Submission.findByIdAndDelete.mockRejectedValue(new Error('Server Error'));

    const res = await request(app).delete('/submissions/deleteSubmission/507f1f77bcf86cd799439011');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Server Error');
  });
});
