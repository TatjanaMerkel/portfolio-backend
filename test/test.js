const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Products", function () {
  describe("GET /products", function () {
    it("reading all products from the initial database should return 4 products", async function () {
      // GIVEN  the initial database

      // WHEN   reading all products

      const getResponse = await chai
        .request("http://localhost:3001")
        .get("/products");

      // THEN   the server should return an HTTP 200 OK
      // AND    the JSON response should be an array of length 4

      chai.expect(getResponse).to.have.status(200);
      chai.expect(getResponse.body).to.be.an("array").that.has.length(4);
    });
  });

  describe("GET /product/:id", function () {
    it("should return the specified product", async function () {
      // GIVEN  the initial database

      // WHEN   reading the first product

      const getResponse = await chai
        .request("http://localhost:3001")
        .get("/product/1");

      // THEN   the server should return an HTTP 200 OK
      // AND    the JSON response should be the first product

      chai.expect(getResponse).to.have.status(200);
      chai.expect(getResponse.body).to.be.an("object");
      chai.expect(getResponse.body.name).to.be.equal("Papaya");
      chai.expect(getResponse.body.price).to.be.equal(399);
    });
  });

  describe("POST /product", function () {
    it("should add the new product to the database", async function () {
      // GIVEN  the initial database
      // AND    a valid session token

      const loginResponse = await chai
        .request("http://localhost:3001")
        .post("/login")
        .send({
          username: "Erika",
          password: "erika",
        });

      const loginObject = JSON.parse(loginResponse.text);
      const token = loginObject.token;

      // WHEN   adding a certain product

      const getResponse = await chai
        .request("http://localhost:3001")
        .post("/product")
        .send({
          name: "Test Product",
          description: "Test",
          category: 1,
          price: 100,
          price_type: 1,
          image: "",
          token: token
        });

      // THEN   the server should return an HTTP 201 OK
      // AND    the database should contain one more product, i.e. 5 products in total

      chai.expect(getResponse).to.have.status(201);

      const getResponse2 = await chai
        .request("http://localhost:3001")
        .get("/products");

      chai.expect(getResponse2.body).to.be.an("array").that.has.length(5);
    });
  });
});
