// const request = require("supertest");
// const express = require("express");
// const bcrypt = require("bcryptjs");

// const userRoutes = require("../controllers/userController");
// const User = require("../models/Users");

// jest.mock("../models/Users");

// const app = express();
// app.use(express.json());
// app.use("/users", userRoutes);

// describe("GET /users/getAllUsers", () => {
//     it("should fetch all users", async () => {
//         User.find.mockResolvedValue([
//         {
//             username: "Noorul",
//             email: "noorul@gmail.com",
//             password_hash: "hash1",
//         },
//         {
//             username: "Vijay",
//             email: "vijay@gmail.com",
//             password_hash: "hash2",
//         },
//     ]);

//     const res = await request(app).get("/users/getAllUsers");

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveLength(2);
//     expect(res.body[0].username).toBe("Noorul");
//     expect(res.body[1].email).toBe("vijay@gmail.com");
// });

//     it("should return 500 in case of any failure", async () => {
//         User.find.mockRejectedValue(new Error("Database error"));
//         const res = await request(app).get("/users/getAllUsers");

//         expect(res.statusCode).toBe(500);
//         expect(res.text).toBe("Server Error");
//     });
// });

// describe("GET /users/getUserById/:id", () => {
//     it("should fetch user by id", async () => {
//         User.findById.mockResolvedValue([
//             {
//                 _id: "507f1f77bcf86cd799439011",
//                 username: "Dharun",
//                 email: "dharun@gmail.com",
//                 password_hash: "hashpass"
//             },
//         ]);
        
//         const res = await request(app).get("/users/getUserById/507f1f77bcf86cd799439011");
        
//         expect(res.statusCode).toBe(200);
//         expect(res.body[0].username).toBe("Dharun");
//         expect(res.body[0].email).toBe("dharun@gmail.com");
//     });

//     it("should return 404 if the user is not found", async () => {
//         User.findById.mockResolvedValue(null);

//         const res = await request(app).get("/users/getUserById/507f1f77bcf86cd799439011");

//         expect(res.statusCode).toBe(404);
//         expect(res.body.msg).toBe("User not found");
//     });

//     it("should return 500 in case of any failure", async () => {
//         User.findById.mockRejectedValue(new Error("Database error"));
//         const res = await request(app).get("/users/getUserById/507f1f77bcf86cd79");
//         expect(res.statusCode).toBe(500);
//         expect(res.text).toBe("Server Error");
//     });
// });

// describe("POST /users/addUser", () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     it("should return 400 if username is missing", async () => {
//         const res = await request(app)
//             .post("/users/addUser")
//             .send({
//                 email: "test@example.com",
//                 password: "Password123!",
//                 role: "user",
//             });

//         expect(res.statusCode).toBe(400);
//         expect(res.body.msg).toBe("Username is required");
//     });

//     it("should return 400 if email is missing", async () => {
//         const res = await request(app)
//             .post("/users/addUser")
//             .send({ username: "TestUser", password: "Password123!", role: "user" });

//         expect(res.statusCode).toBe(400);
//         expect(res.body.msg).toBe("Email is required");
//     });

//     it("should return 400 if password is missing", async () => {
//         const res = await request(app)
//             .post("/users/addUser")
//             .send({ username: "TestUser", email: "test@example.com", role: "user" });

//         expect(res.statusCode).toBe(400);
//         expect(res.body.msg).toBe("Password is required");
//     });

//     it("should return 400 if username or email already exists", async () => {
//         User.findOne.mockResolvedValue({
//             username: "TestUser",
//             email: "test@example.com",
//         });

//         const res = await request(app)
//             .post("/users/addUser")
//             .send({
//                 username: "TestUser",
//                 email: "test@example.com",
//                 password: "Password123!",
//                 role: "user",
//             });

//         expect(res.statusCode).toBe(400);
//         expect(res.body.msg).toBe("Username or email already exists");
//     });

//     it("should create a new user if all data is valid", async () => {
//         User.findOne.mockResolvedValue(null);

//         const hashedPassword = "hashedPassword";
//         jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt");
//         jest.spyOn(bcrypt, "hash").mockResolvedValue(hashedPassword);

//         const savedUser = {
//             username: "TestUser",
//             email: "test@example.com",
//             password_hash: hashedPassword,
//             role: "user",
//         };
//         User.prototype.save.mockResolvedValue(savedUser);

//         const res = await request(app)
//             .post("/users/addUser")
//             .send({
//                 username: "TestUser",
//                 email: "test@example.com",
//                 password: "Password123!",
//                 role: "user",
//             });

//         expect(res.statusCode).toBe(201);
//         expect(res.body.username).toBe("TestUser");
//         expect(res.body.email).toBe("test@example.com");
//         expect(res.body.password_hash).toBe(hashedPassword);
//     });

//     it("should return 500 if there is a server error", async () => {
//         User.findOne.mockRejectedValue(new Error("Server error"));

//         const res = await request(app)
//             .post("/users/addUser")
//             .send({
//                 username: "TestUser",
//                 email: "test@example.com",
//                 password: "Password123!",
//                 role: "user",
//             });

//         expect(res.statusCode).toBe(500);
//         expect(res.body.msg).toBe("Server Error");
//     });
// });

// describe('PUT /users/updateUser/:id', () => {
//     let userId;
    
//     beforeEach(() => {
//         userId = 'someUserId';
//         jest.clearAllMocks();
//     });

//         it('should return 404 if user is not found', async () => {
//         User.findById.mockResolvedValue(null);

//         const res = await request(app)
//             .put(`/users/updateUser/${userId}`)
//             .send({ username: 'UpdatedUser', email: 'updated@example.com' });

//         expect(res.statusCode).toBe(404);
//         expect(res.body.msg).toBe('User not found');
//     });

//         it('should update user details without password', async () => {
//         const existingUser = {
//             _id: userId,
//             username: 'OriginalUser',
//             email: 'original@example.com',
//             role: 'user',
//             save: jest.fn().mockResolvedValue(true),
//         };

//         User.findById.mockResolvedValue(existingUser);

//         const res = await request(app)
//             .put(`/users/updateUser/${userId}`)
//             .send({ username: 'UpdatedUser', email: 'updated@example.com', role: 'admin' });

//         expect(res.statusCode).toBe(200);
//         expect(existingUser.username).toBe('UpdatedUser');
//         expect(existingUser.email).toBe('updated@example.com');
//         expect(existingUser.role).toBe('admin');
//     });

//         it('should hash the password if provided and update user', async () => {
//         const salt = 'somesalt';
//         const hashedPassword = 'hashedpassword';
//         bcrypt.genSalt = jest.fn().mockResolvedValue(salt);
//         bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);

//         const existingUser = {
//             _id: userId,
//             username: 'OriginalUser',
//             email: 'original@example.com',
//             password_hash: 'oldpasswordhash',
//             save: jest.fn().mockResolvedValue(true),
//         };

//         User.findById.mockResolvedValue(existingUser);

//         const res = await request(app)
//             .put(`/users/updateUser/${userId}`)
//             .send({ username: 'UpdatedUser', password: 'newpassword123' });

//         expect(res.statusCode).toBe(200);
//         expect(existingUser.username).toBe('UpdatedUser');
//         expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
//         expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', salt);
//         expect(existingUser.password_hash).toBe(hashedPassword);
//     });

//         it('should return 500 if there is a server error', async () => {
//         User.findById.mockRejectedValue(new Error('Server Error'));

//         const res = await request(app)
//             .put(`/users/updateUser/${userId}`)
//             .send({ username: 'UpdatedUser', email: 'updated@example.com' });

//         expect(res.statusCode).toBe(500);
//         expect(res.text).toBe('Server Error');
//     });
// });

// describe('DELETE /users/deleteUser/:id', () => {
//     let userId;

//     beforeEach(() => {
//         userId = 'someUserId';
//         jest.clearAllMocks();
//     });

//     it('should delete a user by ID if the user exists', async () => {
//         User.findByIdAndDelete.mockResolvedValue({ _id: userId, username: 'DeletedUser', email: 'deleted@example.com' });

//         const res = await request(app).delete(`/users/deleteUser/${userId}`);

//         expect(res.statusCode).toBe(200);
//         expect(res.body.msg).toBe('User removed');
//         expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
//     });

//     it('should return 404 if user is not found', async () => {
//         User.findByIdAndDelete.mockResolvedValue(null);
    
//         const res = await request(app).delete(`/users/deleteUser/${userId}`);
    
//         expect(res.statusCode).toBe(404);
//         expect(res.body.msg).toBe('User not found');
//         expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
//     });

//     it('should return 500 if there is a server error', async () => {
//         User.findByIdAndDelete.mockRejectedValue(new Error('Server Error'));

//         const res = await request(app).delete(`/users/deleteUser/${userId}`);

//         expect(res.statusCode).toBe(500);
//         expect(res.text).toBe('Server Error');
//     });
// });

const request = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRoutes = require("../controllers/userController");
const User = require("../models/Users");

jest.mock("../models/Users");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

const mockToken = jwt.sign({ _id: "6708c037fdc16bcaed9b5be6" }, process.env.JWT_SECRET, { expiresIn: "1h" });

describe("GET /users/getAllUsers", () => {
    it("should fetch all users with valid token", async () => {
        User.find.mockResolvedValue([
            {
                username: "Noorul",
                email: "noorul@gmail.com",
                password_hash: "hash1",
            },
            {
                username: "Vijay",
                email: "vijay@gmail.com",
                password_hash: "hash2",
            },
        ]);

        const res = await request(app)
            .get("/users/getAllUsers")
            .set("Authorization", `Bearer ${mockToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].username).toBe("Noorul");
        expect(res.body[1].email).toBe("vijay@gmail.com");
    });

    it("should return 401 if no token is provided", async () => {
        const res = await request(app).get("/users/getAllUsers");

        expect(res.statusCode).toBe(401);
        expect(res.body.msg).toBe("No token, authorization denied");
    });

    it("should return 500 in case of any failure", async () => {
        User.find.mockRejectedValue(new Error("Database error"));
        const res = await request(app)
            .get("/users/getAllUsers")
            .set("Authorization", `Bearer ${mockToken}`);

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe("Server Error");
    });
});

describe("GET /users/getUserById/:id", () => {
    it("should fetch user by id with valid token", async () => {
        User.findById.mockResolvedValue([
            {
                _id: "507f1f77bcf86cd799439011",
                username: "Dharun",
                email: "dharun@gmail.com",
                password_hash: "hashpass"
            },
        ]);

        const res = await request(app)
            .get("/users/getUserById/507f1f77bcf86cd799439011")
            .set("Authorization", `Bearer ${mockToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body[0].username).toBe("Dharun");
        expect(res.body[0].email).toBe("dharun@gmail.com");
    });

    it("should return 404 if the user is not found", async () => {
        User.findById.mockResolvedValue(null);

        const res = await request(app)
            .get("/users/getUserById/507f1f77bcf86cd799439011")
            .set("Authorization", `Bearer ${mockToken}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.msg).toBe("User not found");
    });

    it("should return 500 in case of any failure", async () => {
        User.findById.mockRejectedValue(new Error("Database error"));
        const res = await request(app)
            .get("/users/getUserById/507f1f77bcf86cd79")
            .set("Authorization", `Bearer ${mockToken}`);

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe("Server Error");
    });
});

describe("POST /users/addUser", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 400 if username is missing", async () => {
        const res = await request(app)
            .post("/users/addUser")
            .set("Authorization", `Bearer ${mockToken}`)
            .send({
                email: "test@example.com",
                password: "Password123!",
                role: "user",
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.msg).toBe("Username is required");
    });

    it("should return 400 if email is missing", async () => {
        const res = await request(app)
            .post("/users/addUser")
            .set("Authorization", `Bearer ${mockToken}`)
            .send({ username: "TestUser", password: "Password123!", role: "user" });

        expect(res.statusCode).toBe(400);
        expect(res.body.msg).toBe("Email is required");
    });

    it("should return 400 if password is missing", async () => {
        const res = await request(app)
            .post("/users/addUser")
            .set("Authorization", `Bearer ${mockToken}`)
            .send({ username: "TestUser", email: "test@example.com", role: "user" });

        expect(res.statusCode).toBe(400);
        expect(res.body.msg).toBe("Password is required");
    });

    it("should return 400 if username or email already exists", async () => {
        User.findOne.mockResolvedValue({
            username: "TestUser",
            email: "test@example.com",
        });

        const res = await request(app)
            .post("/users/addUser")
            .set("Authorization", `Bearer ${mockToken}`)
            .send({
                username: "TestUser",
                email: "test@example.com",
                password: "Password123!",
                role: "user",
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.msg).toBe("Username or email already exists");
    });

    it("should create a new user if all data is valid", async () => {
        User.findOne.mockResolvedValue(null);

        const hashedPassword = "hashedPassword";
        jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt");
        jest.spyOn(bcrypt, "hash").mockResolvedValue(hashedPassword);

        const savedUser = {
            username: "TestUser",
            email: "test@example.com",
            password_hash: hashedPassword,
            role: "user",
        };
        User.prototype.save.mockResolvedValue(savedUser);

        const res = await request(app)
            .post("/users/addUser")
            .set("Authorization", `Bearer ${mockToken}`)
            .send({
                username: "TestUser",
                email: "test@example.com",
                password: "Password123!",
                role: "user",
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.username).toBe("TestUser");
        expect(res.body.email).toBe("test@example.com");
    });
});
