import { Router, type Request, type Response } from "express";
import Post from "../models/post.js";

const router = Router();

/**
 * @openapi
 * /api/posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Obtener publicaciones
 *     responses:
 *       '200':
 *         description: Lista de posts ordenado por fecha de creacion descendente
 *   post:
 *     tags:
 *       - Posts
 *     summary: Crear publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mensaje:
 *                 type: string
 *               autorAlias:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Creado
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      order: [
        ["createdAt", "DESC"],
        ["id", "DESC"],
      ],
    });
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener posts" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { mensaje, autorAlias } = req.body;
    const newPost = await Post.create({ mensaje, autorAlias });
    res.status(201).json(newPost);
  } catch (error: any) {
    res.status(500).json({ error: "Error al crear post" });
  }
});

/**
 * @openapi
 * /api/posts/{id}/like:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Enviar like a una publicación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Like enviado
 */
router.post("/:id/like", async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });

    await post.increment("likes", { by: 1 });
    await post.reload();
    await post.save();
    res.json({ message: "Like enviado", totalLikes: post.likes });
  } catch (error: any) {
    res.status(500).json({ error: "Error al procesar like" });
  }
});

/**
 * @openapi
 * /api/posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Eliminar publicación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Eliminado
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    await post.destroy();
    res.json({ message: "Publicación eliminada correctamente" });
  } catch (error: any) {
    res.status(500).json({ error: "Error al eliminar la publicación" });
  }
});

export default router;
