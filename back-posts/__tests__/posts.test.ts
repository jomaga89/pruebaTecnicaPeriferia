import request from "supertest";
import { app } from "../src/index.js";

describe("Posts Service Unit Tests", () => {
  it("Debería listar las publicaciones correctamente", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Debería proteger la creación de posts si no hay autor", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({ mensaje: "Post sin autor" });

    expect(res.statusCode).toEqual(500);
  });
});
