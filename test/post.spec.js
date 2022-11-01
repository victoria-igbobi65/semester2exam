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

   const newUser = await UserModel.create({
      first_name: "tobi",
      last_name: "Augustina",
      email: "tobi@mail.com",
      password: "123456789",
    });

     user = newUser._id

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


  /*Create a new post*/
  it("create post", async () => {

    /*Post body*/
    const body = {
      title: "Vac",
      description: "don't even know how to go about exams",
      tags: "Enjoyment",
      author: user,
      body: "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
    };

    const response = await request(app)
      .post("/post")
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    
    expect(response.status).toBe(201)
    expect(response.body.status).toBe(true)
    expect(response.body).toHaveProperty('newPost')
  })



  /*Testing the get all routes*/
  it("should return posts", async () => {

    // create post in our db
    await PostModel.create({
      title: "Vacation with the girls",
      description: "don't even know how to go about exams",
      tags: "Enjoyment",
      author: user,
      body: "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
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
      author: "635e803007526ad682ef2063",
      body: "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
    });

    await PostModel.create({
      title: "Vacation",
      description: "don't even know how to go about exams",
      tags: "Enjoyment",
      author: "635e803007526ad682ef2063",
      body: "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
  
    });

    const response = await request(app)
      .get("/post?tags=enjoyment")
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("posts");
    expect(response.body).toHaveProperty("status", true);

  });

  /*Testing the create post route*/
  it("should return orders with tag enjoyment", async () => {

    const d= await PostModel.create({
      title: "Vacation",
      description: "don't even know how to go about exams",
      tags: "Enjoyment",
      author: "635e803007526ad682ef2063",
      body: "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
    });

    const response = await request(app)
      .get("/post?tags=enjoyment")
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200)
    expect(response.body.status).toBe(true)

  })


});
