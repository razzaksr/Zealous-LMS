const request = require("supertest");
const express = require("express");
const CodingTest = require("../models/CodingTests");
const codingTestRoutes = require("../controllers/codingTestController");

jest.mock("../models/CodingTests"); // Mocking the model

const app = express();
app.use(express.json());
app.use("/codingtests", codingTestRoutes);

describe("POST /codingtests/addCodingTest", () => {
  it("should successfully create a new coding test", async () => {
    const newCodingTest = {
      title: "Sample Test",
      description: "Test description",
    };

    CodingTest.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(newCodingTest),
    }));

    const res = await request(app)
      .post("/codingtests/addCodingTest")
      .send(newCodingTest);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(newCodingTest);
  });

  it("should return 500 if there is a server error", async () => {
    CodingTest.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error("Server Error")),
    }));

    const res = await request(app)
      .post("/codingtests/addCodingTest")
      .send({ title: "Sample Test" });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Server Error");
  });
});

describe("GET /codingtests/getAllCodingTests", () => {
  it("should fetch all coding tests", async () => {
    const codingTests = [
      { title: "Test 1", description: "Description 1" },
      { title: "Test 2", description: "Description 2" },
    ];

    CodingTest.find.mockResolvedValue(codingTests);

    const res = await request(app).get("/codingtests/getAllCodingTests");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].title).toBe("Test 1");
  });

  it("should return 500 if there is a server error", async () => {
    CodingTest.find.mockRejectedValue(new Error("Server Error"));

    const res = await request(app).get("/codingtests/getAllCodingTests");

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Server Error");
  });
});

describe("GET /codingtests/getCodingTestById/:id", () => {
  it("should fetch a coding test by ID", async () => {
    const codingTest = {
      _id: "123",
      title: "Sample Test",
      description: "Test description",
    };

    CodingTest.findById.mockResolvedValue(codingTest);

    const res = await request(app).get("/codingtests/getCodingTestById/123");

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Sample Test");
  });

  it("should return 404 if the coding test is not found", async () => {
    CodingTest.findById.mockResolvedValue(null);

    const res = await request(app).get("/codingtests/getCodingTestById/123");

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe("Coding Test not found");
  });

  it("should return 500 if there is a server error", async () => {
    CodingTest.findById.mockRejectedValue(new Error("Server Error"));

    const res = await request(app).get("/codingtests/getCodingTestById/123");

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Server Error");
  });
});

describe("PUT /codingtests/updateCodingTest/:id", () => {
  it("should update a coding test by ID", async () => {
    const updatedTest = {
      _id: "123",
      title: "Updated Test",
      description: "Updated description",
    };

    CodingTest.findByIdAndUpdate.mockResolvedValue(updatedTest);

    const res = await request(app)
      .put("/codingtests/updateCodingTest/123")
      .send(updatedTest);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Test");
  });

  it("should return 404 if the coding test is not found", async () => {
    CodingTest.findByIdAndUpdate.mockResolvedValue(null);

    const res = await request(app)
      .put("/codingtests/updateCodingTest/123")
      .send({ title: "New Test" });

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe("Coding Test not found");
  });

  it("should return 500 if there is a server error", async () => {
    CodingTest.findByIdAndUpdate.mockRejectedValue(new Error("Server Error"));

    const res = await request(app)
      .put("/codingtests/updateCodingTest/123")
      .send({ title: "New Test" });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Server Error");
  });
});

describe("DELETE /codingtests/deleteCodingTest/:id", () => {
  it("should delete a coding test by ID", async () => {
    const codingTest = { _id: "123", title: "Sample Test" };

    CodingTest.findByIdAndDelete.mockResolvedValue(codingTest);

    const res = await request(app).delete("/codingtests/deleteCodingTest/123");

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Coding Test deleted");
  });

  it("should return 404 if the coding test is not found", async () => {
    CodingTest.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app).delete("/codingtests/deleteCodingTest/123");

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe("Coding Test not found");
  });

  it("should return 500 if there is a server error", async () => {
    CodingTest.findByIdAndDelete.mockRejectedValue(new Error("Server Error"));

    const res = await request(app).delete("/codingtests/deleteCodingTest/123");

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Server Error");
  });
});
