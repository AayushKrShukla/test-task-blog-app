import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../server.js";

let mongoServer;
let validToken;

before(async function () {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  mongoose.createConnection(mongoUri);

  const testUser = await request(app).post("/register").send({
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  });

  validToken = testUser.body.token;
});

after(async function () {
  // Clean up and disconnect the in-memory MongoDB server
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Blog Routes", function () {
  it("should not allow fetching blogs without JWT", async function () {
    const response = await request(app).get("/blog");

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('You are not logged in!')
  });

  it("should allow fetching blogs with a valid JWT", async function () {
    const response = await request(app)
      .get("/blog")
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).to.equal(200);
    expect(response.body.data.blogs).to.be.an("array"); // Assuming fetchBlogs returns an array
  });

  it("should allow creating a blog with a valid JWT", async function () {
    const response = await request(app)
      .post("/blog")
      .send({ title: "Test Blog", content: "Test Content" })
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("status", "success");
    expect(response.body.data).to.have.property("newBlog");
    expect(response.body.data.newBlog).to.have.property("title", "Test Blog");
    expect(response.body.data.newBlog).to.have.property(
      "content",
      "Test Content"
    );
  });

  // Add more tests for other routes as needed
});
