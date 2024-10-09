const request = require('supertest');
const express = require('express');
const Language = require('../models/Languages');
const languageRoutes = require('../controllers/languageController'); // Update path as per your structure

jest.mock('../models/Languages');

const app = express();
app.use(express.json());
app.use('/languages', languageRoutes);

describe('POST /languages/addLanguage', () => {
  it('should create a new language', async () => {
    const newLanguage = { name: 'JavaScript', popularity: 'High' };

    Language.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(newLanguage),
    }));

    const res = await request(app)
      .post('/languages/addLanguage')
      .send(newLanguage);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(newLanguage);
  });

  it('should return 500 if there is a server error', async () => {
    Language.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error('Server Error')),
    }));

    const res = await request(app)
      .post('/languages/addLanguage')
      .send({ name: 'Python' });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Server Error');
  });
});

describe('GET /languages/getAllLanguage', () => {
  it('should fetch all languages', async () => {
    const languages = [
      { name: 'JavaScript', popularity: 'High' },
      { name: 'Python', popularity: 'High' },
    ];

    Language.find.mockResolvedValue(languages);

    const res = await request(app).get('/languages/getAllLanguage');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].name).toBe('JavaScript');
  });

  it('should return 500 if there is a server error', async () => {
    Language.find.mockRejectedValue(new Error('Server Error'));

    const res = await request(app).get('/languages/getAllLanguage');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Server Error');
  });
});

describe('GET /languages/getAllLanguage/:id', () => {
  it('should fetch a language by ID', async () => {
    const language = { name: 'JavaScript', popularity: 'High' };

    Language.findById.mockResolvedValue(language);

    const res = await request(app).get('/languages/getAllLanguage/507f1f77bcf86cd799439011');

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('JavaScript');
  });

  it('should return 404 if language is not found', async () => {
    Language.findById.mockResolvedValue(null);

    const res = await request(app).get('/languages/getAllLanguage/507f1f77bcf86cd799439011');

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Language not found');
  });

  it('should return 500 if there is a server error', async () => {
    Language.findById.mockRejectedValue(new Error('Server Error'));

    const res = await request(app).get('/languages/getAllLanguage/507f1f77bcf86cd799439011');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Server Error');
  });
});

describe('PUT /languages/updateLanguage/:id', () => {
  it('should update a language by ID', async () => {
    const updatedLanguage = { name: 'TypeScript', popularity: 'Rising' };

    Language.findByIdAndUpdate.mockResolvedValue(updatedLanguage);

    const res = await request(app)
      .put('/languages/updateLanguage/507f1f77bcf86cd799439011')
      .send(updatedLanguage);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('TypeScript');
  });

  it('should return 404 if the language is not found', async () => {
    Language.findByIdAndUpdate.mockResolvedValue(null);

    const res = await request(app)
      .put('/languages/updateLanguage/507f1f77bcf86cd799439011')
      .send({ name: 'Rust' });

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Language not found');
  });

  it('should return 500 if there is a server error', async () => {
    Language.findByIdAndUpdate.mockRejectedValue(new Error('Server Error'));

    const res = await request(app)
      .put('/languages/updateLanguage/507f1f77bcf86cd799439011')
      .send({ name: 'Rust' });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Server Error');
  });
});

describe('DELETE /languages/deleteLanguage/:id', () => {
  it('should delete a language by ID', async () => {
    const language = { _id: '507f1f77bcf86cd799439011', name: 'Rust' };

    Language.findByIdAndDelete.mockResolvedValue(language);

    const res = await request(app).delete('/languages/deleteLanguage/507f1f77bcf86cd799439011');

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('Language deleted');
  });

  it('should return 404 if the language is not found', async () => {
    Language.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app).delete('/languages/deleteLanguage/507f1f77bcf86cd799439011');

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Language not found');
  });

  it('should return 500 if there is a server error', async () => {
    Language.findByIdAndDelete.mockRejectedValue(new Error('Server Error'));

    const res = await request(app).delete('/languages/deleteLanguage/507f1f77bcf86cd799439011');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Server Error');
  });
});
