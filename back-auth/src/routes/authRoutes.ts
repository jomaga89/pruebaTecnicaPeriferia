import { Router, type Request, type Response } from "express";
import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

/**
 * @openapi
 * /api/auth/login:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Iniciar sesión
 *     parameters:
 *       - in: query
 *         name: alias
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Alias y password requeridos
 *       '401':
 *         description: Contraseña incorrecta
 *       '404':
 *         description: Usuario no encontrado
 *       '500':
 *         description: Error del servidor
 */
router.get("/login", async (req: Request, res: Response) => {
  console.log("reqbody ", req.body, "\nreqquery:", req.query);
  try {
    const alias = req.query.alias as string;
    const password = req.query.password as string;
    console.log("alias ", alias, "\npassword ", password);

    if (!alias || !password) {
      return res.status(400).json({ error: "Alias y password requeridos" });
    }

    const foundUser = await user.findOne({ where: { alias } });

    if (!foundUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const userData = foundUser.get({ plain: true });

    if (!userData.password) {
      return res
        .status(500)
        .json({ error: "La contraseña no se leyó correctamente de la DB" });
    }

    const validPass = await bcrypt.compare(password, userData.password);

    if (!validPass) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        id: userData.id,
        alias: userData.alias,
        fechaNacimiento: userData.fechaNacimiento,
      },
      "CLAVE_SECRETA",
      { expiresIn: "5m" },
    );

    res.json({
      token,
      user: {
        nombres: userData.nombres,
        apellidos: userData.apellidos,
        alias: userData.alias,
        fechaNacimiento: userData.fechaNacimiento,
      },
    });
  } catch (error: any) {
    console.error("ERROR EN LOGIN:", error);
    res.status(500).json({
      error: "Error",
      detail: error.message,
    });
  }
});

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registrar usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               alias:
 *                 type: string
 *               password:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Creado
 *       '400':
 *         description: Todos los campos son obligatorios / Alias en uso
 *       '500':
 *         description: Error al registrar usuario
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { nombres, apellidos, alias, fechaNacimiento, password } = req.body;

    if (!nombres || !apellidos || !alias || !fechaNacimiento || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const existingUser = await user.findOne({ where: { alias } });
    if (existingUser) {
      return res.status(400).json({ error: "El alias ya está en uso" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      nombres,
      apellidos,
      alias,
      fechaNacimiento,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        alias: newUser.alias,
        nombres: newUser.nombres,
      },
    });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al registrar usuario", detail: error.message });
  }
});

/**
 * @openapi
 * /api/auth/users:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Obtener lista de usuarios
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombres:
 *                     type: string
 *                   alias:
 *                     type: string
 *       '500':
 *         description: Error al obtener usuarios
 */
router.get("/users", async (_req: Request, res: Response) => {
  try {
    const users = await user.findAll({
      attributes: ["nombres", "alias"],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

export default router;
