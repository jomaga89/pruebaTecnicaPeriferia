import express from "express";
import cors from "cors";
import sequelize from "./database.js";
import authRoutes from "./routes/authRoutes.js";
import user from "./models/user.js";
import bcrypt from "bcryptjs";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import path from "path";

export const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
  res.send("Microservicio de Autenticación ok");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Red Social - Periferia",
      version: "1.0.0",
      description: "Documentación de Microservicios",
    },
    servers: [{ url: "http://localhost:4000" }],
  },
  apis: [
    `${path.join(__dirname, "./routes/*.ts")}`,
    `${path.join(__dirname, "./routes/*.js")}`,
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//SEEDER
const runSeeder = async () => {
  try {
    const count = await user.count();
    if (count === 0) {
      const hashedPw = await bcrypt.hash("admin123", 10);
      await user.create({
        nombres: "Tester",
        apellidos: "Periferia",
        alias: "tester",
        fechaNacimiento: "2000-01-01",
        password: hashedPw,
      });
      console.log("Seeder: usuario prueba creado.");
    }
  } catch (error) {
    console.error("Error en Seeder:", error);
  }
};

sequelize
  .sync()
  .then(async () => {
    console.log("Base de datos sincronizada");
    await runSeeder();
    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () => {
        console.log(`Servidor Auth corriendo en http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("Error inicializando:", err);
  });
