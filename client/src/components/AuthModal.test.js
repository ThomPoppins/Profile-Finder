const request = require("supertest");
const app = require("../app");

describe("POST /signup", () => {
  it("should create a new user and redirect to onboarding page", async () => {
    const res = await request(app)
      .post("/signup")
      .send({
        email: "test@example.com",
        password: "password",
        confirmPassword: "password",
      })
      .expect(302);

    expect(res.header.location).toBe("/onboarding");
    expect(res.header["set-cookie"]).toBeDefined();
  });

  it("should return an error if email is already taken", async () => {
    const res = await request(app)
      .post("/signup")
      .send({
        email: "test@example.com",
        password: "password",
        confirmPassword: "password",
      })
      .expect(400);

    expect(res.body.error).toBe("Email already taken");
  });

  it("should return an error if password and confirm password do not match", async () => {
    const res = await request(app)
      .post("/signup")
      .send({
        email: "test@example.com",
        password: "password",
        confirmPassword: "wrongpassword",
      })
      .expect(400);

    expect(res.body.error).toBe("Passwords do not match");
  });
});
