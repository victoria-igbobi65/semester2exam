const request = require("supertest");
const { connect } = require("./db");
const UserModel = require("../models/user");
const app = require("../app");

describe("Auth: Signup", () => {
  let conn;

  beforeAll(async () => {
    conn = await connect();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  /*Test signup Route*/
  it("should signup a user", async () => {
    const response = await request(app)
      .post("/user/signup")
      .set("content-type", "application/json")
      .send({
        first_name: "tobi",
        last_name: "Augustina",
        email: "tobi@mail.com",
        password: "Password123",
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true)
    expect(response.body).toHaveProperty("newUser");    
    expect(response.body.newUser).toHaveProperty("first_name", "tobi");
    expect(response.body.newUser).toHaveProperty("last_name", "Augustina");
    expect(response.body.newUser).toHaveProperty("email", "tobi@mail.com");
  });
  

  /*Test Login route*/
  it("should login a user", async () => {
    // create user in out db
    const user = await UserModel.create({
      first_name: "tobi",
      last_name: "Augustina",
      email: "tobi@mail.com",
      password: "123456789",
    });


    // login user
    const response = await request(app)
      .post("/user/login")
      .set("content-type", "application/json")
      .send({
        email: "tobi@mail.com",
        password: "123456789",
      });

    // console.log(response)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.status).toBe(true)
  });
});
