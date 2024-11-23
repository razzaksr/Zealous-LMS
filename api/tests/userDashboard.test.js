const request = require("supertest");
const express = require("express");
const userDashboardApi = require("../controllers/userDashboard");
const jwt = require("jsonwebtoken");

// Mock models
jest.mock("../models/Users");
jest.mock("../models/CodingTests");
jest.mock("../models/Problems");
jest.mock("../models/Testcase");

const User = require("../models/Users");
const CodingTest = require("../models/CodingTests");
const Problem = require("../models/Problems");
const Testcase = require("../models/Testcase");

const app = express();
app.use(express.json());
app.use("/userDashboardApi", userDashboardApi);

const mockToken = jwt.sign({ _id: "6708c037fdc16bcaed9b5be6" }, process.env.JWT_SECRET, { expiresIn: "1h" });

describe("GET /getCodingTestsToUsers/:id", () => {
  it("should return 404 if no coding tests are assigned to the user", async () => {
    const mockUserId = "6708c037fdc16bcaed9b5be";

    User.findById.mockResolvedValue({
      _id: mockUserId,
      codingTestsAssigned: [],
    });

    const res = await request(app).get(
      `/userDashboardApi/getCodingTestsToUsers/${mockUserId}`)
      .set("Authorization", `Bearer ${mockToken}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.msg).toEqual("No coding tests assigned to the user");
  });

  it("should return coding tests if user has codingTestsAssigned", async () => {
    const mockUserId = "6703bccac801c34498e5649a";
    const mockCodingTestsAssigned = [
      "6703bccac801c34498e5649b",
      "6703bccac801c34498e5649c",
    ];
    const mockCodingTests = [
      {
        _id: "6703bccac801c34498e5649b",
        title: "Test 1",
        description: "Coding test 1",
      },
      {
        _id: "6703bccac801c34498e5649c",
        title: "Test 2",
        description: "Coding test 2",
      },
    ];

    User.findById.mockResolvedValue({
      _id: mockUserId,
      codingTestsAssigned: mockCodingTestsAssigned,
    });

    CodingTest.find.mockResolvedValue(mockCodingTests);

    const res = await request(app).get(
      `/userDashboardApi/getCodingTestsToUsers/${mockUserId}`)
      .set("Authorization", `Bearer ${mockToken}`);
      ;

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockCodingTests);
  });

  it("should return 500 on server error", async () => {
    const mockUserId = "6703bccac801c34498e5649a";

    User.findById.mockRejectedValue(new Error("Server Error"));

    const res = await request(app)
      .get(`/userDashboardApi/getCodingTestsToUsers/${mockUserId}`)
      .set("Authorization", `Bearer ${mockToken}`);

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual("Server Error");
  });
});

describe("GET /getProblemsByCodingTestsId/:id", () => {
  it("should return 404 if no problems are found for the coding test", async () => {
    const mockCodingTestId = "6703bccac801c34498e5649a";

    CodingTest.findById.mockResolvedValue({
      _id: mockCodingTestId,
      problem_id: [],
    });

    const res = await request(app)
      .get(`/userDashboardApi/getProblemsByCodingTestsId/${mockCodingTestId}`)
      .set("Authorization", `Bearer ${mockToken}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.msg).toEqual("Problems not found");
  });

  it("should return problems if coding test has associated problems", async () => {
    const mockCodingTestId = "6703bccac801c34498e5649a";
    const mockProblemIds = [
      "6703bccac801c34498e5649b",
      "6703bccac801c34498e5649c",
    ];
    const mockProblems = [
      {
        _id: "6703bccac801c34498e5649b",
        title: "Problem 1",
        description: "First problem",
      },
      {
        _id: "6703bccac801c34498e5649c",
        title: "Problem 2",
        description: "Second problem",
      },
    ];

    CodingTest.findById.mockResolvedValue({
      _id: mockCodingTestId,
      problem_id: mockProblemIds,
    });

    Problem.find.mockResolvedValue(mockProblems);

    const res = await request(app)
      .get(`/userDashboardApi/getProblemsByCodingTestsId/${mockCodingTestId}`)
      .set("Authorization", `Bearer ${mockToken}`);
      
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockProblems);
  });

  it("should return 500 on server error", async () => {
    const mockCodingTestId = "6703bccac801c34498e5649a";

    CodingTest.findById.mockRejectedValue(new Error("Server Error"));

    const res = await request(app)
      .get(`/userDashboardApi/getProblemsByCodingTestsId/${mockCodingTestId}`)
      .set("Authorization", `Bearer ${mockToken}`);

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual("Server Error");
  });
});

describe("GET /getTestcasesByProblemId/:id", () => {
  it("should return 404 if no test cases are found for the problem", async () => {
    const mockProblemId = "6703bccac801c34498e5649a";

    Problem.findById.mockResolvedValue({
      _id: mockProblemId,
      testcase_id: [],
    });

    const res = await request(app)
      .get(`/userDashboardApi/getTestcasesByProblemId/${mockProblemId}`)
      .set("Authorization", `Bearer ${mockToken}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.msg).toEqual("Test cases not found");
  });

  it("should return test cases if problem has associated test cases", async () => {
    const mockProblemId = "6703bccac801c34498e5649a";
    const mockTestcaseIds = [
      "6703bccac801c34498e5649b",
      "6703bccac801c34498e5649c",
    ];
    const mockTestcases = [
      { _id: "6703bccac801c34498e5649b", input: "1 2", expected_output: "3" },
      { _id: "6703bccac801c34498e5649c", input: "3 4", expected_output: "7" },
    ];

    Problem.findById.mockResolvedValue({
      _id: mockProblemId,
      testcase_id: mockTestcaseIds,
    });

    Testcase.find.mockResolvedValue(mockTestcases);

    const res = await request(app)
      .get(`/userDashboardApi/getTestcasesByProblemId/${mockProblemId}`)
      .set("Authorization", `Bearer ${mockToken}`);
    ;

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockTestcases);
  });

  it("should return 500 on server error", async () => {
    const mockProblemId = "6703bccac801c34498e5649a";

    Problem.findById.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).get(`/userDashboardApi/getTestcasesByProblemId/${mockProblemId}`)
            .set("Authorization", `Bearer ${mockToken}`);

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual("Server Error");
  });
});
