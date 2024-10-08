const request = require("supertest");
const express = require("express");
const Problem = require("../models/Problems");
const problemRoutes = require("../controllers/problemController");

jest.mock("../models/Problems");

const app = express();
app.use(express.json());
app.use("/problems", problemRoutes);

describe("POST /problems/addProblem", () => {
  it("should successfully create a new problem", async () => {
    const newProblem = {
      title: "Sample Problem",
      description: "Problem description",
      difficulty: "Medium",
      created_by: "507f1f77bcf86cd799439011"
    };

    Problem.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(newProblem),
    }));

    const res = await request(app)
      .post("/problems/addProblem")
      .send(newProblem);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(newProblem);
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app)
      .post("/problems/addProblem")
      .send({ description: "Problem description", difficulty: "Medium" });

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe('Title, description, and difficulty are required');
  });

  it("should return 400 if created_by is not a valid ObjectId", async () => {
    const res = await request(app)
      .post("/problems/addProblem")
      .send({ title: "Sample Problem", description: "Problem description", difficulty: "Medium", created_by: "invalidObjectId" });

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe('A valid created_by ObjectId is required');
  });

  it("should return 500 if there is a server error", async () => {
    Problem.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error("Server Error")),
    }));

    const res = await request(app)
      .post("/problems/addProblem")
      .send({ title: "Sample Problem", description: "Problem description", difficulty: "Medium", created_by: "507f1f77bcf86cd799439011" });

    expect(res.statusCode).toBe(500);
    expect(res.body.msg).toBe("Server Error");
  });
});

describe("GET /problems/getAllProblems", () => {
  it("should fetch all problems", async () => {
    const problems = [
      { title: "Problem 1", description: "Description 1", difficulty: "Easy" },
      { title: "Problem 2", description: "Description 2", difficulty: "Hard" },
    ];

    Problem.find.mockResolvedValue(problems);

    const res = await request(app).get("/problems/getAllProblems");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].title).toBe("Problem 1");
  });

  it("should return 500 if there is a server error", async () => {
    Problem.find.mockRejectedValue(new Error("Server Error"));

    const res = await request(app).get("/problems/getAllProblems");

    expect(res.statusCode).toBe(500);
    expect(res.text).toBe("Server Error");
  });
});

describe("PUT /problems/updateProblem/:id", () => {
  it("should update a problem by ID", async () => {
    const updatedProblem = {
      title: "Updated Problem",
      description: "Updated description",
      difficulty: "Hard",
    };

    Problem.findById.mockResolvedValue({
      ...updatedProblem,
      save: jest.fn().mockResolvedValue(updatedProblem),
    });

    const res = await request(app)
      .put("/problems/updateProblem/123")
      .send(updatedProblem);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Problem");
  });

  it("should return 404 if the problem is not found", async () => {
    Problem.findById.mockResolvedValue(null);

    const res = await request(app)
      .put("/problems/updateProblem/123")
      .send({ title: "New Problem" });

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe("Problem not found");
  });

  it("should return 500 if there is a server error", async () => {
    Problem.findById.mockRejectedValue(new Error("Server Error"));

    const res = await request(app)
      .put("/problems/updateProblem/123")
      .send({ title: "New Problem" });

    expect(res.statusCode).toBe(500);
    expect(res.text).toBe("Server Error");
  });
});

describe("DELETE /problems/deleteProblem/:id", () => {
  it("should delete a problem by ID", async () => {
    const problem = { _id: "123", title: "Sample Problem" };

    Problem.findByIdAndDelete.mockResolvedValue(problem);

    const res = await request(app).delete("/problems/deleteProblem/123");

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Problem removed");
  });

  it("should return 404 if the problem is not found", async () => {
    Problem.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app).delete("/problems/deleteProblem/123");

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe("Problem not found");
  });

  it("should return 500 if there is a server error", async () => {
    Problem.findByIdAndDelete.mockRejectedValue(new Error("Server Error"));

    const res = await request(app).delete("/problems/deleteProblem/123");

    expect(res.statusCode).toBe(500);
    expect(res.text).toBe("Server Error");
  });
});
