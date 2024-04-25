import { FastifyInstance } from "fastify";
import { ImageCreate } from "../interface/images.interface";
import { ImageUseCase } from "../usecases/image.usecase";
import { authMiddleware } from "../middleware/auth.middleware";

export const imageRoutes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: ImageCreate; Headers: { jwt: string } }>(
    "/",
    { preHandler: authMiddleware },
    async (req, res) => {
      const imageUseCase = new ImageUseCase();
      const images = req.body;
      const userAuth = req.headers["jwt"];
      try {
        const data = await imageUseCase.upload({
          ...images,
          userId: String(userAuth),
        });

        return res.send(data);
      } catch (error) {
        return res.send(error);
      }
    }
  );

  fastify.get<{ Params: { id: string } }>("/:id", async (req, res) => {
    const imageUseCase = new ImageUseCase();

    try {
      return await imageUseCase.findById(req.params["id"]);
    } catch (error) {
      return res.send(req.params);
    }
  });

  fastify.patch<{ Params: { id: string }; Headers: { jwt: string } }>(
    "/:id",
    { preHandler: authMiddleware },
    async (req, res) => {
      const imageUseCase = new ImageUseCase();

      try {
        return await imageUseCase.deleteImage({
          id: req.params["id"],
          userId: req.headers["jwt"],
        });
      } catch (error) {
        return res.send(req.params);
      }
    }
  );
};
