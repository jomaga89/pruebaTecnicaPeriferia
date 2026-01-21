import express from "express";
import cors from "cors";
import axios from "axios";
import sequelize from "../../back-auth/src/database.js";
import postRoutes from "./routes/postRoutes.js";
import post from "./models/post.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import path from "path";

export const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

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
    servers: [{ url: "http://localhost:4001" }],
  },
  apis: [
    `${path.join(__dirname, "./routes/*.ts")}`,
    `${path.join(__dirname, "./routes/*.js")}`,
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

async function runPostSeeder() {
  try {
    const responseAuth = await axios.get(
      "http://localhost:4000/api/auth/users",
    );
    const usuarios = responseAuth.data;

    if (!usuarios || usuarios.length === 0) {
      console.log("No hay usuarios en Auth para generar posts.");
      return;
    }

    const existingPosts = await post.findAll({
      attributes: ["autorAlias"],
      group: ["autorAlias"],
      raw: true,
    });

    const aliasConPosts = existingPosts.map((p) => p.autorAlias);

    const usuariosSinPosts = usuarios.filter(
      (user: any) => !aliasConPosts.includes(user.alias),
    );

    if (usuariosSinPosts.length > 0) {
      const postsParaCrear = usuariosSinPosts.map((user: any) => ({
        mensaje: `Hola, soy ${user.nombres}, este post es generado por PostSeeder`,
        autorAlias: user.alias,
        likes: 0,
      }));

      await post.bulkCreate(postsParaCrear);
      console.log(
        `Seeder: Se crearon posts para ${usuariosSinPosts.length} usuarios.`,
      );
    } else {
      console.log("Todos los usuarios ya tienen al menos una publicación.");
    }
  } catch (error: any) {
    console.error("Error en PostSeeder:", error.message);
  }
}

sequelize
  .sync()
  .then(async () => {
    await runPostSeeder();
    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () => {
        console.log(`Servicio de Publicaciones en http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("Error inicializando (posts):", err);
    process.exit(1);
  });
