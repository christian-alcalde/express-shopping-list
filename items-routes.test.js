const request = require("supertest");

const { app } = require("./app");
const { items } = require("./fakeDb");

let test_item = { name: "popsicle", price: 1.99 };

beforeEach(function () {
  items.push(test_item);
});

afterEach(function () {
  while (items.length !== 0) {
    items.pop();
  }
});


describe("Test /items routes", function () {
  test("gets a list of items", async function () {
    const resp = await request(app).get("/items");

    expect(resp.body).toEqual({items:[{ name: "popsicle", price: 1.99 }]});
  });

  test("add item to list", async function () {
    const resp = await request(app).post("/items").send(
      {name: "cheerios", price: 2.50}
      );

      expect(resp.statusCode).toEqual(201);
      expect(items.length).toEqual(2);
    expect(resp.body).toEqual({added: {name: "cheerios", price: 2.50}});
  });

// });

// describe("/items/:name", function () {
  test("get single item", async function () {
    const resp = await request(app).get(`/items/${test_item.name}`);

    expect(resp.body).toEqual({ name: "popsicle", price: 1.99 });
  });

  test("update single item", async function () {
    const resp = await request(app).patch(`/items/${test_item.name}`).send({name: "strawberry", price: 1.99});

    expect(resp.body).toEqual({updated:{ name: "strawberry", price: 1.99 }});
  });

  test("delete single item", async function () {
    const resp = await request(app).delete(`/items/${test_item.name}`)

    expect(resp.body).toEqual({ message: "Deleted" });
    expect(items.length).toEqual(0);
  });

});