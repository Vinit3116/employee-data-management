// tests/employees.test.js 

const request = require("supertest");
const app = require("../app"); // your app.js
const db = require("../db/db");

// Reset DB before each test
beforeEach(async () => {
  await new Promise((resolve, reject) => {
    db.run("DELETE FROM employees", (err) => err ? reject(err) : resolve());
  });
});

// Close DB after all tests
afterAll(async () => {
  await new Promise((resolve, reject) => {
    db.close((err) => err ? reject(err) : resolve());
  });
});

describe("Employee API", () => {
  test("GET /api/employees should return empty initially", async () => {
    const res = await request(app).get("/api/employees");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("POST /api/employees should create employee", async () => {
    const emp = { name:"Alice", email:"alice@example.com", position:"Manager", salary:50000 };
    const res = await request(app).post("/api/employees").send(emp);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Alice");
    expect(res.body.salary).toBe(50000);
  });

  test("PUT /api/employees/:id should update employee", async () => {
    const create = await request(app).post("/api/employees").send({ name:"Bob", email:"bob@example.com", position:"Developer", salary:30000 });
    const id = create.body.id;

    const update = await request(app).put(`/api/employees/${id}`).send({ name:"Bobby", email:"bobby@example.com", position:"Lead Developer", salary:40000 });
    expect(update.statusCode).toBe(200);
    expect(update.body.name).toBe("Bobby");
    expect(update.body.salary).toBe(40000);
  });

  test("DELETE /api/employees/:id should delete employee", async () => {
    const create = await request(app).post("/api/employees").send({ name:"Charlie", email:"charlie@example.com", position:"Tester", salary:20000 });
    const id = create.body.id;

    const del = await request(app).delete(`/api/employees/${id}`);
    expect(del.statusCode).toBe(200);
    expect(del.body.message).toBe("Employee deleted successfully");

    const getRes = await request(app).get(`/api/employees/${id}`);
    expect(getRes.statusCode).toBe(404);
  });
});
