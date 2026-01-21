import request from "supertest";
import { app } from "../src/index.js";

describe("Auth Service Unit Tests", () => {
  it("Debería denegar el acceso con credenciales incorrectas", async () => {
    const res = await request(app)
      .get("/api/auth/login")
      .query({ alias: "usuario_falso", password: "123" });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
  });

  it("Debería retornar error 400 si faltan campos en el registro", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ alias: "testuser" });

    expect(res.statusCode).toEqual(400);
  });
});
