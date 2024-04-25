import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interface/users.interface";

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: UserCreate }>("/", async (req, res) => {
    const userUseCase = new UserUseCase();
    const { email, name } = req.body;
    try {
      const data = await userUseCase.create({ email, name });

      return res.send(data);
    } catch (error) {
      return res.send(error);
    }
  });

  fastify.get<{ Params: { id: string } }>("/:id", async (req, res) => {
    const userUseCase = new UserUseCase();
    try {
      const result = await userUseCase.findById(req.params["id"]);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  });
};
