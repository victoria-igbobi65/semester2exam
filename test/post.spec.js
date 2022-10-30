const request = require("supertest");
const { connect } = require("./db");
const app = require("../app");
const PostModel = require("../models/post");
const UserModel = require("../models/user");

describe("Post Route", () => {
  let conn;
  let token;

  beforeAll(async () => {
    conn = await connect();

    await UserModel.create({
      first_name: "tobi",
      last_name: "Augustina",
      email: "tobi@mail.com",
      password: "123456789",
    });

    const loginResponse = await request(app)
      .post("/user/login")
      .set("content-type", "application/json")
      .send({
        email: "tobi@mail.com",
        password: "123456789",
      });

    token = loginResponse.body.token;
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });


  /*Testing the get all routes*/
  it("should return posts", async () => {

    // create post in our db
    await PostModel.create({
      title: "Vacation with the girls",
      description: "don't even know how to go about exams",
      tags: "Enjoyment",
      author: "Vic",
      body: "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
      owner_id: "635e803007526ad682ef2063"
    });

    
    const response = await request(app)
      .get("/post")
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", true);
    expect(response.body).toHaveProperty("posts")
  });


  /*Testing the get all route with filter object*/
  it("should return orders with tag enjoyment", async () => {
    // create order in our db
    await PostModel.create({
      title: "Vacation with the girls",
      description: "don't even know how to go about exams",
      tags: "Enjoyment",
      author: "Vic",
      body: "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
      owner_id: "635e803007526ad682ef2063",
    });

    await PostModel.create({
      title: "Vacation",
      description: "don't even know how to go about exams",
      tags: "Enjoyment",
      author: "Vic",
      body: "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
      owner_id: "635e803007526ad682ef2063",
    });

    const response = await request(app)
      .get("/post?tags=enjoyment")
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    console.log(response.body.numberOfPosts)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("posts");
    expect(response.body).toHaveProperty("status", true);
    expect(response.body.numberOfPosts).toBe(2)
  });

  /*Testing the create post route*/
  it("should return orders with tag enjoyment", async () => {

    await PostModel.create({
      title: "Vacation",
      description: "don't even know how to go about exams",
      tags: "Enjoyment",
      author: "Vic",
      body: "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
      owner_id: "635e803007526ad682ef2063",
    });

    const response = await request(app)
      .get("/post?tags=enjoyment")
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201)
    expect(response.body.status).toBe(true)
    expect(response.body).toHaveProperty("title");


  })

});
