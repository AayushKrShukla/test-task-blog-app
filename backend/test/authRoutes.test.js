import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { expect } from "chai";
import { authRouter } from "../routes/authRoutes.js";

import app, { listener } from "../server.js";
import mongoose from "mongoose";

let mongoServer;
before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  listener.close();
});

describe("Auth Routes", function () {
  describe("POST /register", function () {
    it("should register a new user", async function () {
      const name = "John";
      const email = "john.abacus@gmail.com";
      const response = await request(app).post("/register").send({
        name,
        email,
        password: "password123",
      });

      expect(response.status).to.equal(201); // or appropriate status code
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("user");
      expect(response.body.data.user)
        .to.have.property("name")
        .to.be.equal(name);
      expect(response.body.data.user)
        .to.have.property("email")
        .to.be.equal(email);
    });

    it("should return error if user already exists", async function () {
      const name = "mary";
      const email = "mary@gmail.com";
      await request(app)
        .post("/register")
        .send({ name, email, password: "password123" });

      const response = await request(app)
        .post("/register")
        .send({ name, email, password: "password123" });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("error");
      expect(response.body).to.have.property(
        "message",
        "Duplicate exists for field email"
      );
    });

    describe("POST /api/login", function () {
      it("should login a user", async function () {
        const response = await request(app)
          .post("/login")
          .send({ email: "mary@gmail.com", password: "password123" });

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("token");
      });

      it("should return error for invalid credentials", async function () {
        const response = await request(app)
          .post("/login")
          .send({ email: "mary@gmail.com", password: "wrongpassword" });

        expect(response.status).to.equal(401);
        expect(response.body).to.have.property(
          "message",
          "Incorrect Email or Password"
        );
      });
    });
  });
});
